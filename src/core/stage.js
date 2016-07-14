import { Base } from './base';
import { keyboard } from './keyboard';

export class Stage extends Base {
  constructor(params) {
    super();

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

  pressAnyKeyOrWait(duration = 2000) {
    const fn = (resolve, reject) => {
      keyboard.once('anyKey', resolve);
      const timeout = setTimeout(() => {
        keyboard.off('anyKey', resolve);
        resolve();
      }, duration);
    };

    return new Promise(fn);
  }
}
