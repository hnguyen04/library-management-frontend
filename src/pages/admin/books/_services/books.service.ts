import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
import { IPaginatedItems } from "@/base/base.model";
// import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";


class BooksService extends BaseCrudService {
    constructor() {
        super('/books');
    }

    public async getAllBooks() {
        const response = await httpService.request<TBaseResponse<IPaginatedItems<any>>>({
            url: "/books/GetAll",
            params: {
                skipCount: 0,
                maxResultCount: 1000,
            },
            method: "GET"
        })
        return response.result;
    }
}

const booksService = new BooksService();

export default booksService;
