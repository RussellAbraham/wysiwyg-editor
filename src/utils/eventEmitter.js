export default class EventEmitter {

    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] ||= []).push(listener);
        return this;
    }

    off(event, listener) {
        const listeners = this.events[event];
        if (!listeners) return this;
        this.events[event] = listeners.filter(fn => fn !== listener && fn.listener !== listeners);
        if (this.events[event].length === 0) {
            delete this.events[event];
        }
        return this;
    }

    emit(event, ...args) {
        const listeners = this.events[event];
        if (!listeners) return this;
        listeners.forEach(fn => fn.apply(this, args));
        return this;
    }

}