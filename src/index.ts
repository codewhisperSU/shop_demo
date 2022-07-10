import 'reflect-metadata';
import dotenv from 'dotenv';
import createServer from './server';

dotenv.config();

const port = process.env.PORT;

const app = createServer();

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
