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
        $baseQuery = Category::visibleTo(auth()->id());
        $counts = (clone $baseQuery)
            ->withTrashed()
            ->selectRaw("
                COUNT(CASE WHEN deleted_at IS NULL THEN 1 END) as all_count,
                COUNT(CASE WHEN type = 'expense' AND deleted_at IS NULL THEN 1 END) as expense_count,
                COUNT(CASE WHEN type = 'income' AND deleted_at IS NULL THEN 1 END) as income_count,
                COUNT(CASE WHEN deleted_at IS NOT NULL THEN 1 END) as deleted_count
            ")
            ->first();
        $categories = (clone $baseQuery)
            ->withTrashed()
            ->filterTab($request->tab)
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->whereRaw('name COLLATE utf8mb4_0900_ai_ci LIKE ?', ["%{".trim($request->search)."}%"]);
            })
            ->paginate($request->integer('size', 50));
        return response()->json([
            ...$categories->toArray(),
            'meta' => [
                'counts' => [
                    'all' => (int) $counts->all_count,
                    'expense' => (int) $counts->expense_count,
                    'income' => (int) $counts->income_count,
                    'deleted' => (int) $counts->deleted_count,
                ],
            ],
        ]);
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
