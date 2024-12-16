import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";


class BooksClientService extends BaseCrudService {
    constructor() {
        super('/books');
    }

    public async createBookLoan(data: any): Promise<any> {
        const res = await httpService.request<TBaseResponse<any>>({
            method: 'POST',
            url: '/book-loans/RequestBorrow',
            data,
        });
        return res.result;
    }


}

const booksClientService = new BooksClientService();

export default booksClientService;
