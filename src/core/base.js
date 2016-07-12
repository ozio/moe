/**
 * The base class that bring functionality to all other classes, e.g. event emitting.
 */

export class Base {

  /**
   * Create a list
   */

  constructor() {
    this.subscribers = {};
  }

  /**
   * Subscribe a handler on event.
   *
   * @param {string} event - Event name
   * @param {function} handler - Handler
   * @returns {Base} - Current instance
   */

  on(event, handler) {
    if (!event) {
      throw new TypeError('Failed to execute `on`: 2 arguments required.');
    }
    if (typeof event !== 'string') {
      throw new TypeError('Failed to execute `on`: `event` must be a string.');
    }
    if (!handler) {
      throw new TypeError('Failed to execute `on`: 2 arguments required, but only 1 present.');
    }
    if (typeof handler !== 'function') {
      throw new TypeError('Failed to execute `on`: `handler` must be a function.');
    }

    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(handler);

    return this;
  }

  /**
   * This is <code>on</code>, but handler will subscribe for only one event firing.
   *
   * @param {string} event - Event name
   * @param {function} handler - Handler
   * @returns {Base} - Current instance
   */

  once(event, handler) {
    if (!event) {
      throw new TypeError('Failed to execute `once`: 2 arguments required.');
    }
    if (typeof event !== 'string') {
      throw new TypeError('Failed to execute `once`: `event` must be a string.');
    }
    if (!handler) {
      throw new TypeError('Failed to execute `once 2 arguments required, but only 1 present.');
    }
    if (typeof handler !== 'function') {
      throw new TypeError('Failed to execute `once`: `handler` must be a function.');
    }

    const wrapped = (...args) => {
      handler.call(this, args);

      this.off(event, wrapped);
    };

    return this.on(event, wrapped);
  }

  /**
   * Unsubscribe handler(-s) from event.
   *
   * @example <caption>Unsubscribe handler from the event</caption>
   * instance.off('event', handler);
   *
   * @example <caption>Unsubscribe all handlers from the event</caption>
   * instance.off('event');
   *
   * @example <caption>Unsubscribe all</caption>
   * instance.off();
   *
   * @param {string} [event] - Event name
   * @param {function} [handler] - Handler
   * @returns {Base} - Current instance
   */

  off(event, handler) {
    if (handler === undefined) {
      if (event === undefined) {
        this.subscribers = {};
      } else {
        this.subscribers[event] = [];
      }

      return this;
    }

    for (let i = 0, l = this.subscribers[event].length; i < l; i++) {
      if (this.subscribers[event][i] === handler) {
        this.subscribers[event].splice(i, 1);
        break;
      }
    }

    return this;
  }

  /**
   * Emit all subscribed handlers for event.
   *
   * @param {string} event - Event
   * @param args - Arguments that should passed to event handler
   * @returns {Base} - Current instance
   */

  emit(event, ...args) {
    if (!event) {
      throw new TypeError('Failed to execute `emit`: 1 argument required.');
    }
    if (typeof event !== 'string') {
      throw new TypeError('Failed to execute `emit`: `event` must be a string.');
    }

    const attributeName = `on${event[0].toUpperCase()}${event.slice(1)}`;

    if (this.subscribers[event] || this[attributeName]) {
      if (this[attributeName]) {
        this[attributeName].apply(this, args);
      }

      if (this.subscribers[event]) {
        for (let i = 0, l = this.subscribers[event].length; i < l; i++) {
          this.subscribers[event][i].apply(this, args);
        }
      }
    }

    return this;
  }
}
