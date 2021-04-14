// This file will add both p5 instanced and global intellisence
import module = require("./typings/p5/index");
import * as p5Global from "./typings/p5/global";

export = module;
export as namespace p5;
declare global {
    interface Window {
        p5: typeof module,
    }
}
