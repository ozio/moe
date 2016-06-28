import { Base } from './base';

export class Manager extends Base {
  constructor() {
    super();

    this._store = {};
  }

  register(name, instance) {
    if (this.exist(name)) return this.get(name);

    this._store[name] = instance;

    return instance;
  }

  exist(name) {
    return typeof this._store[name] !== 'undefined';
  }

  get(name) {
    return this._store[name];
  }

  get length() {
    return Object.keys(this._store).length;
  }
}