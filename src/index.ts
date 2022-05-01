import 'reflect-metadata';
import express, {Express, NextFunction, Request, Response} from 'express';
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';
import bodyParser, { json } from "body-parser";
import cors from 'cors';
import Router from "./routes";
import { SystemError } from './models/error/error';

dotenv.config();



const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true,
})
);

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use("/docs",
swaggerUi.serve,
swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "../build/swagger.json",
    }
}));

app.use(Router);

app.get('/', (reg: Request, res: Response) => {
    res.send("Shop demo!!!");
})

app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {

    const systemError = {errorMessage: err.message} as SystemError
  
    res.status(500).send(JSON.stringify(systemError));
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})


