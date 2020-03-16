"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vmd_handler_1 = tslib_1.__importStar(require("./lib/vmd-handler"));
exports.VmdHandler = vmd_handler_1.default;
exports.VMTPDict = vmd_handler_1.VMTPDict;
const vmd_template_1 = require("./lib/vmd-template");
exports.VmdTemplate = vmd_template_1.VmdTemplate;
const vmd_public_data_1 = require("./vmd-public-data");
exports.vmdRuler = vmd_public_data_1.vmdRuler;
exports.util = vmd_public_data_1.util;
exports.VmdRuler = vmd_public_data_1.VmdRuler;
const typePlugin = [
    require("./type-plugin/component.plugin"),
    require("./type-plugin/import.plugin"),
    require("./type-plugin/template.plugin")
];
typePlugin.forEach(i => i(vmd_public_data_1.vmdRuler));
