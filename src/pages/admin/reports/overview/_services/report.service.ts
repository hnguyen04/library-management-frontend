import { BaseCrudService } from '@/base/base-crud-service';
// import { TBaseResponse } from '@/base/base-crud-service';
// import { httpService } from '@/base/http-service';


export class ReportService extends BaseCrudService {
  constructor() {
    super('');
  }
}


const reportService = new ReportService();

export default reportService;
