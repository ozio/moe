import chai from 'chai';
import { Manager } from '../../src/core/manager';

let assert = chai.assert;
let expect = chai.expect;

describe('class Manager', () => {
  it('shouldn\'t be a singleton', () => {
    let manager1 = new Manager();
    let manager2 = new Manager();

    expect(manager1 === manager2).to.equal(false);
  });

  it('should register a value', () => {
    let manager = new Manager();
    let item = { a: 1 };

    manager.register('Item', item);

    expect(manager._store['Item']).to.equal(item);
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

    expect(manager.length).to.equal(2);
  });
});
