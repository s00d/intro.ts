"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    EventEmitter.prototype.addEventListener = function (type, callback) {
        this.listeners[type] = callback;
    };
    EventEmitter.prototype.removeEventListener = function (type) {
        if (this.listeners[type]) {
            delete this.listeners[type];
        }
    };
    EventEmitter.prototype.dispatch = function (event, args) {
        if (args === void 0) { args = {}; }
        if (this.listeners[event]) {
            this.listeners[event](args);
        }
        if (this.listeners['event']) {
            args.event = event;
            this.listeners['event'](args);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map