export class Base {

  /**
   * @classdesc The base class that bring global functionality to all other classes. E.g. event emitting.
   **/

  constructor() {
    this._subscribes = {};
  }

  /**
   * Subscribe a handler on event.
   *
   * @param {string} event - Event name
   * @param {function} handler - Handler
   * @returns {Base}
   **/

  on(event, handler) {
    if (!event) throw new TypeError('Failed to execute `on`: 2 arguments required.');
    if (typeof event !== 'string') throw new TypeError('Failed to execute `on`: `event` must be a string.');
    if (!handler) throw new TypeError('Failed to execute `on`: 2 arguments required, but only 1 present.');
    if (typeof handler !== 'function') throw new TypeError('Failed to execute `on`: `handler` must be a function.');

    if (!this._subscribes[event]) this._subscribes[event] = [];
    this._subscribes[event].push(handler);

    return this;
  }

  /**
   * This is `on`, but handler will subscribe for only one event firing.
   *
   * @param {string} event - Event name
   * @param {function} handler - Handler
   * @returns {Base}
   **/

  once(event, handler) {
    if (!event) throw new TypeError('Failed to execute `once`: 2 arguments required.');
    if (typeof event !== 'string') throw new TypeError('Failed to execute `once`: `event` must be a string.');
    if (!handler) throw new TypeError('Failed to execute `once 2 arguments required, but only 1 present.');
    if (typeof handler !== 'function') throw new TypeError('Failed to execute `once`: `handler` must be a function.');

    let wrapped = () => {
      let args = Array.prototype.slice.call(arguments, 1);
      handler.call(this, args);

      this.off(event, wrapped);
    };

    return this.on(event, wrapped);
  }

  /**
   * Unsubscribe handler(-s) from event.
   *
   * @param {string} [event] - Event name
   * @param {function} [handler] - Handler
   * @returns {Base}
   **/

  off(event, handler) {
    if (handler === undefined) {
      if (event === undefined) {
        this._subscribes = {};
      } else {
        this._subscribes[event] = [];
      }

      return this;
    }

    for (let i = 0, l = this._subscribes[event].length; i < l; i++) {
      if (this._subscribes[event][i] === handler) {
        this._subscribes[event].splice(i, 1);
        break;
      }
    }

    return this;
  }

  /**
   * Emit all subscribed handlers for event.
   *
   * @param {string} event - Event
   * @returns {Base}
   **/

  emit(event) {
    if (!event) throw new TypeError('Failed to execute `emit`: 1 argument required.');
    if (typeof event !== 'string') throw new TypeError('Failed to execute `emit`: `event` must be a string.');

    let attributeName = 'on' + event[0].toUpperCase() + event.slice(1);

    if (this._subscribes[event] || this[attributeName]) {
      let args = Array.prototype.slice.call(arguments, 1);

      if (this[attributeName]) {
        this[attributeName].apply(this, args);
      }

      if (this._subscribes[event]) {
        for (let i = 0, l = this._subscribes[event].length; i < l; i++) {
          this._subscribes[event][i].apply(this, args);
        }
      }
    }

    return this;
  }
}
