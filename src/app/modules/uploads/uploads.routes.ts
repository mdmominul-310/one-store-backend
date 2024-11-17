import { Router } from "express";
import multer from 'multer';
import uploadController from "./upload.controller";
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });
const router: Router = Router();
router.post('/', uploads.array('files'), uploadController.multipleFileUploadController);

export { router as UploadsRoutes }