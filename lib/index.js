"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Def = exports.introVuePlugin = exports.Hints = exports.IntroTS = void 0;
var Intro_1 = require("./Intro");
Object.defineProperty(exports, "IntroTS", { enumerable: true, get: function () { return Intro_1.IntroTS; } });
var Hints_1 = require("./Hints");
Object.defineProperty(exports, "Hints", { enumerable: true, get: function () { return Hints_1.Hints; } });
var plugin_vue_1 = require("./plugin_vue");
Object.defineProperty(exports, "introVuePlugin", { enumerable: true, get: function () { return plugin_vue_1.introVuePlugin; } });
var Def = (function () {
    function Def() {
    }
    Def.prototype.intro = function () {
        return new Intro_1.IntroTS();
    };
    Def.prototype.hist = function () {
        return new Hints_1.Hints();
    };
    Def.prototype.vuePlugin = function () {
        return plugin_vue_1.introVuePlugin;
    };
    return Def;
}());
exports.Def = Def;
exports.default = new Def();
//# sourceMappingURL=index.js.map