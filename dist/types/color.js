"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHex = (x) => {
    const re = /#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/g;
    return re.test(x);
};
//# sourceMappingURL=color.js.map