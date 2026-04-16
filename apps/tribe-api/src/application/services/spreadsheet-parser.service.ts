import { Injectable, BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { GuestStatus } from '../../domain/enums/guest-status.enum.js';

export interface ParsedGuest {
  name: string;
  phone: string;
  email: string;
  isChild: boolean;
  responsibleName?: string;
}

@Injectable()
export class SpreadsheetParserService {
  parse(buffer: Buffer): ParsedGuest[] {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new BadRequestException('Spreadsheet has no sheets');
    }

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet!);

    if (rows.length === 0) {
      throw new BadRequestException('Spreadsheet is empty');
    }

    return rows.map((row, index) => this.parseRow(row, index));
  }

  private parseRow(
    row: Record<string, unknown>,
    index: number,
  ): ParsedGuest {
    const name = this.getStringValue(row, ['name', 'nome', 'Name', 'Nome']);
    if (!name) {
      throw new BadRequestException(`Row ${index + 2}: name is required`);
    }

    const phone = this.getStringValue(row, ['phone', 'telefone', 'Phone', 'Telefone']) ?? '';
    const email = this.getStringValue(row, ['email', 'Email', 'e-mail', 'E-mail']) ?? '';

    const isChildRaw = this.getStringValue(row, ['isChild', 'is_child', 'dependente', 'Dependente', 'criança']);
    const isChild = this.parseBooleanValue(isChildRaw);

    const responsibleName = this.getStringValue(
      row,
      ['responsibleName', 'responsible', 'responsavel', 'Responsável', 'Responsavel'],
    );

    return { name, phone, email, isChild, responsibleName };
  }

  private getStringValue(
    row: Record<string, unknown>,
    keys: string[],
  ): string | undefined {
    for (const key of keys) {
      const value = row[key];
      if (value !== undefined && value !== null) {
        return String(value).trim();
      }
    }
    return undefined;
  }

  private parseBooleanValue(value: string | undefined): boolean {
    if (!value) return false;
    const normalized = value.toLowerCase().trim();
    return ['true', 'sim', 'yes', '1', 's'].includes(normalized);
  }
}
