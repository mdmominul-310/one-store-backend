import { Request, Response, Router } from "express";
import { model, Model, Schema } from "mongoose";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";

type ISystemConfig = {
    fbPixelId: string;
    fbAppId: string;
}

type SystemModel = Model<ISystemConfig>;

const systemConfigSchema = new Schema<ISystemConfig, SystemModel>({
    fbAppId: {
        type: String,
    },
    fbPixelId: {
        type: String,
    }
});

const SystemConfig = model<ISystemConfig, SystemModel>("SystemConfig", systemConfigSchema);

const createSystemConfig = catchAsync(async (req: Request, res: Response) => {
    const payload: ISystemConfig = req.body;
    const isExist = await SystemConfig.findOne({});
    if (isExist) {
        await SystemConfig.updateOne({}, payload);
    } else {
        const systemConfig = new SystemConfig(payload);
        await systemConfig.save();
    }
    responseReturn(res, {
        message: "System Config Created Successfully",
        data: payload,
        success: true,
    });
});

const getSystemConfig = catchAsync(async (req: Request, res: Response) => {
    const systemConfig = await SystemConfig.findOne({});
    responseReturn(res, {
        message: "System Config Fetched Successfully",
        data: systemConfig,
        success: true,
    });
});

const router: Router = Router();

router.route("/").post(createSystemConfig).get(getSystemConfig);

export { router as systemConfigRouter }