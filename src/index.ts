import 'reflect-metadata';
import dotenv from 'dotenv';
import createServer from './server';
import { container } from 'tsyringe';
import { ConnectionService } from './db/connection';

dotenv.config();

container.register('IDatabase', { useClass: ConnectionService });

const port = process.env.PORT;

const app = createServer();

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
