<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api/v1'
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (ThrottleRequestsException $exception, Request $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Bạn vừa thao tác quá nhanh. Vui lòng đợi 60 giây rồi thử lại.',
                ], 429);
            }
            return null;
        });

        $exceptions->render(function (NotFoundHttpException $exception, $request) {
            if (!$request->expectsJson()) return null;
            if ($exception->getPrevious() instanceof ModelNotFoundException) {
                return response()->json(['message' => 'Không tìm thấy thông tin này.'], 404);
            }
            return response()->json(['message' => 'Không tìm thấy tài nguyên.'], 404);
        });
    })->create();
