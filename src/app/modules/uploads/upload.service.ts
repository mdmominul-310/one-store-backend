import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status";
import admin from 'firebase-admin'


const multipleFileUploadService = async (files: Express.Multer.File[]) => {
    if (!files) {
        throw new ApiError(httpStatus.CONFLICT, 'Please upload a file')
    }
    const fileUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileBuffer = file.buffer;
        const fileName = file.originalname.split('.')
        const fileExtention = fileName[fileName.length - 1]
        // make file name with date and time and remove space from file name
        file.originalname = `${fileName[0].split(' ').join('-')}-${Date.now()}.${fileExtention}`
        // check file extention is allowed or not
        const allowedExtention = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'mp4', 'webm', 'ogg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'mkv']
        if (!allowedExtention.includes(fileExtention)) {
            throw new ApiError(httpStatus.CONFLICT, 'File extention not allowed')
        }
        const bucket = admin.storage().bucket();
        bucket.makePublic()
        const token = 6545455 + Math.random() * 1000000
        await bucket.file(file.originalname).save(fileBuffer, {
            metadata: {
                firebaseStorageDownloadTokens: token

            }
        })
        fileUrls.push(bucket.file(file.originalname).publicUrl());


    }

    return fileUrls
}



export const UploadService = {

    multipleFileUploadService
}


