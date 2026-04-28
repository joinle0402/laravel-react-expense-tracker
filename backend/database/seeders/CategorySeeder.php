<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // Income categories
            ['name' => 'Lương', 'type' => 'income'],
            ['name' => 'Thưởng', 'type' => 'income'],
            ['name' => 'Phụ cấp', 'type' => 'income'],
            ['name' => 'Làm thêm', 'type' => 'income'],
            ['name' => 'Freelance', 'type' => 'income'],
            ['name' => 'Kinh doanh', 'type' => 'income'],
            ['name' => 'Đầu tư', 'type' => 'income'],
            ['name' => 'Lãi tiết kiệm', 'type' => 'income'],
            ['name' => 'Quà tặng', 'type' => 'income'],
            ['name' => 'Hoàn tiền', 'type' => 'income'],
            ['name' => 'Bán đồ cũ', 'type' => 'income'],
            ['name' => 'Thu nhập khác', 'type' => 'income'],

            // Expense categories
            ['name' => 'Ăn uống', 'type' => 'expense'],
            ['name' => 'Cà phê', 'type' => 'expense'],
            ['name' => 'Đi chợ', 'type' => 'expense'],
            ['name' => 'Di chuyển', 'type' => 'expense'],
            ['name' => 'Xăng xe', 'type' => 'expense'],
            ['name' => 'Gửi xe', 'type' => 'expense'],
            ['name' => 'Taxi / Grab', 'type' => 'expense'],
            ['name' => 'Mua sắm', 'type' => 'expense'],
            ['name' => 'Quần áo', 'type' => 'expense'],
            ['name' => 'Nhà cửa', 'type' => 'expense'],
            ['name' => 'Tiền thuê nhà', 'type' => 'expense'],
            ['name' => 'Điện', 'type' => 'expense'],
            ['name' => 'Nước', 'type' => 'expense'],
            ['name' => 'Internet', 'type' => 'expense'],
            ['name' => 'Điện thoại', 'type' => 'expense'],
            ['name' => 'Y tế', 'type' => 'expense'],
            ['name' => 'Thuốc men', 'type' => 'expense'],
            ['name' => 'Bảo hiểm', 'type' => 'expense'],
            ['name' => 'Giáo dục', 'type' => 'expense'],
            ['name' => 'Sách vở', 'type' => 'expense'],
            ['name' => 'Khóa học', 'type' => 'expense'],
            ['name' => 'Giải trí', 'type' => 'expense'],
            ['name' => 'Du lịch', 'type' => 'expense'],
            ['name' => 'Quà tặng', 'type' => 'expense'],
            ['name' => 'Gia đình', 'type' => 'expense'],
            ['name' => 'Thú cưng', 'type' => 'expense'],
            ['name' => 'Từ thiện', 'type' => 'expense'],
            ['name' => 'Phí ngân hàng', 'type' => 'expense'],
            ['name' => 'Trả nợ', 'type' => 'expense'],
            ['name' => 'Tiết kiệm', 'type' => 'expense'],
            ['name' => 'Chi phí khác', 'type' => 'expense'],
        ];

        foreach ($items as $item) {
            Category::updateOrCreate(
                [
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'user_id' => 43,
                ],
                [
                    'is_system' => true,
                    'deleted_at' => null,
                ]
            );
        }
    }
}
