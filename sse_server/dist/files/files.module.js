"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const common_module_1 = require("../common/common.module");
const upload_file_handler_1 = require("./commands/handlers/upload-file.handler");
const get_files_handler_1 = require("./queries/handlers/get-files.handler");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule, cqrs_1.CqrsModule],
        controllers: [files_controller_1.FilesController],
        providers: [files_service_1.FilesService, upload_file_handler_1.UploadFileHandler, get_files_handler_1.GetFilesHandler],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map