<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::query()
            ->with('category:id,name,type')
            ->where('user_id', auth()->id())
            ->when($request->filled('type'), fn ($query) => $query->where('type', $request->type))
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->category_id))
            ->when($request->filled('dated_from'), fn ($query) => $query->where('dated', '>=', $request->dated_from))
            ->when($request->filled('dated_to'), fn ($query) => $query->where('dated', '<=', $request->dated_to))
            ->when($request->filled('search'), fn ($query) => $query->whereLike('note', '%' . $request->search . '%'))
            ->orderByDesc('id')
            ->paginate($request->integer('limit', 100));
        return TransactionResource::collection($transactions);
    }

    public function summary(Request $request)
    {
        $summary = Transaction::query()
            ->selectRaw("
                COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
                COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense,
                COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as balance,
                COUNT(*) as count
            ")
            ->where('user_id', auth()->id())
            ->when($request->filled('type'), fn ($query) => $query->where('type', $request->type))
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->category_id))
            ->when($request->filled('dated_from'), fn ($query) => $query->where('dated', '>=', $request->dated_from))
            ->when($request->filled('dated_to'), fn ($query) => $query->where('dated', '<=', $request->dated_to))
            ->when($request->filled('search'), fn ($query) => $query->whereLike('note', '%' . $request->search . '%'))
            ->first();
        return response()->json($summary);
    }

    public function store(TransactionRequest $request)
    {
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'category_id' => $request->validated('category_id'),
            'type' => $request->validated('type'),
            'note' => $request->validated('note'),
            'amount' => $request->validated('amount'),
            'dated' => $request->validated('dated'),
        ]);
        $transaction->load('category:id,name,type');
        return response()->json([
            'message' => 'Tạo giao dịch thành công.',
            'data' => new TransactionResource($transaction)
        ]);
    }

    public function show(Transaction $transaction): TransactionResource
    {
        throwIf($transaction->user_id !== auth()->id(), "Không tìm thấy giao dịch.", 404);
        $transaction->load('category:id,name,type');
        return new TransactionResource($transaction);
    }

    public function update(TransactionRequest $request, Transaction $transaction): JsonResponse
    {
        throwIf($transaction->user_id !== auth()->id(), "Không tìm thấy giao dịch.", 404);
        $transaction->update([
            'category_id' => $request->validated('category_id'),
            'type' => $request->validated('type'),
            'note' => $request->validated('note'),
            'amount' => $request->validated('amount'),
            'dated' => $request->validated('dated'),
        ]);
        $transaction->load('category:id,name,type');
        return response()->json([
            'message' => 'Cập nhật giao dịch thành công.',
            'data' => new TransactionResource($transaction)
        ]);
    }

    public function bulkDelete(Request $request): JsonResponse
    {
        $ids = collect(explode(',', $request->id))->map('ceil')->filter(fn ($id) => $id > 0)->unique()->values();
        throwIf($ids->isEmpty(), "Danh sách ID không hợp lệ.", 422);
        Category::query()->where('user_id', auth()->id())->whereIn('id', $ids)->delete();
        return response()->json(['message' => 'Xóa danh mục thành công.',]);
    }
}
