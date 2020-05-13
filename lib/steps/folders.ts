import { promises as fs } from 'fs';
import { pathOnly } from '../utils';

export const FOLDERS = async (data: any) => {
	const destDir = pathOnly(data.settings.dest);

	try {
		await fs.lstat(destDir);
	} catch (err) {
		await fs.mkdir(destDir, {
			recursive: true
		});
	}
	return data;
};
