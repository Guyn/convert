"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { pathOnly, isDir, getExt } = require("./");
test("pathOnly", () => {
    expect(pathOnly("Wooohoo/Testfolder/Somethingelse")).toBe("Wooohoo/Testfolder/Somethingelse");
    expect(pathOnly("Wooohoo/Testfolder/Somethingelse/test.jpg")).toBe("Wooohoo/Testfolder/Somethingelse");
});
test("isDir", () => {
    expect(isDir("Wooohoo/Testfolder/Somethingelse")).toBe(true);
    expect(isDir("Wooohoo/Testfolder/Somethingelse/test.jpg")).toBe(false);
});
test("getExt", () => {
    expect(getExt("Wooohoo/Testfolder/Somethingelse")).toBe("");
    expect(getExt("Wooohoo/Testfolder/Somethingelse/test.jpg")).toBe(".jpg");
    expect(getExt("Wooohoo/Testfolder/Somethingelse/test.jpg.template")).toBe(".jpg");
});
//# sourceMappingURL=misc.test.js.map