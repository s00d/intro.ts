import _Vue from 'vue';
import IntroTS from "./Intro";
import Hints from "./Hints";
import {DirectiveBinding} from "vue/types/options";
import {Options} from "./types";

declare module 'vue/types/vue' {
    interface VueConstructor {
        intro: IntroTS
        hints: Hints
    }

    interface Vue {
        $intro: IntroTS,
        $hints: Hints,
    }
}

interface PluginObject {
    install:  (vue: typeof _Vue, options: Options) => void;
}

declare global {
    interface Window {
        introPlugin: PluginObject
    }
}

const introPlugin = {
    install(Vue: typeof _Vue) {
        Vue.directive('intro', {
            bind (el:HTMLElement, binding: DirectiveBinding) {
                el.dataset.intro = binding.value.intro
                if(binding.value.step) el.dataset.step = binding.value.step
                if(binding.value.position) el.dataset.position = binding.value.position
                if(binding.value.scrollTo) el.dataset.scrollTo = binding.value.scrollTo
                if(binding.value.interaction) el.dataset.interaction = binding.value.interaction
                if(binding.value.hint) el.dataset.hint = binding.value.hint
                if(binding.value.step) el.dataset.step = binding.value.step
            }
        })

        Vue.intro = Vue.prototype.$intro = new IntroTS();
        Vue.hints = Vue.prototype.$hints = new Hints();
    }
};

export default introPlugin

try {
    window.introPlugin = introPlugin;
} catch(err) {}
