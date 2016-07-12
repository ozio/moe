import { Base } from './base';

/**
 * Class implements store manager.
 */

export class Manager extends Base {

  /**
   * Create a store
   */

  constructor() {
    super();

    this.store = {};
  }

  /**
   * Register item
   *
   * @param {string} name - Instance name
   * @param {*} instance - Something that you want to store
   * @fires Manager#beforeRegister
   * @fires Manager#register
   * @returns {*} instance
   */

  register(name, instance) {
    /**
     * Before register event.
     *
     * @event Manager#beforeRegister
     */

    this.emit('beforeRegister');

    if (this.exist(name)) return this.get(name);

    this.store[name] = instance;

    /**
     * Register event.
     *
     * @event Manager#register
     */

    this.emit('register');

    return instance;
  }

  /**
   * Check store to exist item you want
   *
   * @param {string} name - Instance name
   * @returns {boolean}
   */

  exist(name) {
    return typeof this.store[name] !== 'undefined';
  }

  /**
   * Get instance from store
   *
   * @param {string} name - Instance name
   * @returns {*} instance
   */

  get(name) {
    return this.store[name];
  }

  /**
   * Store length
   *
   * @type {number}
   */

  get length() {
    return Object.keys(this.store).length;
  }
}
