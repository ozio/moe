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
    const fn = (resolve, reject) => {
      this.game.controls.once('anyKey', resolve);
    };

    return new Promise(fn);
  }

  pressAnyKeyOrWait(duration = 2000) {
    const fn = (resolve, reject) => {
      this.game.controls.once('anyKey', resolve);
      const timeout = setTimeout(() => {
        this.game.controls.off('anyKey', resolve);
        resolve();
      }, duration);
    };

    return new Promise(fn);
  }
}
