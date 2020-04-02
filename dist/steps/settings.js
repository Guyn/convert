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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("../utils");
const cli_block_1 = __importDefault(require("cli-block"));
const argv = yargs_1.default.options({
    title: { type: "string", default: null },
    src: { type: "string", default: null },
    dest: { type: "string", default: null },
    ext: { type: "string", default: null },
    template: { type: "string", default: null },
    combine: { type: "boolean", default: false },
    filename: { type: "string", default: null },
    output: { type: "array", default: ["hex"] },
    templatePath: {
        type: "string",
        default: path_1.default.join(__dirname, "../../templates")
    }
}).argv;
const AVAILABLE_OPTIONS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const templates = yield fs_1.promises.readdir(data.settings.templatePath).then((res) => {
        return res.map((file) => {
            return path_1.default.extname(file.replace(".template", ""));
        });
    });
    return {
        ext: templates
    };
});
const CHECK_SETTINGS_HAS_OUTPUTFILE = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    let ext = path_1.default.extname(path_1.default.basename(data.settings.destination));
    let hasOutputfile = ext ? true : false;
    if (hasOutputfile) {
        let options = yield AVAILABLE_OPTIONS(data);
        if (!options.ext.includes(ext)) {
            errors.push("woops.. I don't know this extenstion");
        }
        else {
            data.settings.ext = [ext.replace(".", "")];
        }
    }
    return Object.assign(Object.assign({}, data), { error: errors });
});
const CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE = (data) => {
    const errors = [];
    // If the destination doesn't include a file.
    if (data.settings.template && data.settings.ext) {
        errors.push("You can't use a template AND specify an output extension.");
    }
    if (!data.settings.template && !data.settings.ext) {
        errors.push("You have to specify either an output extension or a template.");
    }
    return Object.assign(Object.assign({}, data), { error: errors });
};
const CONVERT_TO_ARRAY_WHERE_NECESSARY = (data) => {
    // If only one
    if (typeof data.settings.ext == "string")
        data.settings.ext = [data.settings.ext];
    if (typeof data.settings.filename == "string")
        data.settings.filename = [data.settings.filename];
    if (typeof data.settings.template == "string")
        data.settings.template = [data.settings.template];
    return Object.assign({}, data);
};
const CHECK_PROCREATE_TITLE = (data) => {
    const errors = [];
    // If the destination doesn't include a file.
    if (data.settings.ext &&
        data.settings.ext.includes("procreate") &&
        data.settings.title == null) {
        errors.push("Procreate files need a title.");
    }
    return Object.assign(Object.assign({}, data), { error: errors });
};
const GET_SETTINGS = () => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.WAIT();
    const settings = Object.assign(Object.assign({}, argv), { destination: argv.dest ? argv.dest : null, ext: argv.type ? argv.type : null, prefix: argv.prefix ? `${argv.prefix}-` : "", combine: argv.combine ? true : false, output: argv.output ? argv.output : ["hex"], templatePath: argv.templatePath
            ? argv.templatePath
            : path_1.default.join(__dirname, "../../templates") });
    return { settings };
});
const LOG_SETTINGS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    cli_block_1.default.BLOCK_START("Settings");
    cli_block_1.default.BLOCK_SETTINGS(data.settings);
    if (data.error)
        cli_block_1.default.BLOCK_ERRORS(data.error);
    if (data.warning)
        cli_block_1.default.BLOCK_WARNINGS(data.warning);
    return data;
});
exports.SETTINGS = () => __awaiter(void 0, void 0, void 0, function* () {
    return GET_SETTINGS()
        .then(CHECK_SETTINGS_HAS_OUTPUTFILE)
        .then(CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE)
        .then(CONVERT_TO_ARRAY_WHERE_NECESSARY)
        .then(CHECK_PROCREATE_TITLE)
        .then(LOG_SETTINGS)
        .then((res) => {
        return res;
    });
});
//# sourceMappingURL=settings.js.map