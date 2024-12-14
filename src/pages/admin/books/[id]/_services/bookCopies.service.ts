import { BaseCrudService, TBaseResponse } from "@/base/base-crud-service";
// import { IPaginatedItems } from "@/base/base.model";
import { httpService } from "@/base/http-service";

type TCreateBookCopies = {
    id: string;
    number: number;
}

class BookCopiesService extends BaseCrudService {
    constructor() {
        super('/book-copies');
    }

    public async createMultipleBookCopies<T>(data: TCreateBookCopies, path = '/CreateMany') {
        const res = await httpService.request<TBaseResponse<T>>({
            method: 'POST',
            url: `${this.basePath}${path}`,
            data,
        });

        return res.result;
    }
}

const bookCopiesService = new BookCopiesService();

export default bookCopiesService;
