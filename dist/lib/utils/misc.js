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
const path_1 = __importDefault(require("path"));
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.WAIT = (timer = 0) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, timer);
    });
});
exports.pathOnly = (str) => {
    let destDir = str;
    const destArray = str.split('/');
    if (destArray[destArray.length - 1].includes('.')) {
        destArray.pop();
        destDir = destArray.join('/');
    }
    return destDir;
};
exports.isDir = (dir) => {
    return path_1.default.extname(path_1.default.basename(dir)) ? false : true;
};
exports.getExt = (file) => {
    return path_1.default.extname(file.replace('.template', ''));
};
//# sourceMappingURL=misc.js.map