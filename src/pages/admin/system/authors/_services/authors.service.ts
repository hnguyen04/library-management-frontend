import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

interface IRole {
  id: number;
  name: string;
  permissions: any[];
}


class AuthorsService extends BaseCrudService {
  constructor() {
    super('/authors');
  }
  public async getAllAuthors() {
    const response = await httpService.request<TBaseResponse<IPaginatedItems<IRole>>>({
      url: "/authors/GetAll",
      method: "GET"
    })
    return response.result;
  }
}

const authorsService = new AuthorsService();

export default authorsService;
