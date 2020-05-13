import { asyncForEach, pathOnly } from '../utils';
import * as log from 'cli-block';
import { blue } from 'kleur';
import { promises as fs } from 'fs';
import { join } from 'path';
import JSZip from 'jszip';

const WRITE_PROCREATE_FILES = async (data, set) => {
	const zip = new JSZip();
	zip.file('Swatches.json', set.data);

	await zip
		.generateAsync({ type: 'nodebuffer' })
		.then(async function (content) {
			await fs
				.writeFile(set.path, content)
				.finally(() => data)
				.catch((err) => {
					return { ...data, error: [err] };
				});
			await fs
				.writeFile(join(pathOnly(set.path), 'Swatches.json'), set.data)
				.finally(() => data)
				.catch((err) => {
					return { ...data, error: [err] };
				});
		});
	return data;
};

const WRITE_FILES = async (data) => {
	await asyncForEach(data.files, async (set) => {
		// When it's a procreate file, it needs to be converted Swatches.json and zipped.
		if (set.ext == '.swatches') WRITE_PROCREATE_FILES(data, set);
		else {
			await fs
				.writeFile(set.path, set.data)
				.finally(() => data)
				.catch((err) => {
					return { ...data, error: [err] };
				});
		}
	});
	return data;
};
const LOG_WRITE = (data) => {
	if (data.files.length > 1) log.BLOCK_MID('Writing files');
	else log.BLOCK_MID('Writing file');

	data.files.forEach((file) => {
		log.BLOCK_LINE_SUCCESS(`${file.name} ${blue().italic(file.path)}`);
	});

	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);
};

export const WRITE = async (data) =>
	WRITE_FILES(data)
		.then(LOG_WRITE)
		.then((res) => res);
