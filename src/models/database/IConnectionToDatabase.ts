export interface IConnectionToDatabase<T> {
    connect: () => T; // Context | MockContext | undefined;
}
