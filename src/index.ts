import { PrismaClient} from '@prisma/client';
import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';


dotenv.config();

const prisma = new PrismaClient();


const app: Express = express();
const port = process.env.PORT;

app.use(express.json);

app.get('/', (reg: Request, res: Response) => {
    res.send("Express + Typescript Server");
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})


