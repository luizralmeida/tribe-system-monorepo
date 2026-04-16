export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
}
export declare class PaginatedResponseDto<T> {
    readonly data: T[];
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    constructor(props: {
        data: T[];
        total: number;
        page: number;
        limit: number;
    });
}
