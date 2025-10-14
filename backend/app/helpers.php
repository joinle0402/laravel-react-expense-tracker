<?php


if (!function_exists('assert_if')) {
    /**
     * @throws Throwable
     */
    function assert_if(bool $condition, string $message, $status = 400, $extra = []): void
    {
        throw_if(
            $condition,
            Illuminate\Http\Exceptions\HttpResponseException::class,
            response(array_merge(['success' => false, 'message' => $message], $extra), $status)
        );
    }
}
