/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import *as dotenv from 'dotenv';
import MainRoutes from './app/routes/mainRoutes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import admin from 'firebase-admin';
import { serviceAccount } from './config/firebase.config';

dotenv.config();

const app: Express = express();
app.set('trust proxy', true)

app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', MainRoutes)

app.get('/', (req, res) => {
    res.send('welcome to the server');
});

app.use(globalErrorHandler)



// Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as unknown as string),
    storageBucket: 'gs://fugen-ecom.appspot.com'
});


export default app;