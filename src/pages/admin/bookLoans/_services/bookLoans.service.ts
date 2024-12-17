import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
import { IPaginatedItems } from "@/base/base.model";
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

    public async getAllBooksLoans() {
        const response = await httpService.request<TBaseResponse<IPaginatedItems<any>>>({
            url: "/book-loans/GetAll",
            params: {
                skipCount: 0,
                maxResultCount: 1000,
            },
            method: "GET"
        })
        return response.result;
    }
    public async getAllClientBooksLoans(userId: string) {
        const response = await httpService.request<TBaseResponse<IPaginatedItems<any>>>({
            url: `/book-loans/GetAll?userId=${userId}`,
            params: {
                skipCount: 0,
                maxResultCount: 1000,
            },
            method: "GET"
        })
        return response.result;
    }
}

const bookLoansService = new BookLoansService();

export default bookLoansService;
