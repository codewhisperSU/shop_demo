import { PrismaClient } from '@prisma/client';
import { Context } from '../../context';
import { IDatabase } from '../models/database/database';

export class ConnectionService implements IDatabase {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    connect(): Context | undefined {
        return { prisma: this.prismaClient };
    }
}
