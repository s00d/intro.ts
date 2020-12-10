import _Vue from 'vue';
import IntroTS from "./Intro";
import Hints from "./Hints";
import { Options } from "./types";
declare module 'vue/types/vue' {
    interface VueConstructor {
        intro: IntroTS;
        hints: Hints;
    }
    interface Vue {
        $intro: IntroTS;
        $hints: Hints;
    }
}
interface PluginObject {
    install: (vue: typeof _Vue, options: Options) => void;
}
declare global {
    interface Window {
        introPlugin: PluginObject;
    }
}
declare const introVuePlugin: {
    install(Vue: typeof _Vue): void;
};
export default introVuePlugin;
export { introVuePlugin };
