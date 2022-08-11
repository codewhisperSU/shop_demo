import { createMockContext, MockContext } from '../../context';
import { IConnectionToDatabase } from '../models/database/IConnectionToDatabase';

export class TestConnectionService
    implements IConnectionToDatabase<MockContext>
{
    private prismaClient: MockContext;

    constructor() {
        this.prismaClient = createMockContext();
    }

    connect(): MockContext {
        return this.prismaClient;
    }
}
