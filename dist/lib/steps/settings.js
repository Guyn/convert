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
const fs_1 = require("fs");
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("../utils");
const log = __importStar(require("cli-block"));
const argv = yargs_1.default.options({
    title: { type: 'string', default: null },
    src: { type: 'string', default: null },
    dest: { type: 'string', default: null },
    ext: { type: 'array', default: [] },
    template: { type: 'string', default: null },
    combine: { type: 'boolean', default: false },
    filename: { type: 'string', default: null },
    output: { type: 'array', default: ['hex'] },
    templatePath: {
        type: 'string',
        default: path_1.default.join(__dirname, '../../../templates')
    }
}).argv;
const AVAILABLE_OPTIONS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const templates = yield fs_1.promises.readdir(data.settings.templatePath);
    templates.map((file) => {
        return path_1.default.extname(file.replace('.template', ''));
    });
    return {
        ext: templates
    };
});
const CHECK_SETTINGS_HAS_OUTPUTFILE = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const ext = path_1.default.extname(path_1.default.basename(data.settings.dest));
    const hasOutputfile = ext ? true : false;
    if (hasOutputfile) {
        const options = yield AVAILABLE_OPTIONS(data);
        if (!options.ext.includes(ext)) {
            errors.push("woops.. I don't know this extenstion");
        }
        else {
            data.settings.ext = [ext.replace('.', '')];
        }
    }
    return Object.assign(Object.assign({}, data), { error: errors });
});
const CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    // If the destination doesn't include a file.
    if (data.settings.template && data.settings.ext) {
        errors.push("You can't use a template AND specify an output extension.");
    }
    if (!data.settings.template && !data.settings.ext) {
        errors.push('You have to specify either an output extension or a template.');
    }
    return Object.assign(Object.assign({}, data), { error: errors });
});
const CHECK_PROCREATE_TITLE = (data) => {
    const errors = [];
    // If the destination doesn't include a file.
    if (data.settings.ext &&
        data.settings.ext.includes('procreate') &&
        data.settings.title == null) {
        errors.push('Procreate files need a title.');
    }
    return Object.assign(Object.assign({}, data), { error: errors });
};
const GET_SETTINGS = () => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.WAIT(0); // Needs an await to make it usuable as steps.
    const settings = yargs_1.default.options({
        src: {
            require: true,
            type: 'string',
            default: null,
            alias: 'source'
        },
        dest: {
            require: true,
            type: 'string',
            default: null,
            alias: 'destination'
        },
        type: {
            required: false,
            type: 'array',
            alias: 'ext'
        },
        prefix: {
            required: false,
            type: 'string',
            alias: 'prefix'
        },
        templatePath: {
            required: false,
            type: 'string',
            default: path_1.default.join(__dirname, '../../../templates')
        },
        template: {
            required: false,
            type: 'string',
            default: null
        },
        combine: {
            required: false,
            type: 'boolean',
            default: false
        },
        filename: {
            required: false,
            type: 'string',
            default: null
        },
        title: {
            required: false,
            type: 'string',
            default: null
        }
    }).argv;
    return {
        settings: {
            src: settings.src,
            dest: settings.dest,
            ext: settings.type,
            prefix: settings.prefix,
            templatePath: settings.templatePath,
            template: settings.template,
            filename: settings.filename,
            combine: settings.combine,
            title: settings.title
        },
        source: [],
        error: [],
        warning: []
    };
});
const LOG_SETTINGS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    log.BLOCK_START('Settings');
    log.BLOCK_SETTINGS(data.settings);
    if (data.error)
        log.BLOCK_ERRORS(data.error);
    if (data.warning)
        log.BLOCK_WARNINGS(data.warning);
    return data;
});
exports.SETTINGS = () => __awaiter(void 0, void 0, void 0, function* () {
    return GET_SETTINGS()
        .then(CHECK_SETTINGS_HAS_OUTPUTFILE)
        .then(CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE)
        .then(CHECK_PROCREATE_TITLE)
        .then(LOG_SETTINGS)
        .then((res) => {
        return res;
    });
});
//# sourceMappingURL=settings.js.map