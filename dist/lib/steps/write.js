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
const utils_1 = require("../utils");
const cli_block_1 = __importDefault(require("cli-block"));
const kleur_1 = require("kleur");
const fs_1 = require("fs");
const path_1 = require("path");
const jszip_1 = __importDefault(require("jszip"));
const WRITE_PROCREATE_FILES = (data, set) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_1.default();
    zip.file('Swatches.json', set.data);
    yield zip
        .generateAsync({ type: 'nodebuffer' })
        .then(function (content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises
                .writeFile(set.path, content)
                .finally(() => data)
                .catch((err) => {
                return Object.assign(Object.assign({}, data), { error: [err] });
            });
            yield fs_1.promises
                .writeFile(path_1.join(utils_1.pathOnly(set.path), 'Swatches.json'), set.data)
                .finally(() => data)
                .catch((err) => {
                return Object.assign(Object.assign({}, data), { error: [err] });
            });
        });
    });
    return data;
});
const WRITE_FILES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.asyncForEach(data.files, (set) => __awaiter(void 0, void 0, void 0, function* () {
        // When it's a procreate file, it needs to be converted Swatches.json and zipped.
        if (set.ext == '.swatches')
            WRITE_PROCREATE_FILES(data, set);
        else {
            yield fs_1.promises
                .writeFile(set.path, set.data)
                .finally(() => data)
                .catch((err) => {
                return Object.assign(Object.assign({}, data), { error: [err] });
            });
        }
    }));
    return data;
});
const LOG_WRITE = (data) => {
    if (data.files.length > 1)
        cli_block_1.default.BLOCK_MID('Writing files');
    else
        cli_block_1.default.BLOCK_MID('Writing file');
    data.files.forEach((file) => {
        cli_block_1.default.BLOCK_LINE_SUCCESS(`${file.name} ${kleur_1.blue().italic(file.path)}`);
    });
    if (data.error)
        cli_block_1.default.BLOCK_ERRORS(data.error);
    if (data.warning)
        cli_block_1.default.BLOCK_WARNINGS(data.warning);
};
exports.WRITE = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return WRITE_FILES(data)
        .then(LOG_WRITE)
        .then((res) => res);
});
//# sourceMappingURL=write.js.map