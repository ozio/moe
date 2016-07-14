import { Asset } from './asset';

export class Image extends Asset {
  fadeIn(params = { easing: 'ease', duration: 1000 }) {
    console.log('fadein');

    const fn = (resolve, reject) => {
      setTimeout(() => {
        console.log('fadein end');
        resolve();
      }, params.duration);
    };

    return new Promise(fn);
  }

  fadeOut(params = { easing: 'ease', duration: 1000 }) {
    console.log('fadeout');

    const fn = (resolve, reject) => {
      setTimeout(() => {
        console.log('fadeout end');
        resolve();
      }, params.duration);
    };

    return new Promise(fn);
  }
}
