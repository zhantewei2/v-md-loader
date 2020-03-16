"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const highlight_js_1 = tslib_1.__importDefault(require("highlight.js"));
exports.hljsHandler = (code, lang) => {
    const validLang = highlight_js_1.default.getLanguage(lang) ? lang : 'plaintext';
    return highlight_js_1.default.highlight(validLang, code).value;
};
