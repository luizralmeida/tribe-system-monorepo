"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadsheetParserService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = __importStar(require("xlsx"));
let SpreadsheetParserService = class SpreadsheetParserService {
    parse(buffer) {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
            throw new common_1.BadRequestException('Spreadsheet has no sheets');
        }
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);
        if (rows.length === 0) {
            throw new common_1.BadRequestException('Spreadsheet is empty');
        }
        return rows.map((row, index) => this.parseRow(row, index));
    }
    parseRow(row, index) {
        const name = this.getStringValue(row, ['name', 'nome', 'Name', 'Nome']);
        if (!name) {
            throw new common_1.BadRequestException(`Row ${index + 2}: name is required`);
        }
        const phone = this.getStringValue(row, ['phone', 'telefone', 'Phone', 'Telefone']) ?? '';
        const email = this.getStringValue(row, ['email', 'Email', 'e-mail', 'E-mail']) ?? '';
        const isChildRaw = this.getStringValue(row, ['isChild', 'is_child', 'dependente', 'Dependente', 'criança']);
        const isChild = this.parseBooleanValue(isChildRaw);
        const responsibleName = this.getStringValue(row, ['responsibleName', 'responsible', 'responsavel', 'Responsável', 'Responsavel']);
        return { name, phone, email, isChild, responsibleName };
    }
    getStringValue(row, keys) {
        for (const key of keys) {
            const value = row[key];
            if (value !== undefined && value !== null) {
                return String(value).trim();
            }
        }
        return undefined;
    }
    parseBooleanValue(value) {
        if (!value)
            return false;
        const normalized = value.toLowerCase().trim();
        return ['true', 'sim', 'yes', '1', 's'].includes(normalized);
    }
};
exports.SpreadsheetParserService = SpreadsheetParserService;
exports.SpreadsheetParserService = SpreadsheetParserService = __decorate([
    (0, common_1.Injectable)()
], SpreadsheetParserService);
//# sourceMappingURL=spreadsheet-parser.service.js.map