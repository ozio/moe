import { PIXI } from 'pixi.js';
import { Base } from './base';
import { Stage } from './stage';

import { sceneEngineLogo } from './scenes/engine-logo';

const defaults = {
  width: 800,
  height: 600,
  container: document.body,
  assets: 'http://localhost:54321/_assets/',
  openingSequence: [
    sceneEngineLogo
  ],
  script: {}
};

/**
 * The main class which is initiate a game.
 */

export class Game extends Base {

  /**
   * Merge defaults with parameters.
   *
   * @param {object} params - Game parameters.
   * @param {number} [params.width=800] - Width of the screen.
   * @param {number} [params.height=600] - Height of the screen.
   * @param {string|HTMLElement} [params.container=document.body] - Game container.
   * @param {string} [params.assets='http://localhost:54321/_assets/'] - Game assets folder.
   * @param {Scene[]} [params.openingSequence=[sceneEngineLogo]] - Sequence of opening scenes.
   */

  constructor(params) {
    super();

    this.params = Object.assign(defaults, params);
  }

  /**
   * Initialize the stage.
   */

  initializeStage() {
    this.screen = new Stage(this.params);
    this.screen.initialize();
  }

  /**
   * Initialize game.
   *
   * @fires Game#beforeStart
   * @fires Game#start
   */

  start() {
    /**
     * Before start event.
     *
     * @event Game#beforeStart
     */
    this.emit('beforeStart');

    this.initializeScreen();

    /**
     * Start event.
     *
     * @event Game#start
     */
    this.emit('start');
  }

  /**
   * Pause the game.
   *
   * @fires Game#beforePause
   * @fires Game#pause
   */

  pause() {
    /**
     * Before game pause event.
     *
     * @event Game#beforePause
     */
    this.emit('beforePause');

    /**
     * Game pause event.
     *
     * @event Game#pause
     */
    this.emit('pause');
  }

  /**
   * Exit from the game event.
   *
   * @fires Game#beforeExit
   * @fires Game#exit
   */

  exit() {
    /**
     * Before game exit event.
     *
     * @event Game#beforeExit
     */
    this.emit('beforeExit');

    /**
     * Game exit event.
     *
     * @event Game#exit
     */
    this.emit('exit');
  }

  /**
   * Quick save the game.
   *
   * @fires Game#beforeQuickSave
   * @fires Game#quickSave
   */

  quickSave() {
    /**
     * Before quick save event.
     *
     * @event Game#beforeQuickSave
     */
    this.emit('beforeQuickSave');

    /**
     * Quick save event.
     *
     * @event Game#quickSave
     */
    this.emit('quickSave');
  }

  /**
   * Quick load the game.
   *
   * @fires Game#beforeQuickLoad
   * @fires Game#quickLoad
   */

  quickLoad() {
    /**
     * Before quick load event.
     *
     * @event Game#beforeLoadSave
     */
    this.emit('beforeQuickLoad');

    /**
     * Quick load event.
     *
     * @event Game#quickLoad
     */
    this.emit('quickLoad');
  }

  /**
   * Save the game
   *
   * @fires Game#beforeSave
   * @fires Game#save
   */

  save() {
    /**
     * Before save event.
     *
     * @event Game#beforeSave
     */
    this.emit('beforeSave');

    /**
     * Save event.
     *
     * @event Game#save
     */
    this.emit('save');
  }

  /**
   * Load the game.
   *
   * @fires Game#beforeLoad
   * @fires Game#load
   */

  load() {
    /**
     * Before load event.
     *
     * @event Game#beforeLoad
     */
    this.emit('beforeLoad');

    /**
     * Load event.
     *
     * @event Game#load
     */
    this.emit('load');
  }
}
