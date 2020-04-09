#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
console.log(lib_1.START);
lib_1.START()
    .then(lib_1.SETTINGS)
    .then(lib_1.SOURCE)
    .then(lib_1.FOLDERS)
    .then(lib_1.CONVERT)
    .then(lib_1.TEMPLATES)
    .then(lib_1.BUILD)
    .then(lib_1.WRITE)
    .then(lib_1.FINISH);
//# sourceMappingURL=cli.js.map