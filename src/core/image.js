import { debug } from './debug';
import { Asset } from './asset';

export class Image extends Asset {
  fadeIn(params = { easing: 'ease', duration: 1000 }) {
    debug.yellow('start', 'fadein');

    const fn = (resolve, reject) => {
      setTimeout(() => {
        debug.green('end', 'fadein');
        resolve();
      }, params.duration);
    };

    return new Promise(fn);
  }

  fadeOut(params = { easing: 'ease', duration: 1000 }) {
    debug.yellow('start', 'fadeout');

    const fn = (resolve, reject) => {
      setTimeout(() => {
        debug.green('end', 'fadeout');
        resolve();
      }, params.duration);
    };

    return new Promise(fn);
  }
}
