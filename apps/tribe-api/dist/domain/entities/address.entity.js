"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const entity_base_js_1 = require("./entity.base.js");
class Address extends entity_base_js_1.BaseEntity {
    name;
    street;
    neighborhood;
    number;
    complement;
    city;
    state;
    country;
    constructor(props) {
        super({ ...props, deletedAt: null });
        this.name = props.name;
        this.street = props.street;
        this.neighborhood = props.neighborhood;
        this.number = props.number;
        this.complement = props.complement;
        this.city = props.city;
        this.state = props.state;
        this.country = props.country;
    }
}
exports.Address = Address;
//# sourceMappingURL=address.entity.js.map