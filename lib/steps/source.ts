import { promises as fs } from 'fs';
import path from 'path';
import log from 'cli-block';
import { asyncForEach } from '../utils';

const GET_SOURCE_FILES = async (data: any) => {
	if (!data.settings.source) return { ...data };

	let srcFiles = [];
	let files = [];
	let source = data.settings.source;

	// Check whether source is a file or a folder.
	const isDir = path.extname(path.basename(source)) ? false : true;

	if (isDir)
		srcFiles = await fs.readdir(source).then((result) =>
			result.map((file) => {
				return path.join(source, file);
			})
		);
	else srcFiles = [source];

	await asyncForEach(srcFiles, async (file) => {
		const fileData = await fs.readFile(file).then((res) => res.toString());
		files.push({
			name: path.basename(file).replace(path.extname(file), ''),
			file: path.basename(file),
			type: path.extname(path.basename(file)),
			path: source,
			data: fileData,
			parsed: JSON.parse(fileData)
		});
	});

	return { ...data, source: files };
};

const FILTER_FILES = (data: any) => {
	return {
		...data,
		source: data.source.filter((file) => file.type == '.json')
	};
};

const LOG_SOURCE_FILES = (data: any) => {
	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);

	return data;
};

export const SOURCE = async (data) =>
	GET_SOURCE_FILES(data)
		.then(FILTER_FILES)
		.then(LOG_SOURCE_FILES)
		.then((res) => res);
