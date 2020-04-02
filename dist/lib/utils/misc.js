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
const path = require("path");
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.WAIT = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 0);
    });
});
exports.pathOnly = (string) => {
    let destDir = string;
    const destArray = string.split("/");
    if (destArray[destArray.length - 1].includes(".")) {
        destArray.pop();
        destDir = destArray.join("/");
    }
    return destDir;
};
exports.isDir = (dir) => {
    return path.extname(path.basename(dir)) ? false : true;
};
exports.getExt = (file) => {
    return path.extname(file.replace(".template", ""));
};
//# sourceMappingURL=misc.js.map