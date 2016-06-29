import { Base } from './base';

/**
 * Class implements store manager.
 **/

export class Manager extends Base {

  /**
   * Create a store
   **/

  constructor() {
    super();

    this._store = {};
  }

  /**
   * Register item
   *
   * @param {string} name - Instance name
   * @param {*} instance - Something that you want to store
   * @returns {*} instance
   **/

  register(name, instance) {
    if (this.exist(name)) return this.get(name);

    this._store[name] = instance;

    return instance;
  }

  /**
   * Check store to exist item you want
   *
   * @param {string} name - Instance name
   * @returns {boolean}
   **/

  exist(name) {
    return typeof this._store[name] !== 'undefined';
  }

  /**
   * Get instance from store
   *
   * @param {string} name - Instance name
   * @returns {*} instance
   **/

  get(name) {
    return this._store[name];
  }

  /**
   * Store length
   *
   * @type {number}
   **/

  get length() {
    return Object.keys(this._store).length;
  }
}
