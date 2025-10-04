<?php

namespace App\Http\Services;

use App\Models\User;
use DB;
use Throwable;

class TokenService
{
    /**
     * @throws Throwable
     */
    public function issue(User $user): object
    {
        $ua = request()->userAgent() ?? 'unknown';
        $ip = request()->ip();

        return DB::transaction(function () use ($user, $ua, $ip) {
            $access = $user->createToken(
                'access', ['*'], now()->addMinutes((int) config('tokens.access_ttl_minutes', 15))
            );
            $accessPat = $access->accessToken;
            $accessPat->user_agent = $ua;
            $accessPat->ip_address = $ip;
            $accessPat->save();

            $refresh = $user->createToken(
                'refresh', ['refresh'], now()->addDays((int) config('tokens.refresh_ttl_days', 7))
            );
            $refreshPat = $refresh->accessToken;
            $refreshPat->user_agent = $ua;
            $refreshPat->ip_address = $ip;
            $refreshPat->save();

            return (object)[
                'accessToken'    => $access->plainTextToken,
                'accessTokenId'  => $accessPat->id,
                'refreshToken'   => $refresh->plainTextToken,
                'refreshTokenId' => $refreshPat->id,
            ];
        });
    }

    public function revokeByUserAgent(User $user, string $userAgent): void
    {
        $user->tokens()->where('user_agent', $userAgent)->delete();
    }

    public function revokeAccessTokens(User $user, ?int $ignore): void
    {
        $user->tokens()
            ->where('name', 'access')
            ->where('user_agent', request()->userAgent() ?? 'unknown')
            ->where('id', '!=', $ignore)
            ->delete();
    }
}
