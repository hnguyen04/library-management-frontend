import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";


class BookRequestsService extends BaseCrudService {
    constructor() {
        super('/book-requests');
    }

        public async getAllClientBooksRequests(userId: string) {
            const response = await httpService.request<TBaseResponse<IPaginatedItems<any>>>({
                url: `/book-requests/GetAll`,
                params: {
                    skipCount: 0,
                    maxResultCount: 1000,
                    userId: userId,
                },
                method: "GET"
            })
            return response.result;
        }
}

const bookRequestsService = new BookRequestsService();

export default bookRequestsService;
