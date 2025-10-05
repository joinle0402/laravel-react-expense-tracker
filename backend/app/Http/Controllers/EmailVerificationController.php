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
        assert_if($request->user()->hasVerifiedEmail(), "Email already verified", 200);
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification link sent']);
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
