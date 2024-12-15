import { BaseCrudService } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
// import { httpService } from "@/base/http-service";


class FinesService extends BaseCrudService {
    constructor() {
        super('/fines');
    }
}

const finesService = new FinesService();

export default finesService;
