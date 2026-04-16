"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    id;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(props) {
        this.id = props.id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt ?? null;
        this.deletedAt = props.deletedAt ?? null;
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=entity.base.js.map