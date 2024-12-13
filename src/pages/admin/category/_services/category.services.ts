import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';
interface ICategory {
    id: number;
    name: string;
  }
class CategoryService extends BaseCrudService {
    constructor() {
      super('/categories');
    }
    public async getAllCategories() {
      const response = await httpService.request<TBaseResponse<IPaginatedItems<ICategory>>>({
        url: "categories/GetAll",
        method: "GET"
      })
      return response.result;
    }
  }
  const categoryService = new CategoryService();

export default categoryService;