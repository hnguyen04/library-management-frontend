import { BaseCrudService, TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import { ITemplateBill } from './template-bill.model';

class TemplateBillService extends BaseCrudService {
  constructor() {
    super('/api/services/app/TemplateBill');
  }

  public getAllTemplateBill() {
    this.basePath = '/api/services/app/TemplateBill';

    return super.getAll<ITemplateBill>(
      {
        pageSize: 10,
      },
      'GetAllTemplateBill',
    );
  }

  public async create(data: Partial<any>, path?: string): Promise<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await httpService.request<TBaseResponse<any>>({
      method: 'POST',
      url: `${this.basePath}${path}`,
      data: formData,
      contentType: 'multipart/form-data',
    });
    return res.result;
  }

  public async update(data: Partial<any>, path?: string): Promise<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await httpService.request<TBaseResponse<any>>({
      method: 'POST',
      url: `${this.basePath}${path}`,
      data: formData,
      contentType: 'multipart/form-data',
    });
    return res.result;
  }
}

export default new TemplateBillService();
