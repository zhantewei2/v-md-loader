import {vmdRuler, LoaderCandy} from "./main"


export = function (this: any, webpack: any, params: Record<string, any>) {
    const {vmdId, vmdType} = params;
    const candy: LoaderCandy = {
        content: "",
        webpack,
        vmdId,
        vmdType
    };
    vmdRuler.hooks.loader.call(candy, params);
    if (candy.content) return candy.content;
    return `export default {}`;
}