<?php

namespace App\Http\Controllers;

use App\Exports\CategoriesExport;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Exception;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            ...Category::where('user_id', auth()->id())
                ->when(in_array($request->tab, ['income', 'expense']), fn ($query) => $query->where('type', $request->tab))
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->whereRaw('name COLLATE utf8mb4_0900_ai_ci LIKE ?', ["%".trim($request->search)."%"]);
                })
                ->paginate($request->integer('limit', 20))
                ->toArray(),
            'meta' => [
                'counts' => Category::where('user_id', auth()->id())
                    ->selectRaw("COUNT(1) AS `all`, SUM(type = 'expense') AS `expense`, SUM(type = 'income') AS `income`")
                    ->first(),
            ],
        ]);
    }

    /**
     * @throws Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function export(Request $request): BinaryFileResponse
    {
        $ids = collect($request->query('ids'))->map(fn ($id) => (int) trim($id))->filter(fn ($id) => $id > 0)->unique()->values()->all();
        $query = Category::query()->where('user_id', auth()->id());
        if (!empty($ids)) {
            $categories = $query->whereIn('id', $ids)->get();
        } else {
            $tab = $request->query('tab', 'all');
            $search = trim($request->query('search', ''));
            $categories = $query->when(in_array($tab, ['expense', 'income']), fn ($q) => $q->where('type', $tab))
                ->when($search, function ($query) use ($request, $search) {
                    $query->whereRaw('name COLLATE utf8mb4_0900_ai_ci LIKE ?', ["%$search%"]);
                })
                ->get();
        }
        return Excel::download(new CategoriesExport($categories), 'categories.xlsx');
    }

    public function store(StoreCategoryRequest $request)
    {
        return response([
            'message' => 'Tạo mới danh mục thành công!',
            'data' => Category::create([
                'name' => $request->validated('name'),
                'type' => $request->validated('type'),
                'user_id' => auth()->id(),
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

    public function bulkDelete(Request $request)
    {
        throwIf(empty($request->ids) || !is_array($request->ids), "Vui lòng chọn danh mục cần xóa");
        Category::query()->where('user_id', auth()->id())->whereIn('id', $request->ids)->delete();
        return response()->json([
            'message' => 'Xóa danh mục hàng loạt thành công.',
        ]);
    }
}
