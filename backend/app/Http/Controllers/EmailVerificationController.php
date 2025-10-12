<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Throwable;

class EmailVerificationController extends Controller
{

    /**
     * @throws Throwable
     */
    public function resend(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->firstOrFail();
        assert_if($user->hasVerifiedEmail(), "Email already verified", 200);
        $user->sendEmailVerificationNotification();
        return response()->json(['message' => 'Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư của bạn.']);
    }

    /**
     * @throws Throwable
     */
    public function verify($id, $hash)
    {
        $user = User::findOrFail($id);
        assert_if(!hash_equals($hash, sha1($user->getEmailForVerification())), "Liên kết đã hết hạn hoặc không hợp lệ.", 403);
        assert_if($user->hasVerifiedEmail(), "Email này đã xác thực");
        $user->markEmailAsVerified();
        event(new Verified($user));
        config('app.frontend_url');
        return redirect()->away(config('app.frontend_url').'/verified?message='.urlencode('Xác thực email thành công!'));
    }
}
