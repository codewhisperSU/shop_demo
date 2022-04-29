import 'reflect-metadata';
import express, {Express, NextFunction, Request, Response} from 'express';
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import Router from "./routes";


dotenv.config();



const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true,
})
);

app.use(bodyParser.json());

app.use(express.json());

app.use("/docs",
swaggerUi.serve,
swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    }
}));

app.use(Router);

app.get('/', (reg: Request, res: Response) => {
    res.send("Shop demo!!!");
})

app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {
    const message = err.message;
  
    res.status(500).send(message)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})


