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
exports.UploadFileHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const upload_file_command_1 = require("../upload-file.command");
const files_service_1 = require("../../files.service");
let UploadFileHandler = class UploadFileHandler {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async execute(command) {
        const { senderId, recipientIds, fileName } = command;
        return this.filesService.uploadFile(senderId, recipientIds, fileName);
    }
};
exports.UploadFileHandler = UploadFileHandler;
exports.UploadFileHandler = UploadFileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(upload_file_command_1.UploadFileCommand),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], UploadFileHandler);
//# sourceMappingURL=upload-file.handler.js.map