import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';


import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


export default app;
