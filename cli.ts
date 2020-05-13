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
	.then((res) => {
		console.log('step 1 -  Settings: ');
		return res;
	})
	.then(SETTINGS)
	.then((res) => {
		console.log('step 2 -  Source: ');
		return res;
	})
	.then(SOURCE)
	.then((res) => {
		console.log('step 3 -  Folders: ');
		return res;
	})
	.then(FOLDERS)
	.then((res) => {
		console.log('step 4 -  Convert: ');
		return res;
	})
	.then(CONVERT)
	.then((res) => {
		console.log('step 5 -  Templates: ');
		return res;
	})
	.then(TEMPLATES)
	.then((res) => {
		console.log('step 6 -  Build: ');
		return res;
	})
	.then(BUILD)
	.then((res) => {
		console.log('step 7 -  Write: ');
		return res;
	})
	.then(WRITE)
	.then((res) => {
		console.log('step 8 -  Finish: ');
		return res;
	})
	.then(FINISH);
