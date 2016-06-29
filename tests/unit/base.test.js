import chai from 'chai';
import { Base } from '../../src/core/base';

const assert = chai.assert;
const expect = chai.expect;

describe('class Base', () => {
  it('shouldn\'t be a singleton', () => {
    const base1 = new Base();
    const base2 = new Base();

    assert.equal(base1 === base2, false);
  });

  it('should register an event', () => {
    const base = new Base();
    const event = 'event';
    base.on(event, () => {});

    expect(base._subscribes[event].length).to.equal(1);
  });

  it('should emit registered event', () => {
    const base = new Base();
    let variable = false;
    base.on('test', () => {
      variable = true;
    });

    base.emit('test');

    expect(variable).to.equal(true);
  });

  it('should emit once when event registered `once`', () => {
    const base = new Base();
    let iterator = 0;
    base.once('test', () => iterator++);

    base.emit('test');
    base.emit('test');
    base.emit('test');

    expect(iterator).to.equal(1);
  });

  it('shouldn\'t work with `on` wrong arguments', () => {
    const base = new Base();
    const fn = function fn() {};

    expect(() => base.on()).to.throw(TypeError);
    expect(() => base.on(1)).to.throw(TypeError);
    expect(() => base.on(fn)).to.throw(TypeError);
    expect(() => base.on('event')).to.throw(TypeError);
    expect(() => base.on('event', 1)).to.throw(TypeError);
    expect(() => base.on('event', 'string')).to.throw(TypeError);
  });

  it('shouldn\'t work with `once` wrong arguments', () => {
    const base = new Base();
    const fn = function fn() {};

    expect(() => base.once()).to.throw(TypeError);
    expect(() => base.once(1)).to.throw(TypeError);
    expect(() => base.once(fn)).to.throw(TypeError);
    expect(() => base.once('event')).to.throw(TypeError);
    expect(() => base.once('event', 1)).to.throw(TypeError);
    expect(() => base.once('event', 'string')).to.throw(TypeError);
  });

  it('shouldn\'t work with `emit` wrong arguments', () => {
    const base = new Base();

    expect(() => base.emit()).to.throw(TypeError);
    expect(() => base.emit(1)).to.throw(TypeError);
    expect(() => base.emit(() => {})).to.throw(TypeError);
  });

  it('should work as super class', () => {
    class Extended extends Base {}
    const ext = new Extended();

    expect(ext.on).to.equal(Base.prototype.on);
    expect(ext.off).to.equal(Base.prototype.off);
    expect(ext.once).to.equal(Base.prototype.once);
    expect(ext.emit).to.equal(Base.prototype.emit);
  });
});
