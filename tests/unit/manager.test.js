import chai from 'chai';
import should from 'should';
import { Manager } from '../../src/core/manager';

let assert = chai.assert;

describe('class Manager', () => {
  it('shouldn\'t be a singleton', () => {
    let manager1 = new Manager();
    let manager2 = new Manager();

    assert.equal(manager1 === manager2, false)
  });

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

  it('should have a right length', () => {
    let manager = new Manager();
    let item1 = {};
    let item2 = {};

    manager.register('Item1', item1);
    manager.register('Item2', item2);

    manager.should.have.property('length', 2);
  });
});
