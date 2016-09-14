import { Base } from './base';
import { Sound } from './sound';
import { Image } from './image';
import { Manager } from './manager';
import { debug } from './debug';

const defaults = {
  assets: [],
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  backgroundColor: 'transparent',
  position: [0, 0],
};

/**
 * The game scene class.
 */

export class Scene extends Base {

  /**
   * Merge defaults with parameters.
   *
   * @param {Object} params - Scene parameters.
   * @param {GeneratorFunction} params.sequence - Scene sequence generator function.
   * @param {Scene} params.stage - The main game stage.
   * @param {Object[]} [params.assets=[]] - Scene assets.
   * @param {string} params.assets[].name - Asset name.
   * @param {string} params.assets[].kind - Asset type.
   * @param {string} params.assets[].path - Relative path to asset.
   * @param {number} [params.width=800] - Width of the scene.
   * @param {number} [params.height=600] - Height of the scene.
   */

  constructor(params) {
    super();

    this.name = params.name;

    this.images = new Manager();
    this.sounds = new Manager();

    this.params = Object.assign({}, defaults, params);

    Scene.parseAssets(params.assets, {
      images: this.images,
      sounds: this.sounds,
    });
  }

  /**
  * Initializing assets from parameters.
  *
  * @param {Object[]} assets - Scene assets.
  * @param {string} assets[].name - Asset name.
  * @param {string} assets[].kind - Asset type.
  * @param {string} assets[].path - Relative path to asset.
  * @param {Object} managers - Managers to store assets.
  */

  static parseAssets(assets = [], managers = {}) {
    for (const asset of assets) {
      if (asset.kind === 'audio') {
        const sound = new Sound(asset.name, { path: asset.path });
        const name = asset.name;

        if (managers.sounds) managers.sounds.register(name, sound);
      } else

      if (asset.kind === 'image') {
        const image = new Image(asset.name, { path: asset.path });
        const name = asset.name;

        if (managers.images) managers.images.register(name, image);
      }
    }
  }

  /**
  * Scene render function.
  */

  render(stage) {
    debug.stripe(this.name);

    const fn = (resolve, reject) => {
      this.params.sequence.apply(this, [stage, resolve]);
    };

    return new Promise(fn);
  }
}
