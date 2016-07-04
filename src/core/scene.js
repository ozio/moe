import { Base } from './base';

const defaults = {
  assets: [],
  width: 800,
  height: 600,
  showFunc: 'fade',
  hideFunc: 'fade',
  backgroundColor: '#000000'
};

/**
 * The game scene class.
 */

export class Scene extends Base {

  /**
   * Merge defaults with parameters.
   *
   * @param {object} params - Scene parameters.
   * @param {string[]|object[]} [params.assets=[]] - Scene assets.
   * @param {number} [params.width=800] - Width of the scene.
   * @param {number} [params.height=600] - Height of the scene.
   */

  constructor(params) {
    super();

    this.params = Object.assign(defaults, params);
  }
}
