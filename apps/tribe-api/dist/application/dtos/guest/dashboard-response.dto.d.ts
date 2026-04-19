export declare class DashboardResponseDto {
    readonly total: number;
    readonly confirmed: number;
    readonly notConfirmed: number;
    readonly attended: number;
    readonly nonPayingChildrenCount: number;
    constructor(props: {
        total: number;
        confirmed: number;
        notConfirmed: number;
        attended: number;
        nonPayingChildrenCount: number;
    });
}
