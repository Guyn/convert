import path from 'path';

export const asyncForEach = async (
	array: any,
	callback: any
): Promise<void> => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const WAIT = async (timer: number = 0): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('resolved');
		}, timer);
	});
};

export const pathOnly = (str: string): string => {
	let destDir = str;
	const destArray = str.split('/');
	if (destArray[destArray.length - 1].includes('.')) {
		destArray.pop();
		destDir = destArray.join('/');
	}
	return destDir;
};

export const isDir = (dir: string): boolean => {
	return path.extname(path.basename(dir)) ? false : true;
};

export const getExt = (file: string): string => {
	return path.extname(file.replace('.template', ''));
};
