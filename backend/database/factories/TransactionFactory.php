<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement(['income', 'expense']);
        $category = Category::where('type', $type)->inRandomOrder()->first();

        return [
            'user_id' => 1,
            'category_id' => $category->id,
            'type' => $type,
            'note' => fake()->optional(0.7)->randomElement([
                'Ăn sáng',
                'Đi chợ',
                'Cà phê',
                'Lương tháng',
                'Freelance',
                'Phụ cấp',
                'Đi lại',
                'Mua đồ cá nhân',
                'Thanh toán hóa đơn',
            ]),
            'amount' => $type === 'income'
                ? fake()->numberBetween(500, 15000) * 1000
                : fake()->numberBetween(10, 3000) * 1000,
            'dated' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
        ];
    }
}
