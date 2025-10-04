<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            $table->string('ip_address', 45)->nullable()->after('abilities');
            $table->string('user_agent', 255)->nullable()->after('ip_address');
            $table->index(['tokenable_type', 'tokenable_id', 'user_agent'], 'pat_tokenable_ua_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            $table->dropIndex('pat_tokenable_ua_idx');
            $table->dropColumn(['ip_address', 'user_agent']);
        });
    }
};
