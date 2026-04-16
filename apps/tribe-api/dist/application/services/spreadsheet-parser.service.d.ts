export interface ParsedGuest {
    name: string;
    phone: string;
    email: string;
    isChild: boolean;
    responsibleName?: string;
}
export declare class SpreadsheetParserService {
    parse(buffer: Buffer): ParsedGuest[];
    private parseRow;
    private getStringValue;
    private parseBooleanValue;
}
