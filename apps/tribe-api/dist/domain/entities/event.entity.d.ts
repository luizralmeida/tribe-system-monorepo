import { BaseEntity } from './entity.base.js';
export interface EventProps {
    id: number;
    name: string | null;
    addressId: number;
    date: Date;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
export declare class Event extends BaseEntity {
    readonly name: string | null;
    readonly addressId: number;
    readonly date: Date;
    constructor(props: EventProps);
}
