import express from "express"
import dotenv from "dotenv"
import {HttpError} from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser'
import {database} from './configurations'
import userRoutes from './routes/userRoutes/userRoutes'
import eventRoutes from './routes/eventRoutes/eventRoutes'
import paystackRoutes from "./routes/paystackRoutes/paystackRoute"
import adminRoutes from "./routes/adminRoutes/adminRoutes";
import config from './configurations/config';


const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: '*'
}))
// app.use(cors({
    //   origin: 'http://localhost:5173',
    //   credentials: true, // if you're passing credentials (cookies, authorization headers, etc.)
    // }));
    app.use(bodyParser.json())
    app.use('/users', userRoutes)
    app.use('/events', eventRoutes)
    app.use("/paystack", paystackRoutes);
    app.use("/admin", adminRoutes)

database.sync({}).then( ()=>{
    console.log("Database is connected");
}).catch((err:HttpError)=>{
    console.log(err);
})


app.listen(config.PORT, ()=>{
    console.log(`server running on port ${config.PORT}`)
})

export default app;