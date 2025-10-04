<?php


return [
    'access_ttl_minutes'  => env('ACCESS_TTL_MINUTES', 15),
    'refresh_ttl_days'    => env('REFRESH_TTL_DAYS', 7),

    'refresh_cookie' => [
        'name'     => env('REFRESH_COOKIE_NAME', 'refresh_token'),
        'path'     => env('REFRESH_COOKIE_PATH', '/'),
        'domain'   => env('REFRESH_COOKIE_DOMAIN', env('SESSION_DOMAIN')),
        'secure'   => env('REFRESH_COOKIE_SECURE', null),
        'http_only'=> true,
        'same_site'=> env('REFRESH_COOKIE_SAMESITE', 'Strict'),
    ],
];
