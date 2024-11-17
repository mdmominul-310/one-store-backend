import { Model, Schema, model } from "mongoose";
import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";

interface IBanner {
    meadia: string[];
}
type BanerModel = Model<IBanner>;

const bannerSchema = new Schema<IBanner, BanerModel>({
    meadia: {
        type: [String],
        required: true,
    },
});
const Banner = model<IBanner>("Banner", bannerSchema);

class BannerController {
    Banner: typeof Banner;
    Response: typeof responseReturn;
    constructor() {
        this.Banner = Banner;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const isExist = await this.Banner.findOne({});
        if (isExist) {
            const result = await this.Banner.updateOne({}, req.body);
            return this.Response(res, {
                success: true,
                message: "Banner updated successfully",
                data: result,
            });

        }
        const banner = await this.Banner.create(req.body);
        return this.Response(res, {
            success: true,
            message: "Banner created successfully",
            data: banner,
        });
    }
    );

    findAll = catchAsync(async (req: Request, res: Response) => {
        const banner = await this.Banner.findOne({});
        return this.Response(res, {
            success: true,
            message: "Banner fetched successfully",
            data: banner,
        });
    });
}

const bannerController = new BannerController();
export default bannerController;