import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";


class BookLoansClientService extends BaseCrudService {
    constructor() {
        super('/book-loans');
    }

    public async removeBorrow(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/RejectBorrow',
            data,
        });

        return res.result;
    }

    public async requestReturning(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/RequestReturn',
            data,
        });
        return res.result;
    }

}

const bookLoansClientService = new BookLoansClientService();

export default bookLoansClientService;
