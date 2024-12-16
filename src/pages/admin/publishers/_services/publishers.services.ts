import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { IPaginatedItems } from '@/base/base.model';
import { httpService } from '@/base/http-service';

interface IPublisher {
  id: number;
  name: string;
}
class PublishersService extends BaseCrudService {
  constructor() {
    super('/publishers');
  }
  
  public async getAllPublishers() {
    const response = await httpService.request<
      TBaseResponse<IPaginatedItems<IPublisher>>
    >({
      url: '/publishers/GetAll',
      params: {
        maxResultCount: 1000,
      },
      method: 'GET',
    });
    return response.result;
  }
}

const publishersService = new PublishersService();

export default publishersService;
