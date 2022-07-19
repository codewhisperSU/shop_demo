import { createMockContext, MockContext } from '../../context';
import { IDatabase } from '../models/database/database';

export class TestConnectionService implements IDatabase {
    private prismaClient: MockContext;

    constructor() {
        this.prismaClient = createMockContext();
    }

    connect(): MockContext | undefined {
        return this.prismaClient;
    }
}
