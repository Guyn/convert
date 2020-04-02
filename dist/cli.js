#!/usr/bin/env node
"use strict";
const steps = require("./lib/steps");
steps
    .START()
    .then(steps.SETTINGS)
    .then(steps.SOURCE)
    .then(steps.FOLDERS)
    .then(steps.CONVERT)
    .then(steps.TEMPLATES)
    .then(steps.BUILD)
    .then(steps.WRITE)
    .then(
// console.log(res);
steps.FINISH);
//# sourceMappingURL=cli.js.map