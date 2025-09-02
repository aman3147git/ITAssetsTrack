import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './utils/database.js';
import requestRoutes from './routes/requestRoutes.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,
};
app.use(cors(corsOptions));



app.use('/api/user', userRoute);
app.use('/api/requests', requestRoutes);


const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
