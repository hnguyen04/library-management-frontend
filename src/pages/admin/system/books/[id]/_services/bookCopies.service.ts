import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
// import { httpService } from "@/base/http-service";


class BookCopiesService extends BaseCrudService {
    constructor() {
        super('/bookCopies');
    }
}

const bookCopiesService = new BookCopiesService();

export default bookCopiesService;
