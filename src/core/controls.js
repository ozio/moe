import { Base } from './base';

export class Controls extends Base {
  initialize() {
    this.addListener();
  }

  addListener() {
    document.addEventListener('keydown', (e) => {
      this.emit('anyKey');
    });
  }
}
