import ApiError from "../../../errors/ApiError";
import { IOrders } from "./orders.interface";
import Orders from "./orders.model";

class OrderService {
    Order: typeof Orders;
    ApiError: typeof ApiError;

    constructor() {
        this.Order = Orders;
        this.ApiError = ApiError;
    }

    async create(order: IOrders): Promise<IOrders> {
        return await this.Order.create(order);
    }

    async findAll(): Promise<IOrders[]> {
        return await this.Order.find().sort({ createdAt: -1 });
    }

    async findOne(id: string): Promise<IOrders | null> {
        return await this.Order.findById(id);
    }

    async update(id: string, order: IOrders): Promise<IOrders | null> {
        return await this.Order.findByIdAndUpdate(id, order, { new: true });
    }

    async delete(id: string): Promise<IOrders | null> {
        return await this.Order.findByIdAndDelete(id);
    }
}

const orderService = new OrderService();
export default orderService;