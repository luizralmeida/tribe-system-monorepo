import { Event } from '../../../domain/entities/event.entity.js';
export declare class EventResponseDto {
    readonly id: number;
    readonly name: string | null;
    readonly addressId: number;
    readonly date: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    constructor(event: Event);
    static fromDomain(event: Event): EventResponseDto;
}
export declare class EventWithUsersResponseDto extends EventResponseDto {
    readonly users: EventUserDto[];
    constructor(event: Event, users: EventUserDto[]);
}
export declare class EventUserDto {
    readonly userId: number;
    readonly name?: string;
    readonly email?: string;
    constructor(props: {
        userId: number;
        name?: string;
        email?: string;
    });
}
