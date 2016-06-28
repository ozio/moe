import assert from 'assert';
import { Manager } from './core/manager';

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

  it('shouldn\'t exist registered value', () => {
    let manager = new Manager();
    assert.equal(manager.exist('Item'), false);
  });

  it('shouldn\'t exist registered value', () => {
    let manager = new Manager();
    assert.equal(manager.exist('Item'), false);
  });

  it('should have right length', () => {
    let manager = new Manager();
    let item1 = {};
    let item2 = {};

    manager.register(item);
    manager.register(item);

    assert.equal(manager.length, 2);
  });
});
