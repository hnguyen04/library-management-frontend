import { BaseCrudService } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
// import { httpService } from "@/base/http-service";


class BookRequestsService extends BaseCrudService {
    constructor() {
        super('/book-requests');
    }
}

const bookRequestsService = new BookRequestsService();

export default bookRequestsService;
