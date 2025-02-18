"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const sse_service_1 = require("../common/sse.service");
let FilesService = class FilesService {
    constructor(sseService) {
        this.sseService = sseService;
    }
    uploadFile(senderId, recipientIds, fileName) {
        const recipients = recipientIds.split(',').map(id => id.trim()).filter(id => id !== senderId.toString());
        const validRecipients = [];
        const invalidRecipients = [];
        recipients.forEach(userId => {
            if (this.sseService['clients'][+userId]) {
                validRecipients.push(+userId);
            }
            else {
                invalidRecipients.push(+userId);
            }
        });
        let senderMessage;
        if (validRecipients.length > 0 && invalidRecipients.length === 0) {
            senderMessage = `File ${fileName} has been sent to ${validRecipients.join(', ')}`;
        }
        else if (validRecipients.length === 0 && invalidRecipients.length > 0) {
            senderMessage = `No user with ID ${invalidRecipients.join(', ')}`;
        }
        else if (validRecipients.length > 0 && invalidRecipients.length > 0) {
            senderMessage = `${fileName} sent to ${validRecipients.join(', ')}, but no user with ID ${invalidRecipients.join(', ')}`;
        }
        else {
            senderMessage = `Cannot send file to yourself`;
        }
        validRecipients.forEach(userId => {
            this.sseService.sendMessage(userId, `User ${senderId} uploaded: ${fileName}`);
        });
        this.sseService.sendMessage(senderId, senderMessage);
        return { success: true, message: senderMessage };
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sse_service_1.SseService])
], FilesService);
//# sourceMappingURL=files.service.js.map