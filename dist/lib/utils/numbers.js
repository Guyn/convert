"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPercentage = (n) => {
    return typeof n === 'string' && n.indexOf('%') != -1;
};
exports.bound = (n, max) => {
    n = Math.min(max, Math.max(0, n));
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    return (n % max) / max;
};
exports.between = function (number, min, max, inclusive = false) {
    return inclusive
        ? number >= min && number <= max
        : number > min && number < max;
};
//# sourceMappingURL=numbers.js.map