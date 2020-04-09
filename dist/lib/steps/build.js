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
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const log = __importStar(require("cli-block"));
const utils_1 = require("../utils");
const BUILD_CHECK_FILENAMES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.WAIT();
    const error = [];
    if (!data.settings.filename)
        return data;
    if (data.settings.filename.length < 2) {
        const filenames = [];
        if (data.dataSets.length > 1) {
            let i = 0;
            data.dataSets.forEach((set) => {
                i++;
                filenames.push(`${data.settings.filename}-${i}`);
            });
            data.settings.filename = filenames;
        }
    }
    else if (data.settings.filename.length !== data.dataSets.length) {
        if (data.settings.filename.length > data.dataSets.length) {
            error.push('You have more filenames, than source files');
        }
        else {
            error.push('You have more sourcefiles, than filenames');
        }
    }
    return Object.assign(Object.assign({}, data), { error });
});
const BUILD_LOG_ERRORS = (data) => {
    if (data.error)
        log.BLOCK_ERRORS(data.error);
    if (data.warning)
        log.BLOCK_WARNINGS(data.warning);
    return data;
};
const BUILD_FILES = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const files = [];
    yield utils_1.asyncForEach(data.templates, (template) => __awaiter(void 0, void 0, void 0, function* () {
        let i = 0;
        yield utils_1.asyncForEach(data.dataSets, (set) => {
            const settingDestination = data.settings.destination;
            let fileName;
            let dirPath;
            if (utils_1.isDir(settingDestination)) {
                dirPath = settingDestination;
                fileName = set.name + utils_1.getExt(template.name);
            }
            else {
                dirPath = settingDestination.replace(path_1.default.basename(settingDestination), '');
                fileName = path_1.default.basename(settingDestination);
            }
            // Get the extension
            const extension = utils_1.getExt(fileName);
            // When there are filenames defined by settings
            if (data.settings.filename) {
                fileName = data.settings.filename[i] + extension;
            }
            // fileName = fileName.replace(".template", "");
            const filePath = path_1.default.join(dirPath, fileName);
            files.push({
                name: fileName,
                ext: extension,
                data: ejs_1.default.render(template.data, {
                    settings: data.settings,
                    colors: set.colors,
                    _: Object.assign({}, utils_1.helpers)
                }),
                path: filePath
            });
            i++;
        });
    }));
    return Object.assign(Object.assign({}, data), { files });
});
exports.BUILD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return BUILD_CHECK_FILENAMES(data)
        .then(BUILD_LOG_ERRORS)
        .then(BUILD_FILES)
        .then((res) => res);
});
//# sourceMappingURL=build.js.map