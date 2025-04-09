import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './route/authRoute.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/vi/auth', authRoutes);

//rest api
app.get('/', (req,res)=>{
    res.send("<h1>Welcome to our ecommerce store</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
 console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});