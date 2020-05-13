import * as clog from 'cli-block';

import { WAIT } from '../utils';

export const START = async () => {
	await WAIT();
	clog.START('Start building!');
};
