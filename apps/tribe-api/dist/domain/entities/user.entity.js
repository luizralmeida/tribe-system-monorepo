"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_base_js_1 = require("./entity.base.js");
const user_role_enum_js_1 = require("../enums/user-role.enum.js");
class User extends entity_base_js_1.BaseEntity {
    name;
    password;
    phone;
    email;
    role;
    active;
    constructor(props) {
        super(props);
        this.name = props.name;
        this.password = props.password;
        this.phone = props.phone;
        this.email = props.email;
        this.role = props.role;
        this.active = props.active;
    }
    isSuper() {
        return this.role === user_role_enum_js_1.UserRole.SUPER;
    }
    canEdit() {
        return this.role === user_role_enum_js_1.UserRole.SUPER || this.role === user_role_enum_js_1.UserRole.EDIT;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map