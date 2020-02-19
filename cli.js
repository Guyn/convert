#!/usr/bin/env node
"use strict";

const { start } = require("./lib/settings");
const { settings, colors, log, files, write, templates } = require("./lib");

start()
	.then(settings.CHECK_SETTINGS)
	.then(log.START)
	.then((res) => log.START_BLOCK(res, "Settings"))
	.then(log.SETTINGS)
	.then(files.CHECK_SOURCE)
	.then(files.GET_SOURCE)
	.then(files.CHECK_FILES)
	.then(files.FILTER_FILES)
	.then(log.NO_FILES)
	.then((res) => log.MID_BLOCK(res, "Color Source files"))
	.then(log.COLORS)
	.then(templates.GET_EXT_TEMPLATES)
	.then(templates.GET_INT_TEMPLATE)
	.then(templates.GET_TEMPLATE_DATA)
	.then(colors.CREATE_DATASETS)
	.then((res) => log.MID_BLOCK(res, "Build Files"))
	.then(write.BUILD_FILES)
	.then(write.CREATE_DEST)
	.then(write.WRITE_FILES)
	.then(log.END_BLOCK)
	.then((res) => {
		// console.log(res);
		// console.log(res.dataSets[0].colors[0]);
		// return res;
	});
