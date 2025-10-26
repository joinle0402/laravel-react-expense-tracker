<?php


if (!function_exists('assert_if')) {
    function assert_if(bool $condition, string $message, $status = 400, $extra = []): void
    {
        try {
            throw_if(
                $condition,
                Illuminate\Http\Exceptions\HttpResponseException::class,
                response(array_merge(['success' => false, 'message' => $message], $extra), $status)
            );
        } catch (Throwable $e) {

        }
    }
}
