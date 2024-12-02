import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

interface IRole {
  normalizedName: string;
  displayName: string;
  name: string;
}
class AccountsService extends BaseCrudService {
  constructor() {
    super('/api/services/app/User');
  }
  public async resetPassword<T>(data: any, path = '/ResetPassword') {
    const res = await httpService.request<TBaseResponse<T>>({
      method: 'POST',
      url: `${this.basePath}${path}`,
      data,
    });

    return res.result;
  }

  public async getAllRoles() {
    const response = await httpService.request<
      TBaseResponse<{ items: IRole[] }>
    >({
      url: '/api/services/app/role/getall',
      method: 'get',
    });
    return response.result;
  }
}

const accountsService = new AccountsService();

export default accountsService;
