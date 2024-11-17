import ApiError from "../../../errors/ApiError";
import { IGenericResponse, IPaginatinQuery } from "../../../interfaces/common";
import { IProducts } from "./products.interface";
import Products from "./products.model";

class ProductService {
    Product: typeof Products;
    ApiError: typeof ApiError;
    constructor() {
        this.Product = Products;
        this.ApiError = ApiError;
    }

    async create(payload: IProducts): Promise<IProducts> {
        const isExist = await this.Product.findOne({ title: payload.title });
        if (isExist) {
            throw new this.ApiError(400, "Product already exist");
        }
        if (payload.images.length === 0) {
            throw new this.ApiError(400, "Images is required");
        }
        // payload.id = numberOperation.randomSixDigitNumber().toString();
        payload.slug = payload.title.toLowerCase().split(' ').join('-');

        return this.Product.create(payload);
    }

    async findAll(filterPagination: IPaginatinQuery): Promise<IGenericResponse<IProducts[]>> {
        const { page, limit, filter, search } = filterPagination;
        const skip = (page - 1) * limit;
        const query: Record<string, unknown> = {};
        if (filter?.category) {
            if (query.$and) {
                (query.$and as Record<string, unknown>[]).push({ "categories.title": filter.category });
            } else {
                query.$and = [{ "categories.title": filter.category }];
            }
        }
        if (typeof filter?.price === 'string') {
            const price = filter.price.split('-');
            if (query.$and) {
                (query.$and as Record<string, unknown>[]).push({ "stock.salePrice": { $lte: price[1].toString(), $gte: price[0].toString() } });
            } else {
                query.$and = [{ "stock.salePrice": { $lte: price[1].toString(), $gte: price[0].toString() } }];
            }
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const result = await this.Product.find(query).skip(skip).limit(limit);
        const total = await this.Product.countDocuments(query);
        return {
            meta: {
                page,
                total,
                limit
            },
            data: result
        };
    }

    async findOne(id: string): Promise<IProducts> {
        const product = await this.Product.findById(id);
        if (!product) {
            throw new this.ApiError(404, "Product not found");
        }
        return product;
    }

    async update(id: string, payload: IProducts): Promise<IProducts | null> {
        const product = await this.Product.findById(id);
        if (!product) {
            throw new this.ApiError(404, "Product not found");
        }
        return this.Product.findByIdAndUpdate(id, payload, { new: true });
    }

    async delete(id: string): Promise<IProducts | null> {
        const product = await this.Product.findById(id);
        if (!product) {
            throw new this.ApiError(404, "Product not found");
        }
        return this.Product.findByIdAndDelete(id);
    }
    async findBySlug(slug: string): Promise<IProducts> {
        const product = await this.Product.findOne({
            slug
        });
        if (!product) {
            throw new this.ApiError(404, "Product not found");
        }
        return product;
    }

}

const productService = new ProductService();

export default productService;