<?php

namespace App\Supports\Cookies;

use Illuminate\Support\Facades\Cookie;

readonly class RefreshCookieFactory
{
    public function __construct(
        private string  $name,
        private string  $path,
        private ?string $domain,
        private ?bool   $secure,
        private bool    $httpOnly,
        private string  $sameSite,
        private int     $ttlDays
    ) {}

    public static function fromConfig(): self
    {
        $config = config('tokens.refresh_cookie');
        return new self(
            name:      $config['name'],
            path:      $config['path'],
            domain:    empty($config['domain']) ? null : $config['domain'],
            secure:    is_null($config['secure']) ? config('session.secure', app()->environment('production')) : (bool) $config['secure'],
            httpOnly:  (bool) $config['http_only'],
            sameSite:  $config['same_site'],
            ttlDays:   (int) config('tokens.refresh_ttl_days')
        );
    }

    public function make(string $token): \Symfony\Component\HttpFoundation\Cookie
    {
        $minutes = $this->ttlDays * 24 * 60;

        return Cookie::make(
            name:     $this->name,
            value:    $token,
            minutes:  $minutes,
            path:     $this->path,
            domain:   $this->domain,
            secure:   $this->secure,
            httpOnly: $this->httpOnly,
            sameSite: $this->sameSite
        );
    }

    public function forget(): \Symfony\Component\HttpFoundation\Cookie
    {
        return Cookie::forget(
            name:     $this->name,
            path:     $this->path,
            domain:   $this->domain
        );
    }

    public function name(): string
    {
        return $this->name;
    }
}
