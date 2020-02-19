#!/usr/bin/env node

const { start } = require("./lib/settings");
const settings = require("./lib/settings");
const colors = require("./lib/colors");
const log = require("./lib/log.js");
const files = require("./lib/files.js");

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
	.then(colors.CREATE_DATASETS)
	.then((res) => {
		// console.log(res);
	})
	.then(log.END_BLOCK);
