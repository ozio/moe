import { Base } from './base';

export class Controls extends Base {
  initialize() {
    this.addListener();
  }

  addListener() {
    document.addEventListener('keydown', (e) => {
    /**
     * Press any keyboard key.
     *
     * @event Controls#anyKeyboard
     */

      this.emit('anyKeyboard');
      this.emit('any');
    });

    document.addEventListener('mousedown', (e) => {
    /**
     * Press any mouse key.
     *
     * @event Controls#anyMouse
     */

      this.emit('anyMouse');
      this.emit('any');
    });
  }
}
