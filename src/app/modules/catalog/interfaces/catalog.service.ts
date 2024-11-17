import ApiError from "../../../../errors/ApiError";
import { CatalogModel, ICatalog } from "./catalog.interfaces";


class CatalogService {
    Catalog: CatalogModel;
    ApiError: typeof ApiError;
    constructor(Catalog: CatalogModel) {
        this.Catalog = Catalog;
        this.ApiError = ApiError;
    }

    async create(payload: ICatalog): Promise<ICatalog> {
        const isExist = await this.Catalog.findOne({ name: payload.name });
        if (isExist) {
            throw new this.ApiError(400, "Catalog already exists");
        }
        return this.Catalog.create(payload);
    }

    async findAll(): Promise<ICatalog[]> {
        return this.Catalog.find();
    }

    async findOne(id: string): Promise<ICatalog | null> {
        return this.Catalog.findById(id);
    }

    async update(id: string, payload: ICatalog): Promise<ICatalog | null> {
        return this.Catalog.findByIdAndUpdate(id, payload, { new: true });
    }

    async delete(id: string): Promise<ICatalog | null> {
        return this.Catalog.findByIdAndDelete(id);
    }
}

export default CatalogService;