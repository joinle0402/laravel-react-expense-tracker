<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Services\TokenService;
use App\Models\User;
use App\Supports\Cookies\RefreshCookieFactory;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Throwable;

class AuthController extends Controller
{
    public function __construct(
        private readonly TokenService $tokenService,
        private readonly RefreshCookieFactory $refreshCookie
    ) {}

    /**
     * @throws Throwable
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        event(new Registered($user));
        return response([
            'message' => 'Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư của bạn.',
            'data' => array_merge($user->only('id', 'name', 'email'), ['verified' => false])
        ]);
    }

    /**
     * @throws Throwable
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        assert_if(empty($user) || !Hash::check($request->password, $user->password), "Invalid Credentials!", 401);

        $this->tokenService->revokeByUserAgent($user, request()->userAgent());
        $issued = $this->tokenService->issue($user);

        return response(['access_token' => $issued->accessToken, 'user' => $user->only('id', 'name', 'email')])
                ->withCookie($this->refreshCookie->make($issued->refreshToken));
    }

    public function me(Request $request)
    {
        return response(['user' => $request->user()->only('id', 'name', 'email')]);
    }

    public function logout(Request $request)
    {
        $request->user()?->tokens()->delete();

        if ($raw = $request->cookie($this->refreshCookie->name())) {
            if ($token = PersonalAccessToken::findToken($raw)) {
                $token->delete();
            }
        }

        return response(['message' => 'Logged out successfully.'])
            ->withCookie($this->refreshCookie->forget());
    }

    /**
     * @throws Throwable
     */
    public function refresh(Request $request)
    {
        $raw = $request->cookie($this->refreshCookie->name());
        assert_if(!$raw, "Missing refresh token!", 401);

        $refresh = PersonalAccessToken::findToken($raw);
        if (!$refresh || !$refresh->can('refresh')) {
            return response()
                ->json(['message' => 'Invalid refresh token!'], 401)
                ->withCookie($this->refreshCookie->forget());
        }

        if ($refresh->expires_at && now()->greaterThan($refresh->expires_at)) {
            $refresh->delete();
            return response()
                    ->json(['message' => 'Expired refresh token!'], 401)
                    ->withCookie($this->refreshCookie->forget());
        }

        if (($refresh->user_agent ?? '') !== ($request->userAgent() ?? '')) {
            $refresh->delete();
            return response()->json(['message' => 'Refresh context (UA) mismatch!'], 401)
                ->withCookie($this->refreshCookie->forget());
        }

        $user = $refresh->tokenable;

        $refresh->delete();

        $issued = $this->tokenService->issue($user);

        $this->tokenService->revokeAccessTokens($user, $issued->accessTokenId);

        return response()
            ->json(['access_token' => $issued->accessToken])
            ->withCookie($this->refreshCookie->make($issued->refreshToken));
    }
}
