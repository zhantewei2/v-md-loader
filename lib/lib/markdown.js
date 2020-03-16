"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const marked_1 = tslib_1.__importDefault(require("marked"));
const hightlight_1 = require("./hightlight");
marked_1.default.setOptions({
    highlight: hightlight_1.hljsHandler,
});
exports.default = marked_1.default;
