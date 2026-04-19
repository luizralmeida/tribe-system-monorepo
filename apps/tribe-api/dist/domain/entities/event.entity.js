"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const entity_base_js_1 = require("./entity.base.js");
class Event extends entity_base_js_1.BaseEntity {
    name;
    addressId;
    date;
    address;
    constructor(props) {
        super(props);
        this.name = props.name;
        this.addressId = props.addressId;
        this.date = props.date;
        this.address = props.address;
    }
}
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map