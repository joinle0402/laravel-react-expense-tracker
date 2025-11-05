<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->query('per_page', 20);
        $query = Category::query()
            ->select(['id', 'name', 'type', 'icon'])
            ->when($request->name, fn ($query, $name) => $query->whereLike('name', $name))
            ->when($request->type, fn ($query, $type) => $query->where('type', $type))
            ->orderBy('id', 'desc');
        if ($perPage == '-1') {
            $data = $query->get();
            return CategoryResource::collection(new LengthAwarePaginator($data, $data->count(), $data->count(), 1));
        }
        return CategoryResource::collection($query->paginate($perPage));
    }

    public function store(StoreCategoryRequest $request)
    {
        return new CategoryResource(Category::create($request->validated()));
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        return new CategoryResource($category->update($request->validated()));
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->noContent();
    }
}
