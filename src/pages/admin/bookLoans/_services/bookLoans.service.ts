import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";


class BookLoansService extends BaseCrudService {
    constructor() {
        super('/book-loans');
    }

    public async setBookBorrowed(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/SetBorrowed',
            data,
        });

        return res.result;
    }

    public async setBookRejected(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/RejectBorrow',
            data,
        });

        return res.result;
    }

    public async setReturnAccepted(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/AcceptReturn',
            data,
        });

        return res.result;
    }
    public async setReturnRejected(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/RejectReturn',
            data,
        });

        return res.result;
    }

    public async setNonreturnable(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'PUT',
            url: '/book-loans/SetNonreturnable',
            data,
        });
        return res.result;
    }
}

const bookLoansService = new BookLoansService();

export default bookLoansService;
