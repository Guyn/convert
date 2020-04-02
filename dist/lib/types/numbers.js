"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFullCircleType = (x) => {
    return x >= 0 && x <= 360;
};
const isEightBitype = (x) => {
    return x >= 0 && x <= 255;
};
const isPercentageScaleType = (x) => {
    return x >= 0 && x <= 100;
};
const isUnitIntervalType = (x) => {
    return x >= 0 && x <= 1;
};
const isBinary = (x) => {
    return x == 0 || x === 1;
};
//# sourceMappingURL=numbers.js.map