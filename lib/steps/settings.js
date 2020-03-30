const path = require("path");
const fs = require("fs").promises;
const argv = require("yargs").argv;
const { WAIT } = require("../utils");
const log = require("cli-block");

const AVAILABLE_OPTIONS = async (data) => {
	const templates = await fs.readdir(data.settings.templatePath).then((res) => {
		return res.map((file) => {
			return path.extname(file.replace(".template", ""));
		});
	});

	return {
		ext: templates
	};
};

const CHECK_SETTINGS_HAS_OUTPUTFILE = async (data) => {
	const errors = [];

	let ext = path.extname(path.basename(data.settings.destination));
	let hasOutputfile = ext ? true : false;

	if (hasOutputfile) {
		let options = await AVAILABLE_OPTIONS(data);

		if (!options.ext.includes(ext)) {
			errors.push("woops.. I don't know this extenstion");
		} else {
			data.settings.ext = [ext.replace(".", "")];
		}
	}

	return { ...data, error: errors };
};

const CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE = (data) => {
	const errors = [];

	// If the destination doesn't include a file.
	if (data.settings.template && data.settings.ext) {
		errors.push("You can't use a template AND specify an output extension.");
	}
	if (!data.settings.template && !data.settings.ext) {
		errors.push(
			"You have to specify either an output extension or a template."
		);
	}
	return { ...data, error: errors };
};

const CONVERT_TO_ARRAY_WHERE_NECESSARY = (data) => {
	// If only one
	if (typeof data.settings.ext == "string")
		data.settings.ext = [data.settings.ext];
	if (typeof data.settings.filename == "string")
		data.settings.filename = [data.settings.filename];
	if (typeof data.settings.template == "string")
		data.settings.template = [data.settings.template];
	return { ...data };
};

const CHECK_PROCREATE_TITLE = (data) => {
	const errors = [];

	// If the destination doesn't include a file.
	if (
		data.settings.ext &&
		data.settings.ext.includes("procreate") &&
		data.settings.title == null
	) {
		errors.push("Procreate files need a title.");
	}

	return { ...data, error: errors };
};

const GET_SETTINGS = async () => {
	await WAIT();
	const settings = {
		title: argv.title ? argv.title : null,
		source: argv.src ? argv.src : null,
		destination: argv.dest ? argv.dest : null,
		ext: argv.type ? argv.type : null,
		template: argv.template ? argv.template : null,
		prefix: argv.prefix ? `${argv.prefix}-` : "",
		combine: argv.combine ? true : false,
		filename: argv.filename ? argv.filename : null,
		output: argv.output ? argv.output : ["hex"],
		templatePath: argv.templatePath
			? argv.templatePath
			: path.join(__dirname, "../../templates")
		// hsl: argv.hsl ? true : false,
		// rgb: argv.rgb ? true : false
	};
	return { settings };
};
const LOG_SETTINGS = async (data) => {
	log.BLOCK_START("Settings");
	log.BLOCK_SETTINGS(data.settings);
	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);
	return data;
};

const SETTINGS = async () => {
	return GET_SETTINGS()
		.then(CHECK_SETTINGS_HAS_OUTPUTFILE)
		.then(CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE)
		.then(CONVERT_TO_ARRAY_WHERE_NECESSARY)
		.then(CHECK_PROCREATE_TITLE)
		.then(LOG_SETTINGS)
		.then((res) => {
			return res;
		});
};
module.exports = { SETTINGS };
