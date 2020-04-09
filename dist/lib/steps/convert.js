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
    data.source.forEach((file) => {
        const colorData = [];
        Object.keys(file.parsed).forEach((color) => {
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
    });
    return Object.assign(Object.assign({}, data), { dataSets });
});
const LOG_CONVERTS = (data) => {
    if (data.source.length > 1)
        log.BLOCK_MID('Source Files');
    else
        log.BLOCK_MID('Source File');
    data.dataSets.forEach((file) => {
        log.BLOCK_LINE(`${kleur_1.yellow().bold(file.name.toUpperCase())}`);
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
        file.colors.forEach((color) => {
            log.BLOCK_ROW_LINE([color.name, color.hex, color.hsl, color.rgb]);
        });
        log.BLOCK_LINE();
    });
    if (data.error)
        log.BLOCK_ERRORS(data.error);
    if (data.warning)
        log.BLOCK_WARNINGS(data.warning);
    return data;
};
const COMBINE_IF_SET = (data) => {
    if (!data.settings.combine)
        return data;
    // const setName = data.dataSets[0].name;
    const combinedSet = data.dataSets[0];
    for (let i = 1; i < data.dataSets.length; i++) {
        combinedSet.colors = [...combinedSet.colors, ...data.dataSets[i].colors];
    }
    return Object.assign(Object.assign({}, data), { dataSets: [combinedSet] });
};
exports.CONVERT = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return CONVERT_COLORDATA(data)
        .then(COMBINE_IF_SET)
        .then(LOG_CONVERTS)
        .then((res) => res);
});
//# sourceMappingURL=convert.js.map