import { debug } from './debug';
import { Base } from './base';

export class Stage extends Base {
  constructor(game, params) {
    super();

    this.game = game;
    this.params = params;
  }

  initialize() {
    const p = this.params;
    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(
      p.width,
      p.height
    );

    p.container.appendChild(renderer.view);
    renderer.render(stage);

    this.stage = stage;
    this.renderer = renderer;
  }

  add(...assets) {
    for (const asset of assets) {
      asset.setStage(this);
    }
  }

  remove(...assets) {
    for (const asset of assets) {
      asset.setStage(undefined);
    }
  }

  pressAnyKey() {
    debug.yellow('start', 'pressAnyKey');

    const fn = (resolve, reject) => {
      debug.green('end', 'pressAnyKey');
      this.game.controls.once('any', resolve);
    };

    return new Promise(fn);
  }

  pressAnyKeyOrWait(duration = 2000) {
    debug.yellow('start', 'pressAnyKeyOrWait');
    let timeout;

    const fn = (resolve, reject) => {
      const resolveHandler = () => {
        debug.green('end', 'pressAnyKeyOrWait');
        clearTimeout(timeout);
        resolve();
      };

      this.game.controls.once('any', resolveHandler);
      timeout = setTimeout(() => {
        this.game.controls.off('any', resolveHandler);
        resolveHandler();
      }, duration);
    };

    return new Promise(fn);
  }
}
