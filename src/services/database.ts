import { inject, singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Context, MockContext } from '../../context';
import { IDatabase } from '../models/database/database';

@singleton()
export class DatabaseService {
    private prismaClientData: Context | MockContext | undefined;

    constructor(@inject('IDatabase') private service: IDatabase) {
        this.prismaClientData = service.connect();
    }

    get connect(): PrismaClient {
        if (this.prismaClientData !== undefined) {
            return this.prismaClientData.prisma;
        } else {
            throw new Error('Database handler missing!');
        }
    }
}
