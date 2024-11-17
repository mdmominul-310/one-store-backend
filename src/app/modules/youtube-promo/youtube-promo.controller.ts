import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../helpers/catchAsync";
import YoutubePromo from "./youtube-promo.model";
import responseReturn from "../../../helpers/responseReturn";

class YoutubePromoController {
    YouTubePromo: typeof YoutubePromo;
    ApiError: typeof ApiError;
    Response: typeof responseReturn;

    constructor() {
        this.YouTubePromo = YoutubePromo;
        this.ApiError = ApiError;
        this.Response = responseReturn;
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const isExist = await this.YouTubePromo.findOne({ title: req.body.title });
        if (isExist) {
            throw new this.ApiError(400, "Title already exist");
        }

        const youtubePromo = await this.YouTubePromo.create(req.body);
        this.Response(res, {
            message: "Youtube promo created successfully",
            data: youtubePromo,
            success: true
        });

    });

    get = catchAsync(async (req: Request, res: Response) => {
        const youtubePromo = await this.YouTubePromo.find();
        this.Response(res, {
            message: "Youtube promo fetched successfully",
            data: youtubePromo,
            success: true
        });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const youtubePromo = await this.YouTubePromo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        this.Response(res, {
            message: "Youtube promo updated successfully",
            data: youtubePromo,
            success: true
        });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const result = await this.YouTubePromo.findByIdAndDelete(req.params.id);
        this.Response(res, {
            message: "Youtube promo deleted successfully",
            success: true,
            data: result
        });
    });
}

const youtubePromoController = new YoutubePromoController();
export default youtubePromoController;