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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const log = __importStar(require("cli-block"));
const utils_1 = require("../utils");
const GET_SOURCE_FILES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.settings.src)
        return Object.assign({}, data);
    let srcFiles = [];
    const files = [];
    const source = data.settings.src;
    // Check whether source is a file or a folder.
    const isDir = path_1.default.extname(path_1.default.basename(source)) ? false : true;
    if (isDir)
        srcFiles = yield fs_1.promises.readdir(source).then((result) => result.map((file) => {
            return path_1.default.join(source, file);
        }));
    else
        srcFiles = [source];
    yield utils_1.asyncForEach(srcFiles, (file) => __awaiter(void 0, void 0, void 0, function* () {
        const fileData = yield fs_1.promises.readFile(file).then((res) => res.toString());
        files.push({
            name: path_1.default.basename(file).replace(path_1.default.extname(file), ''),
            file: path_1.default.basename(file),
            type: path_1.default.extname(path_1.default.basename(file)),
            path: source,
            data: fileData,
            parsed: JSON.parse(fileData)
        });
    }));
    return Object.assign(Object.assign({}, data), { source: files });
});
const FILTER_FILES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, data), { source: data.source.filter((file) => file.type === '.json') });
});
const LOG_SOURCE_FILES = (data) => {
    if (data.error)
        log.BLOCK_ERRORS(data.error);
    if (data.warning)
        log.BLOCK_WARNINGS(data.warning);
    return data;
};
exports.SOURCE = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return GET_SOURCE_FILES(data)
        .then(FILTER_FILES)
        .then(LOG_SOURCE_FILES)
        .then((res) => res);
});
//# sourceMappingURL=source.js.map