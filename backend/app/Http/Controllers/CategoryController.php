<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        return Category::query()
            ->visibleTo(auth()->id())
            ->when($request->filled('tab'), function ($query, $tab) use ($request) {
                if ($request->tab == 'income') {
                    $query->where('type', 'income');
                } else if ($request->tab == 'expense') {
                    $query->where('type', 'expense');
                } else if ($request->tab == 'deleted') {
                    $query->whereNotNull('deleted_at');
                }
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim($request->search);
                $query->whereRaw('name COLLATE utf8mb4_0900_ai_ci LIKE ?', ["%{$search}%"]);
            })
            ->when($request->filled('type'), fn ($query) => $query->where('type', $request->type))
            ->paginate($request->integer('size', 50));
    }

    public function store(StoreCategoryRequest $request)
    {
        return response([
            'message' => 'Tạo mới danh mục thành công!',
            'data' => Category::create([
                'name' => $request->validated('name'),
                'type' => $request->validated('type'),
                'user_id' => auth()->id(),
                'is_system' => false,
            ])
        ]);
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update(['name' => $request->validated('name')]);
        return response(['message' => 'Sửa danh mục thành công!', 'data' => $category]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response(['message' => 'Xoá danh mục thành công!']);
    }
}
