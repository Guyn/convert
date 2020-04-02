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
const color_1 = require("../color");
const utils_1 = require("../utils");
const kleur_1 = require("kleur");
const cli_block_1 = __importDefault(require("cli-block"));
const CONVERT_COLORDATA = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.WAIT();
    let dataSets = [];
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
    return Object.assign(Object.assign({}, data), { dataSets: dataSets });
});
const LOG_CONVERTS = (data) => {
    if (data.source.length > 1)
        cli_block_1.default.BLOCK_MID("Source Files");
    else
        cli_block_1.default.BLOCK_MID("Source File");
    data.dataSets.forEach((file) => {
        cli_block_1.default.BLOCK_LINE(`${kleur_1.yellow().bold(file.name.toUpperCase())}`);
        cli_block_1.default.BLOCK_LINE();
        // LOG.LINE(`${LOG.repeat("-", 100)}`);
        cli_block_1.default.BLOCK_ROW_LINE([
            `${kleur_1.bold("name")}`,
            `${kleur_1.bold("hex")}`,
            `${kleur_1.bold("hsl")}`,
            `${kleur_1.bold("rgb")}`
        ]);
        cli_block_1.default.BLOCK_LINE();
        // console.log(LOG, LOG.spacedText(20, "hoi"));
        file.colors.forEach((color) => {
            cli_block_1.default.BLOCK_ROW_LINE([color.name, color.hex, color.hsl, color.rgb]);
        });
        cli_block_1.default.BLOCK_LINE();
    });
    if (data.error)
        cli_block_1.default.BLOCK_ERRORS(data.error);
    if (data.warning)
        cli_block_1.default.BLOCK_WARNINGS(data.warning);
    return data;
};
const COMBINE_IF_SET = (data) => {
    if (!data.settings.combine)
        return data;
    // const setName = data.dataSets[0].name;
    let combinedSet = data.dataSets[0];
    for (let i = 1; i < data.dataSets.length; i++) {
        combinedSet.colors = [...combinedSet.colors, ...data.dataSets[i].colors];
    }
    return Object.assign(Object.assign({}, data), { dataSets: [combinedSet] });
};
const CONVERT = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return CONVERT_COLORDATA(data)
        .then(COMBINE_IF_SET)
        .then(LOG_CONVERTS)
        .then((res) => res);
});
module.exports = { CONVERT };
//# sourceMappingURL=convert.js.map