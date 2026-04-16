"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = void 0;
const entity_base_js_1 = require("./entity.base.js");
const guest_status_enum_js_1 = require("../enums/guest-status.enum.js");
class Guest extends entity_base_js_1.BaseEntity {
    name;
    phone;
    status;
    attended;
    eventId;
    email;
    responsibleId;
    isChild;
    constructor(props) {
        super(props);
        this.name = props.name;
        this.phone = props.phone;
        this.status = props.status;
        this.attended = props.attended;
        this.eventId = props.eventId;
        this.email = props.email;
        this.responsibleId = props.responsibleId;
        this.isChild = props.isChild;
    }
    isConfirmed() {
        return this.status === guest_status_enum_js_1.GuestStatus.CONFIRMED;
    }
    isDependent() {
        return this.isChild;
    }
}
exports.Guest = Guest;
//# sourceMappingURL=guest.entity.js.map