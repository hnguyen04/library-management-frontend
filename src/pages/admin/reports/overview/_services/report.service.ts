import { BaseCrudService } from '@/base/base-crud-service';
import { TBaseResponse } from '@/base/base-crud-service';
import { httpService } from '@/base/http-service';

import { IGetCountStatistic, IGetStatistics } from './report.model';

export class ReportService extends BaseCrudService {
  constructor() {
    super('');
  }

  public async getReflectCountStatistic() {
    const res = await httpService.request<TBaseResponse<IGetCountStatistic>>({
      method: 'GET',
      url: '/api/services/app/AdminCitizenReflect/GetReflectCountStatistic',
    });

    return res.result;
  }

  public async getChatMsgCountStatistics() {
    const res = await httpService.request<TBaseResponse<IGetCountStatistic>>({
      method: 'GET',
      url: '/api/services/app/OrganizationUnitChat/GetChatMsgCountStatistics',
    });

    return res.result;
  }

  public async getStatisticsCitizenReflect(
    numberRange: number,
    queryCase: number,
    formId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/AdminCitizenReflect/GetStatisticsCitizenReflect?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}`,
    });

    return res.result;
  }

  public async getStatisticsChatOrganization(
    numberRange: number,
    queryCase: number,
    formId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/StatisticsOrganizationUnitChat/GetStatisticsChatOrganization?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}`,
    });

    return res.result;
  }

  public async getStatisticsCityVote(
    numberRange: number,
    queryCase: number,
    formId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `api/services/app/CityVote/GetStatisticsCityVote?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}`,
    });

    return res.result;
  }

  public async getAllCitizenStatistic(
    numberRange: number,
    queryCase: number,
    formId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/Citizen/GetAllCitizenStatistic?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}`,
    });

    return res.result;
  }

  public async getUserStatistics(numberRange: number, queryCase: number) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/User/GetUserStatistics?numberRange=${numberRange}&queryCase=${queryCase}`,
    });

    return res.result;
  }

  public async getBillStatistics(
    numberRange: number,
    queryCase: number,
    formId: number,
  ) {
    const res = await httpService.request<TBaseResponse<IGetStatistics>>({
      method: 'GET',
      url: `/api/services/app/AdminManagerBill/GetBillStatistics?numberRange=${numberRange}&queryCase=${queryCase}&formId=${formId}`,
    });

    return res.result;
  }
}

const reportService = new ReportService();

export default reportService;
