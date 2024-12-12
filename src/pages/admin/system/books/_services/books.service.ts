import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
// import { httpService } from "@/base/http-service";


class BooksService extends BaseCrudService {
    constructor() {
        super('/books');
    }
}

const booksService = new BooksService();

export default booksService;
