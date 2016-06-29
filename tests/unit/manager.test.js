import chai from 'chai';
import { Manager } from '../../src/core/manager';

const assert = chai.assert;
const expect = chai.expect;

describe('class Manager', () => {
  it('shouldn\'t be a singleton', () => {
    const manager1 = new Manager();
    const manager2 = new Manager();

    expect(manager1 === manager2).to.equal(false);
  });

  it('should register a value', () => {
    const manager = new Manager();
    const item = { a: 1 };

    manager.register('Item', item);

    expect(manager._store['Item']).to.equal(item);
  });

  it('should exist registered value', () => {
    const manager = new Manager();
    const item = { a: 1 };

    manager.register('Item', item);

    assert.equal(manager.exist('Item'), true);
  });

  it('shouldn\'t exist unregistered value', () => {
    const manager = new Manager();

    assert.equal(manager.exist('Item'), false);
  });

  it('should have a right length', () => {
    const manager = new Manager();
    const item1 = {};
    const item2 = {};

    manager.register('Item1', item1);
    manager.register('Item2', item2);

    expect(manager.length).to.equal(2);
  });
});
