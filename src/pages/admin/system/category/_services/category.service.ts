import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';
interface IRole {
    id: number;
    name: string;
    permissions: any[];
  }
class CategoryService extends BaseCrudService {
    constructor() {
      super('/category');
    }
    public async getAllCategories() {
      const response = await httpService.request<TBaseResponse<IPaginatedItems<IRole>>>({
        url: "/category/GetAll",
        method: "GET"
      })
      return response.result;
    }
  }
  const categoryService = new CategoryService();

export default categoryService;