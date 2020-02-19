const log = {};
const path = require("path");
const { red, yellow, bgBlue, blue, green, bold, italic } = require("kleur");
const colors = require("ansi-256-colors");
const {
	asyncForEach,
	spaces,
	repeat,
	centerText,
	stylelizeValue
} = require("./helpers.js");

let totalLength = 100;

let block = {
	line: yellow("━"),
	midLine: yellow("─"),
	side: yellow("┃"),
	topStart: yellow("┏"),
	topEnd: yellow("┓"),
	bottomStart: yellow("┗"),
	bottomEnd: yellow("┛"),
	midStart: yellow("┠"),
	midEnd: yellow("┨")
};

const LOGG = (value) => {
	console.log(value);
};

const START = (data) => {
	LOGG("\n");
	let title = "ICON";
	if (data.settings.template) title = data.settings.type.toUpperCase();
	LOGG(
		`\t${bold("Generating")} ${bgBlue().black(" " + title + " ")} ${bold(
			"components from svg files."
		)}`
	);
	LOGG("\n");
	return data;
};
exports.START = START;

const LINE = (data = null, txt = null) => {
	let msg = "";
	if (txt) msg = txt;
	// LOGG(msg.length, totalLength - msg.length);
	LOGG(
		`${block.side}${spaces(10)}${msg}${spaces(totalLength - 10, msg)}${
			block.side
		}`
	);
	return data;
};
exports.LINE = LINE;

const LINE_SUCCESS = (msg) => {
	let fileName = `${green("✔")} ${msg}`;
	LINE(null, fileName);
};
exports.LINE_SUCCESS = LINE_SUCCESS;

const LINE_ERROR = (msg) => {
	let fileName = `${red("×")} ${msg}`;
	LINE(null, fileName);
};
exports.LINE_ERROR = LINE_ERROR;

const LINE_WARNING = (msg) => {
	let fileName = `${yellow("!")} ${msg}`;
	LINE(null, fileName);
};
exports.LINE_WARNING = LINE_WARNING;

exports.WRITE_FILE = async (msg) => {
	LINE(null, msg);
};

exports.WRITE_FILE_SUCCESS = (msg) => {
	LINE_SUCCESS(msg);
};

exports.WRITE_FILE_ERROR = (msg) => {
	LINE_ERROR(msg);
};

const START_BLOCK = (data = null, txt = null) => {
	if (txt)
		LOGG(
			`${block.topStart}${repeat(30, block.line)}${centerText(
				totalLength - 60,
				txt
			)}${repeat(30, block.line)}${block.topEnd}`
		);
	else
		LOGG(
			`${block.topStart}${repeat(totalLength, block.line)}${block.topRight}`
		);
	LINE();
	return data;
};
exports.START_BLOCK = START_BLOCK;

const MID_BLOCK = (data = null, txt = null) => {
	if (txt)
		LOGG(
			`${block.midStart}${repeat(30, block.midLine)}${centerText(
				totalLength - 60,
				bold(txt)
			)}${repeat(30, `${block.midLine}`)}${block.midEnd}`
		);
	else
		LOGG(
			`${block.midStart}${repeat(totalLength, block.midLine)}${block.midEnd}`
		);
	LINE();
	return data;
};
exports.MID_BLOCK = MID_BLOCK;

const END_BLOCK = (data = null) => {
	LINE();
	LOGG(
		`${block.bottomStart}${repeat(totalLength, `${block.line}`)}${
			block.bottomEnd
		}`
	);
	return data;
};
exports.END_BLOCK = END_BLOCK;

exports.FILES = async (data) => {
	await asyncForEach(data.files, (file) => {
		let fileName = file.name;
		LINE(
			null,
			`${yellow("✒")} ${file.dir ? blue(file.dir + "/") : ""}${bold(
				fileName
			)}${italic().blue(".json")}`
		);
	});
	LINE();
	return data;
};

exports.COLORS = async (data) => {
	data.files.forEach((list) => {
		LINE(null, `${yellow("✒")} ${bold("test")}${italic().blue(".json")}`);
		Object.keys(list.parsed).forEach((value) => {
			LINE(null, `${value}${spaces(20, value)} ${blue(list.parsed[value])}`);
		});
	});
	return data;
};

exports.NO_FILES = (data) => {
	if (data.files.length < 1) data.error.push("No valid source files are found");
	WARNINGS(data);
	ERRORS(data);
	return data;
};

const WARNINGS = (data) => {
	if (!data.warning || data.warning.length < 1) return false;
	LINE();
	MID_BLOCK(null, `${yellow("! Warnings")}`);
	data.warning.forEach((error) => {
		LINE_WARNING(error);
	});
	// LINE();
	// MID_BLOCK(null);
};
const ERRORS = (data) => {
	if (!data.error || data.error.length < 1) return false;
	LINE();
	MID_BLOCK(null, `${red("× Errors")}`);
	data.error.forEach((error) => {
		LINE_ERROR(error);
	});
	END_BLOCK();
	process.exit();
};
exports.ERRORS = ERRORS;

const SETTINGS = async (data) => {
	let lines = [];
	Object.keys(data.settings).forEach((value) => {
		let styledValue = stylelizeValue(data.settings[value]);
		let error;
		switch (value) {
			case "src":
			case "dest":
			case "template":
				if (!data.settings[value]) error = true;
				break;
			default:
				error = false;
				break;
		}

		if (error) styledValue = `${red("×")} ${styledValue}`;
		let settingLine = `${bold(value)}${spaces(20, value)}${styledValue}`;

		lines.push(settingLine);
	});

	lines.forEach((line) => {
		LINE(null, line);
	});

	if (!ERRORS(data)) LINE();

	return data;
};
exports.SETTINGS = SETTINGS;
