"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
class UserEvent {
    userId;
    eventId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(props) {
        this.userId = props.userId;
        this.eventId = props.eventId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt ?? null;
        this.deletedAt = props.deletedAt ?? null;
    }
}
exports.UserEvent = UserEvent;
//# sourceMappingURL=user-event.entity.js.map