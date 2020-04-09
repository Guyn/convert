"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cli_block_1 = __importDefault(require("cli-block"));
const GET_EXT_TEMPLATES = (data) => {
    // If its internal or an external directory, just go on.
    if (!data.settings.template)
        return data;
    let templates = [];
    let templateFiles = typeof data.settings.template == 'string'
        ? [data.settings.template]
        : data.settings.template;
    templateFiles.forEach((file) => {
        templates.push({
            name: path_1.default.basename(file),
            file: file,
            path: file
        });
    });
    return Object.assign(Object.assign({}, data), { templates: templates });
};
const GET_INT_TEMPLATES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // If it's external, just continue.
    if (data.settings.template)
        return data;
    // Process Internal templates
    let types = data.settings.ext;
    return Object.assign(Object.assign({}, data), { templates: yield fs_1.promises
            .readdir(path_1.default.join(__dirname, '../../../templates'))
            .then((result) => {
            return result
                .filter((template) => {
                // Filter out any value which is not the template.
                return types.includes(path_1.default.extname(template).replace('.', ''));
            })
                .map((file) => {
                return {
                    name: path_1.default.basename(file),
                    file: file,
                    path: path_1.default.join(__dirname, '../../../templates', file)
                };
            });
        }) });
});
const GET_TEMPLATE_DATA = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return Promise.all(data.templates.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, file), { data: yield fs_1.promises.readFile(file.path).then((result) => {
                    return result.toString();
                }) });
        }))).then((result) => {
            // console.log(result);
            return Object.assign(Object.assign({}, data), { templates: result });
        });
    }
    catch (err) {
        console.log(err);
    }
});
const GET_TEMPLATE_FILES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return data;
});
const LOG_TEMPLATE_FILES = (data) => {
    if (data.templates.length > 1)
        cli_block_1.default.BLOCK_MID('Template files');
    else
        cli_block_1.default.BLOCK_MID('Template file');
    data.templates.forEach((file) => {
        cli_block_1.default.BLOCK_LINE(file.name);
    });
    cli_block_1.default.BLOCK_LINE();
    if (data.error)
        cli_block_1.default.BLOCK_ERRORS(data.error);
    if (data.warning)
        cli_block_1.default.BLOCK_WARNINGS(data.warning);
    return data;
};
exports.TEMPLATES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return GET_TEMPLATE_FILES(data)
        .then(GET_EXT_TEMPLATES)
        .then(GET_INT_TEMPLATES)
        .then(GET_TEMPLATE_DATA)
        .then(LOG_TEMPLATE_FILES)
        .then((res) => {
        // console.log(res);
        return res;
    });
});
//# sourceMappingURL=templates.js.map