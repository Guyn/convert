import path from 'path';
import { promises as fs } from 'fs';
import yargs from 'yargs';
import { WAIT } from '../utils';
import * as log from 'cli-block';
import { DataTypes } from '../types';

const argv = yargs.options({
	title: { type: 'string', default: null },
	src: { type: 'string', default: null },
	dest: { type: 'string', default: null },
	ext: { type: 'array', default: [] },
	template: { type: 'string', default: null },
	combine: { type: 'boolean', default: false },
	filename: { type: 'string', default: null },
	output: { type: 'array', default: ['hex'] },
	templatePath: {
		type: 'string',
		default: path.join(__dirname, '../../../templates')
	}
}).argv;

interface OptionsType {
	ext: string[];
}
const AVAILABLE_OPTIONS = async (data: DataTypes): Promise<OptionsType> => {
	const templates = await fs.readdir(data.settings.templatePath);

	templates.map((file) => {
		return path.extname(file.replace('.template', ''));
	});

	return {
		ext: templates
	};
};

const CHECK_SETTINGS_HAS_OUTPUTFILE = async (
	data: DataTypes
): Promise<DataTypes> => {
	const errors = [];

	const ext = path.extname(path.basename(data.settings.dest));
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

const CHECK_SETTINGS_HAS_TYPE_OR_TEMPLATE = async (
	data: DataTypes
): Promise<DataTypes> => {
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

const CHECK_PROCREATE_TITLE = (data: DataTypes) => {
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

const GET_SETTINGS = async (): Promise<DataTypes> => {
	await WAIT(0); // Needs an await to make it usuable as steps.

	const settings = yargs.options({
		src: {
			require: true,
			type: 'string',
			default: null,
			alias: 'source'
		},
		dest: {
			require: true,
			type: 'string',
			default: null,
			alias: 'destination'
		},
		type: {
			required: false,
			type: 'array',
			alias: 'ext'
		},
		prefix: {
			required: false,
			type: 'string',
			alias: 'prefix'
		},
		templatePath: {
			required: false,
			type: 'string',
			default: path.join(__dirname, '../../../templates')
		},
		template: {
			required: false,
			type: 'string',
			default: null
		},
		combine: {
			required: false,
			type: 'boolean',
			default: false
		},
		filename: {
			required: false,
			type: 'string',
			default: null
		},
		title: {
			required: false,
			type: 'string',
			default: null
		}
	}).argv;

	return {
		settings: {
			src: settings.src,
			dest: settings.dest,
			ext: settings.type,
			prefix: settings.prefix,
			templatePath: settings.templatePath,
			template: settings.template,
			filename: settings.filename,
			combine: settings.combine,
			title: settings.title
		},
		source: [],
		error: [],
		warning: []
	};
};
const LOG_SETTINGS = async (data: DataTypes) => {
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
		.then(CHECK_PROCREATE_TITLE)
		.then(LOG_SETTINGS)
		.then((res) => {
			return res;
		});
};
