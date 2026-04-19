<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $registered = User::create(array_merge($request->validated(), ['password' => bcrypt($request->password)]));
        event(new Registered($registered));
        return response()->json(['message' => 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.'], 201);
    }

    public function verifyEmail(Request $_, int $id, string $hash): JsonResponse
    {
        $user = User::findOrFail($id);
        throwIf(!hash_equals($hash, sha1($user->getEmailForVerification())), 'Link xác thực không hợp lệ', 403);
        throwIf($user->hasVerifiedEmail(), 'Email đã được xác thực trước đó');
        $user->markEmailAsVerified();
        event(new Verified($user));
        return response()->json(['message' => 'Xác thực email thành công.',]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $user = User::where('email', $credentials['email'])->first();
        throwIf(!$user || !Hash::check($credentials['password'], $user->password), "Email hoặc mật khẩu không đúng", 401);
        throwIf(!$user->hasVerifiedEmail(), 'Tài khoản chưa xác thực email.', 403);
        $token = $user->createToken('access_token')->plainTextToken;
        return response()->json(compact('token', 'user'));
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

}
