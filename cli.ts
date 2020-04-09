#!/usr/bin/env node

import {
	START,
	SETTINGS,
	SOURCE,
	FOLDERS,
	CONVERT,
	TEMPLATES,
	BUILD,
	WRITE,
	FINISH
} from './lib';

console.log(START);
START()
	.then(SETTINGS)
	.then(SOURCE)
	.then(FOLDERS)
	.then(CONVERT)
	.then(TEMPLATES)
	.then(BUILD)
	.then(WRITE)
	.then(FINISH);
