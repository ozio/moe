import chai from 'chai';
import { Manager } from '../../src/core/manager';

let assert = chai.assert;

describe('Manager', () => {
  it('should register a value', () => {
    let manager = new Manager();
    let item = { a: 1 };

    manager.register('Item', item);

    assert.equal(manager._store['Item'], item);
  });

  it('should exist registered value', () => {
    let manager = new Manager();
    let item = { a: 1 };

    manager.register('Item', item);

    assert.equal(manager.exist('Item'), true);
  });

  it('shouldn\'t exist unregistered value', () => {
    let manager = new Manager();

    assert.equal(manager.exist('Item'), false);
  });

  it('should have right length', () => {
    let manager = new Manager();
    let item1 = {};
    let item2 = {};

    manager.register('Item1', item1);
    manager.register('Item2', item2);

    assert.equal(manager.length, 2);
  });
});
