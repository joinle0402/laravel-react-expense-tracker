<?php
use Illuminate\Http\Exceptions\HttpResponseException;

if (! function_exists('throwIf')) {
    function throwIf(bool $condition, string $message, int $statusCode = 400): void
    {
        if ($condition) {
            throw new HttpResponseException(
                response()->json([
                    'message' => $message,
                ], $statusCode)
            );
        }
    }
}
