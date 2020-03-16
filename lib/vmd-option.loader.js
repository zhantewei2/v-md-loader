"use strict";
const main_1 = require("./main");
module.exports = function (webpack, params) {
    const { vmdId, vmdType } = params;
    const candy = {
        content: "",
        webpack,
        vmdId,
        vmdType
    };
    main_1.vmdRuler.hooks.loader.call(candy, params);
    if (candy.content)
        return candy.content;
    return `export default {}`;
};
