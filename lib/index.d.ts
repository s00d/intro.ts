import { IntroTS } from './Intro';
import { Hints } from './Hints';
import { introVuePlugin } from './plugin_vue';
declare class Def {
    intro(): IntroTS;
    hist(): Hints;
    vuePlugin(): {
        install(Vue: import("vue").VueConstructor<import("vue").default>): void;
    };
}
declare const _default: Def;
export default _default;
export { IntroTS, Hints, introVuePlugin, Def };
