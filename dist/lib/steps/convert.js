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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const log = __importStar(require("cli-block"));
const color_1 = require("../color");
const utils_1 = require("../utils");
const CONVERT_COLORDATA = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.WAIT();
    const dataSets = [];
    yield utils_1.asyncForEach(data.source, (file) => __awaiter(void 0, void 0, void 0, function* () {
        const colorData = [];
        yield utils_1.asyncForEach(Object.keys(file.parsed), (color) => {
            const hexColor = file.parsed[color];
            colorData.push({
                name: color,
                hex: hexColor,
                rgb: color_1.hexToRgb(hexColor),
                hsl: color_1.hexToHsl(hexColor)
            });
        });
        dataSets.push({
            name: file.name,
            colors: colorData
        });
    }));
    return Object.assign(Object.assign({}, data), { dataSets });
});
const LOG_CONVERTS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.source.length > 1)
        log.BLOCK_MID('Source Files');
    else
        log.BLOCK_MID('Source File');
    yield utils_1.asyncForEach(data.dataSets, (color) => __awaiter(void 0, void 0, void 0, function* () {
        log.BLOCK_LINE(`${kleur_1.yellow().bold(color.name)}`);
        log.BLOCK_LINE();
        // LOG.LINE(`${LOG.repeat("-", 100)}`);
        log.BLOCK_ROW_LINE([
            `${kleur_1.bold('name')}`,
            `${kleur_1.bold('hex')}`,
            `${kleur_1.bold('hsl')}`,
            `${kleur_1.bold('rgb')}`
        ]);
        log.BLOCK_LINE();
        // console.log(LOG, LOG.spacedText(20, "hoi"));
        yield utils_1.asyncForEach(color.colors, (value) => {
            const rowLine = [value.name, value.hex, value.hsl, value.rgb];
            log.BLOCK_ROW_LINE(rowLine);
        });
        log.BLOCK_LINE();
    }));
    if (data.error)
        log.BLOCK_ERRORS(data.error);
    if (data.warning)
        log.BLOCK_WARNINGS(data.warning);
    return data;
});
const COMBINE_IF_SET = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.settings.combine)
        return data;
    // const setName = data.dataSets[0].name;
    const combinedSet = data.dataSets[0];
    for (let i = 1; i < data.dataSets.length; i++) {
        combinedSet.colors = [...combinedSet.colors, ...data.dataSets[i].colors];
    }
    return Object.assign(Object.assign({}, data), { dataSets: [combinedSet] });
});
exports.CONVERT = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return CONVERT_COLORDATA(data)
        .then(COMBINE_IF_SET)
        .then(LOG_CONVERTS)
        .then((res) => res);
});
//# sourceMappingURL=convert.js.map