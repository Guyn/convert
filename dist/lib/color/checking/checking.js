"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { between } = require('../../utils');
const { hexType, rgbType, hslType } = require('../../types');
exports.isHex = (hex) => {
    return /^#[0-9A-F]{6}$/i.test(hex);
};
exports.isHsl = (hsl) => {
    if (Object.keys(hsl).length == 3 &&
        between(hsl.h, 0, 360, true) &&
        between(hsl.s, 0, 100, true) &&
        between(hsl.l, 0, 100, true)) {
        return true;
    }
    return false;
};
exports.isHsla = (hsla) => {
    if (Object.keys(hsla).length == 4 &&
        between(hsla.h, 0, 360, true) &&
        between(hsla.s, 0, 100, true) &&
        between(hsla.l, 0, 100, true) &&
        between(hsla.a, 0, 1, true)) {
        return true;
    }
    return false;
};
exports.isRgb = (rgb) => {
    if (Object.keys(rgb).length == 3 &&
        between(rgb.r, 0, 255, true) &&
        between(rgb.g, 0, 255, true) &&
        between(rgb.b, 0, 255, true)) {
        return true;
    }
    return false;
};
exports.isRgba = (rgba) => {
    if (Object.keys(rgba).length == 4 &&
        between(rgba.r, 0, 255, true) &&
        between(rgba.g, 0, 255, true) &&
        between(rgba.b, 0, 255, true) &&
        between(rgba.a, 0, 1, true)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=checking.js.map