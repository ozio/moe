import { Scene } from '../../core/scene';

export const mainMenuScene = new Scene({
  name: 'mainMenuScene',

  async sequence(stage, route = {}) {
    console.log('mainMenuSequence');

    await stage.pressAnyKey();

    console.log('mainMenuSequence end');

    return this;
  },
});
