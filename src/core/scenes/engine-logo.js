import { Scene } from '../scene';

export const screenEngineLogo = new Scene({
  assets: [
    { name: 'logo', kind: 'image', path: 'assets/engine-logo.png' },
    { name: 'sample', kind: 'audio', path: 'assets/engine-audio.wav' }
  ],

  async sequence(stage, route = {}) {
    const logo = this.images.logo;
    const sample = this.sounds.sample;

    logo.set({
      width: 100,
      height: 100,
      x: 'center',
      y: 'center',
      opacity: 0
    });

    stage.add(logo, sample);

    sample.play();

    await logo.fadeIn({
      easing: 'ease',
      duration: 200
    });

    await Scene.pressAnyKeyOrWait(3000);

    await logo.fadeOut({
      easing: 'ease',
      duration: 200
    });

    stage.remove(logo, sample);

    return this;
  }
});
