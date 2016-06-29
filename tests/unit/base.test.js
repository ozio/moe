import chai from 'chai';
import { Base } from '../../src/core/base';

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should;

describe('class Base', () => {
  it('shouldn\'t be a singleton', () => {
    let base1 = new Base();
    let base2 = new Base();

    assert.equal(base1 === base2, false)
  });

  it('should register an event', () => {
    let base = new Base();
    let variable = false;
    base.on('test', () => variable = true);

    expect(base._subscribes['test'].length).to.equal(1);
  });

  it('should emit registered event', () => {
    let base = new Base();
    let variable = false;
    base.on('test', () => variable = true);

    base.emit('test');

    expect(variable).to.equal(true);
  });

  it('should emit once when event registered `once`', () => {
    let base = new Base();
    let iterator = 0;
    base.once('test', () => iterator++);

    base.emit('test');
    base.emit('test');
    base.emit('test');

    expect(iterator).to.equal(1);
  });

  it('shouldn\'t work with `on` wrong arguments', () => {
    let base = new Base();

    expect(() => base.on()).to.throw(TypeError);
    expect(() => base.on(1)).to.throw(TypeError);
    expect(() => base.on(function() {})).to.throw(TypeError);
    expect(() => base.on('event')).to.throw(TypeError);
    expect(() => base.on('event', 1)).to.throw(TypeError);
    expect(() => base.on('event', 'string')).to.throw(TypeError);
  });

  it('shouldn\'t work with `once` wrong arguments', () => {
    let base = new Base();

    expect(() => base.once()).to.throw(TypeError);
    expect(() => base.once(1)).to.throw(TypeError);
    expect(() => base.once(function() {})).to.throw(TypeError);
    expect(() => base.once('event')).to.throw(TypeError);
    expect(() => base.once('event', 1)).to.throw(TypeError);
    expect(() => base.once('event', 'string')).to.throw(TypeError);
  });

  it('shouldn\'t work with `emit` wrong arguments', () => {
    let base = new Base();

    expect(() => base.emit()).to.throw(TypeError);
    expect(() => base.emit(1)).to.throw(TypeError);
    expect(() => base.emit(() => {})).to.throw(TypeError);
  });

  it('should work as super class', () => {
    class Extended extends Base {}
    let ext = new Extended();

    expect(ext.on).to.equal(Base.prototype.on);
    expect(ext.off).to.equal(Base.prototype.off);
    expect(ext.once).to.equal(Base.prototype.once);
    expect(ext.emit).to.equal(Base.prototype.emit);
  });


});
