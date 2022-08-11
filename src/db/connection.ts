import { PrismaClient } from '@prisma/client';
import { Context } from '../../context';
import { IConnectionToDatabase } from '../models/database/IConnectionToDatabase';

export class ConnectionService implements IConnectionToDatabase<Context> {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    connect(): Context {
        return { prisma: this.prismaClient };
    }
}
