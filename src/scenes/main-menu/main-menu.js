import { debug } from '../../core/debug';
import { Scene } from '../../core/scene';

export const mainMenuScene = new Scene({
  name: 'mainMenuScene',

  async sequence(stage, resolve) {
    await stage.pressAnyKey();

    resolve();
  },
});
