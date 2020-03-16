import {Compiler, Plugin} from "webpack";
import {vmdRuler} from "./main";

const id = "vmd-plugin";


export = class VMDPlugin implements Plugin {

    apply(compiler: Compiler) {
        compiler.hooks.shouldEmit.tap(id, () => {
            vmdRuler.clearStore();
        });


    }
}