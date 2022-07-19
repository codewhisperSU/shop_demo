import { Value } from '@prisma/client/runtime';
import { Context, MockContext } from '../../../context';

export interface IDatabase {
    connect: () => Context | MockContext | undefined;
}
