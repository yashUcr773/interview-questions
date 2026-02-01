/**
 * Implement an Event Emitter class that can be used for the publisher-subscriber mechanism in JavaScript.
 * const emitter = new Emitter();
 * * Allows you to subscribe to some event
 * const sub1 = emitter.subscribe('event_name', callback1);
 * * you can have multiple callbacks to the same event
 * const sub2 = emitter.subscribe('event_name', callback2);
 * * You can emit the event you want with this API (you can receive 'n' number of arguments)
 * emitter.emit('event_name', foo, bar);
 * * And allows you to release the subscription like this (but you should be able to still emit from sub2)
 * sub1.release();
 * * The callback passed to once must be invoked at most one time. After the callback is executed for the first time, it must be automatically unsubscribed.
 * emitter.once('ready', () => console.log('ready once'));
 * emitter.emit('ready');   // logs: ready once
 * emitter.emit('ready');   // nothing happens
 * If we try to release a subscription multiple times, it should throw a TypeError.
 */

class Emitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = new Set()
        }
        this.events[event].add(callback)
        let isReleased = false

        return {
            release: () => {
                if (isReleased) {
                    throw new Error('Already Released')
                }
                isReleased = true
                this.events[event].delete(callback)
                if (this.events[event].size === 0) {
                    delete this.events[event];
                }
            }
        }
    }

    emit(event, ...args) {
        if (!this.events[event] || this.events[event].size === 0) {
            return
        }

        this.events[event].forEach(cb => cb(...args))
    }

    once(event, callback) {
        if (!this.events[event]) {
            this.events[event] = new Set()
        }
        const fn = (...args) => {
            callback(...args);
            this.events[event].delete(fn)
        }
        this.events[event].add(fn)
        let isReleased = false

        return {
            release: () => {
                if (isReleased) {
                    throw new Error('Already Released')
                }
                isReleased = true
                this.events[event].delete(fn)
                if (this.events[event].size === 0) {
                    delete this.events[event];
                }
            }
        }
    }

}


const emitter = new Emitter();
const sub1 = emitter.subscribe('event_name', (arg1) => console.log('fun1', arg1));
const sub2 = emitter.subscribe('event_name', (arg1, arg2) => console.log('fun2', arg1, arg2));
emitter.emit('event_name', "foo", "bar");
sub1.release();
emitter.emit('event_name', 'foo', "bar");
emitter.once('ready', () => console.log('ready once'));
emitter.emit('ready');
emitter.emit('ready');