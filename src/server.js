import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/AuthRoute.js';
import UserRouter from './routes/UserRoute.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', AuthRouter);
app.use('/users', UserRouter)


export default app;