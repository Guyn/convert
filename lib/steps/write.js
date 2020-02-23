const { asyncForEach } = require("../utils");
const log = require("cli-block");
const { blue, italic } = require("kleur");
const { writeFile } = require("fs").promises;

const WRITE_FILES = async (data) => {
	await asyncForEach(data.files, async (set) => {
		await writeFile(set.path, set.data)
			.finally(() => {
				return data;
			})
			.catch((err) => {
				return { ...data, error: [err] };
			});
	});
	return data;
};
const LOG_WRITE = (data) => {
	if (data.files.length > 1) log.BLOCK_MID("Writing files");
	else log.BLOCK_MID("Writing file");

	data.files.forEach((file) => {
		log.BLOCK_LINE_SUCCESS(`${file.name} ${blue().italic(file.path)}`);
	});

	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);
};
const WRITE = async (data) =>
	WRITE_FILES(data)
		.then(LOG_WRITE)
		.then((res) => res);

module.exports = { WRITE };
