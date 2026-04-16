export declare abstract class BaseEntity {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    readonly deletedAt: Date | null;
    constructor(props: {
        id: number;
        createdAt: Date;
        updatedAt?: Date | null;
        deletedAt?: Date | null;
    });
}
