"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.introVuePlugin = void 0;
var Intro_1 = __importDefault(require("./Intro"));
var Hints_1 = __importDefault(require("./Hints"));
var introVuePlugin = {
    install: function (Vue) {
        Vue.directive('intro', {
            bind: function (el, binding) {
                el.dataset.intro = binding.value.intro;
                if (binding.value.step)
                    el.dataset.step = binding.value.step;
                if (binding.value.position)
                    el.dataset.position = binding.value.position;
                if (binding.value.scrollTo)
                    el.dataset.scrollTo = binding.value.scrollTo;
                if (binding.value.interaction)
                    el.dataset.interaction = binding.value.interaction;
                if (binding.value.hint)
                    el.dataset.hint = binding.value.hint;
                if (binding.value.step)
                    el.dataset.step = binding.value.step;
            }
        });
        Vue.intro = Vue.prototype.$intro = new Intro_1.default();
        Vue.hints = Vue.prototype.$hints = new Hints_1.default();
    }
};
exports.introVuePlugin = introVuePlugin;
exports.default = introVuePlugin;
try {
    window.introPlugin = introVuePlugin;
}
catch (err) { }
//# sourceMappingURL=plugin_vue.js.map