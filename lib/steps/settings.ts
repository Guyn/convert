import path from 'path';
import { promises as fs } from 'fs';
import yargs from 'yargs';
import { WAIT } from '../utils';
import * as log from 'cli-block';

const argv = yargs.options({
	title: { type: 'string', default: null },
	src: { type: 'string', default: null },
	dest: { type: 'string', default: null },
	ext: { type: 'string', default: null },
	template: { type: 'string', default: null },
	combine: { type: 'boolean', default: false },
	filename: { type: 'string', default: null },
	output: { type: 'array', default: ['hex'] },
	templatePath: {
		type: 'string',
		default: path.join(__dirname, '../../../templates')
	}
}).argv;

const AVAILABLE_OPTIONS = async (data: any) => {
	const templates = await fs.readdir(data.settings.templatePath).then((res) => {
		return res.map((file) => {
			return path.extname(file.replace('.template', ''));
		});
	});

	return {
		ext: templates
	};
};

const CHECK_SETTINGS_HAS_OUTPUTFILE = async (data: any) => {
	const errors = [];

	const ext = path.extname(path.basename(data.settings.destination));
	const hasOutputfile = ext ? true : false;

	if (hasOutputfile) {
		const options = await AVAILABLE_OPTIONS(data);

		if (!options.ext.includes(ext)) {
			errors.push("woops.. I don't know this extenstion");
		} else {
			data.settings.ext = [ext.replace('.', '')];
		}
	}

	return { ...data, error: errors };
};

const CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE = (data: any) => {
	const errors = [];

	// If the destination doesn't include a file.
	if (data.settings.template && data.settings.ext) {
		errors.push("You can't use a template AND specify an output extension.");
	}
	if (!data.settings.template && !data.settings.ext) {
		errors.push(
			'You have to specify either an output extension or a template.'
		);
	}
	return { ...data, error: errors };
};

const CONVERT_TO_ARRAY_WHERE_NECESSARY = (data: any) => {
	// If only one
	if (typeof data.settings.ext == 'string')
		data.settings.ext = [data.settings.ext];
	if (typeof data.settings.filename == 'string')
		data.settings.filename = [data.settings.filename];
	if (typeof data.settings.template == 'string')
		data.settings.template = [data.settings.template];
	return { ...data };
};

const CHECK_PROCREATE_TITLE = (data) => {
	const errors = [];

	// If the destination doesn't include a file.
	if (
		data.settings.ext &&
		data.settings.ext.includes('procreate') &&
		data.settings.title == null
	) {
		errors.push('Procreate files need a title.');
	}

	return { ...data, error: errors };
};

const GET_SETTINGS = async () => {
	await WAIT();
	const settings = {
		...argv,
		source: argv.src,
		destination: argv.dest,
		ext: argv.type,
		prefix: argv.prefix ? `${argv.prefix}-` : '',
		templatePath: argv.templatePath
			? argv.templatePath
			: path.join(__dirname, '../../templates')
	};
	return { settings };
};
const LOG_SETTINGS = async (data: any) => {
	log.BLOCK_START('Settings');
	log.BLOCK_SETTINGS(data.settings);
	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);
	return data;
};

export const SETTINGS = async () => {
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
