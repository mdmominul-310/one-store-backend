import { Model, Schema, model } from "mongoose";
import catchAsync from "../../../helpers/catchAsync";
import { Request, Response, Router } from "express";
import responseReturn from "../../../helpers/responseReturn";
import ApiError from "../../../errors/ApiError";

export type IPromotion = {
    id?: string;
    title: string;
    description?: string;
    url: string;
}

type PromotionModel = Model<IPromotion>;

const promotionSchema = new Schema<IPromotion, PromotionModel>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
});

const Promotion = model<IPromotion, PromotionModel>('Promotion', promotionSchema);

export const createPromotion = catchAsync(async (req: Request, res: Response) => {
    const isExist = await Promotion.findOne({ title: req.body.title });
    if (isExist) {
        throw new ApiError(400, 'Promotion already exist');
    }
    const newPromotion: IPromotion = await Promotion.create(req.body);
    responseReturn(res, {
        message: 'Promotion created successfully',
        data: newPromotion,
        success: true
    })
});

export const getPromotions = catchAsync(async (req: Request, res: Response) => {
    const promotions = await Promotion.find();
    responseReturn(res, {
        data: promotions,
        success: true,
        message: 'Promotions retrieved successfully'

    })
});

export const getPromotion = catchAsync(async (req: Request, res: Response) => {
    const promotion = await Promotion.findById(req.params.id);
    responseReturn(res, {
        data: promotion,
        success: true,
        message: 'Promotion retrieved successfully'
    })
});

export const updatePromotion = catchAsync(async (req: Request, res: Response) => {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    responseReturn(res, {
        data: promotion,
        success: true,
        message: 'Promotion updated successfully'
    })
}
);

export const deletePromotion = catchAsync(async (req: Request, res: Response) => {
    const result = await Promotion.findByIdAndDelete(req.params.id);
    responseReturn(res, {
        success: true,
        message: 'Promotion deleted successfully',
        data: result
    })
});

const router: Router = Router();

router.post('/', createPromotion);
router.get('/', getPromotions);
router.get('/:id', getPromotion);
router.patch('/:id', updatePromotion);
router.delete('/:id', deletePromotion);

export { router as promotionRoutes }