import { Base } from './base';

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
}
