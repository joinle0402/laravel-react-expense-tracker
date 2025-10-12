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
        return response()->json(['message' => 'Đã gửi lại email xác minh']);
    }

    /**
     * @throws Throwable
     */
    public function verify($id, $hash)
    {
        $user = User::findOrFail($id);
        assert_if(!hash_equals($hash, sha1($user->getEmailForVerification())), "Invalid verification hash", 403);
        assert_if($user->hasVerifiedEmail(), "Email already verified", 200);

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect()->away(config('app.frontend_url').'?verified=1&email='.$user->email);
    }
}
