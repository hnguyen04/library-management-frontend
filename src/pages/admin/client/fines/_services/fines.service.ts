import { BaseCrudService } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
// import { httpService } from "@/base/http-service";


class FinesClientService extends BaseCrudService {
    constructor() {
        super('/fines');
    }
}

const finesClientService = new FinesClientService();

export default finesClientService;
