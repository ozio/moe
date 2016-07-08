import { Base } from './base';
import { Sound } from './sound';
import { Image } from './image';

const defaults = {
  assets: [],
  width: 800,
  height: 600,
  backgroundColor: '#000000'
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

    this.params = Object.assign(defaults, params);
    this.assets = this.parseAssets(params.assets);
  }

  /**
  * Initializing assets from parameters.
  *
  * @param {Object[]} assets - Scene assets.
  * @param {string} assets[].name - Asset name.
  * @param {string} assets[].kind - Asset type.
  * @param {string} assets[].path - Relative path to asset.
  * @returns {Object} - List of parsed assets.
  */

  parseAssets(assets) {
    const parsedAssets = {};

    for (const asset of assets) {
      if (asset.kind === 'audio') {
        const sound = new Sound(asset.name, { path: asset.path });
        parsedAssets[asset.name] = sound;
      } else

      if (asset.kind === 'image') {
        const image = new Image(asset.name, { path: asset.path });
        parsedAssets[asset.name] = image;
      }
    }

    return parsedAssets;
  }

  /**
  * Scene render function.
  */

  render() {
    const route = {};
    const sequence = this.sequence(this.stage, route);

    for (const step of sequence()) {
      // console.log(step);
    }
  }

  static pressAnyKeyOrWait(duration = 2000) {
    const timeout = setTimeout(() => {

    }, duration);
  }
}
