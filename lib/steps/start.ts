import log from "cli-block";

import { SETTINGS } from "./settings";
import { WAIT } from "../utils";

export const START = async () => {
	await WAIT();
	log.START("Start building!");
	return SETTINGS;
};
