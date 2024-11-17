import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import responseReturn from "../../../helpers/responseReturn";
import { UploadService } from "./upload.service";

const multipleFileUploadController = catchAsync(async (req: Request, res: Response) => {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const result = await UploadService.multipleFileUploadService(files)

    responseReturn(res, {
        success: true,
        message: 'File uploaded successfully',
        data: result
    });
}
)


const uploadController = {
    multipleFileUploadController
}
export default uploadController;