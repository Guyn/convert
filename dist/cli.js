#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
console.log(lib_1.START);
lib_1.START()
    .then((res) => {
    console.log('step 1 -  Settings: ');
    return res;
})
    .then(lib_1.SETTINGS)
    .then((res) => {
    console.log('step 2 -  Source: ');
    return res;
})
    .then(lib_1.SOURCE)
    .then((res) => {
    console.log('step 3 -  Folders: ');
    return res;
})
    .then(lib_1.FOLDERS)
    .then((res) => {
    console.log('step 4 -  Convert: ');
    return res;
})
    .then(lib_1.CONVERT)
    .then((res) => {
    console.log('step 5 -  Templates: ');
    return res;
})
    .then(lib_1.TEMPLATES)
    .then((res) => {
    console.log('step 6 -  Build: ');
    return res;
})
    .then(lib_1.BUILD)
    .then((res) => {
    console.log('step 7 -  Write: ');
    return res;
})
    .then(lib_1.WRITE)
    .then((res) => {
    console.log('step 8 -  Finish: ');
    return res;
})
    .then(lib_1.FINISH);
//# sourceMappingURL=cli.js.map