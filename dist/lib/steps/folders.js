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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("../utils");
exports.FOLDERS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const destDir = utils_1.pathOnly(data.settings.destination);
    try {
        yield fs_1.promises.lstat(destDir);
    }
    catch (err) {
        yield fs_1.promises.mkdir(destDir, {
            recursive: true
        });
    }
    return data;
});
//# sourceMappingURL=folders.js.map