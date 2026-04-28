import { http } from "@/common/libs/axios";
import type { Category } from "@/features/category/types/category.type";

export const categoryService = {
    findAll() {
        return http.get<Category[]>('/categories');
    }
};