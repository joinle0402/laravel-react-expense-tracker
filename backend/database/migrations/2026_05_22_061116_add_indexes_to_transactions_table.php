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
        Schema::table('transactions', function (Blueprint $table) {
            $table->index(['user_id', 'dated', 'id'], 'transactions_user_dated_id_index');
            $table->index(['user_id', 'type', 'dated', 'id'], 'transactions_user_type_dated_id_index');
            $table->index(['user_id', 'category_id', 'dated', 'id'], 'transactions_user_category_dated_id_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropIndex('transactions_user_dated_id_index');
            $table->dropIndex('transactions_user_type_dated_id_index');
            $table->dropIndex('transactions_user_category_dated_id_index');
        });
    }
};
