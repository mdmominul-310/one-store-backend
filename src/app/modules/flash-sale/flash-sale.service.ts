import ApiError from "../../../errors/ApiError";
import { IResponseType } from "../../../helpers/responseReturn";
import { IPaginatinQuery } from "../../../interfaces/common";
import { IFlashSale } from "./flash-sale.interface";
import FlashSale from "./flash-sale.model";

class FlashSaleService {
    FlashSale: typeof FlashSale;
    ApiError: typeof ApiError;

    constructor() {
        this.FlashSale = FlashSale;
        this.ApiError = ApiError;
    }

    async create(payload: IFlashSale): Promise<IFlashSale> {
        const isExist = await this.FlashSale.findOne({ title: payload.title });
        if (isExist) {
            throw new this.ApiError(400, 'Flash sale already exists');
        }

        return await this.FlashSale.create(payload);
    }

    async getAll(pagination: IPaginatinQuery): Promise<IResponseType<IFlashSale[]>> {
        const { limit, page, filter } = pagination;
        const skip = limit * (page - 1);
        const query: Record<string, unknown> = {};
        if (filter?.search) {
            query.title = { $regex: filter.search, $options: 'i' };
        }
        if (filter?.status) {
            query.status = filter.status;
        }

        const result = await this.FlashSale.find(query).populate('products').skip(skip).limit(limit);
        const total = await this.FlashSale.countDocuments(query);
        return {
            data: result,
            meta: {
                total,
                page,
                limit
            }
        }

    }

    async getOne(id: string): Promise<IFlashSale | null> {
        return await this.FlashSale.findById(id).populate('products');
    }

    async update(id: string, payload: IFlashSale): Promise<IFlashSale | null> {
        return await this.FlashSale.findByIdAndUpdate(id, payload, { new: true });
    }

    async delete(id: string): Promise<IFlashSale | null> {
        return await this.FlashSale.findByIdAndDelete(id);
    }
}

const flashSaleService = new FlashSaleService();

export default flashSaleService;