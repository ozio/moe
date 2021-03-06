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

  it('should emit an register event', () => {
    const manager = new Manager();
    let beforeRegisterFlag = false;
    let registerFlag = false;

    manager.on('beforeRegister', () => {
      beforeRegisterFlag = true;
    });

    manager.on('register', () => {
      registerFlag = true;
    });

    manager.emit('beforeRegister');
    manager.emit('register');

    expect(beforeRegisterFlag).to.equal(true);
    expect(registerFlag).to.equal(true);
  });
});
