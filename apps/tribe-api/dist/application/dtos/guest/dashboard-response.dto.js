"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardResponseDto = void 0;
class DashboardResponseDto {
    total;
    confirmed;
    notConfirmed;
    attended;
    nonPayingChildrenCount;
    constructor(props) {
        this.total = props.total;
        this.confirmed = props.confirmed;
        this.notConfirmed = props.notConfirmed;
        this.attended = props.attended;
        this.nonPayingChildrenCount = props.nonPayingChildrenCount;
    }
}
exports.DashboardResponseDto = DashboardResponseDto;
//# sourceMappingURL=dashboard-response.dto.js.map