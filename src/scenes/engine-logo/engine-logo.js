import { Scene } from '../../core/index';

export const engineLogoScene = new Scene({
  name: 'engineLogoScene',

  assets: [
    { name: 'logo', kind: 'image', path: './assets/engine-logo.png' },
    { name: 'sample', kind: 'audio', path: './assets/engine-audio.wav' },
  ],

  async sequence(stage, resolve) {
    const logo = this.images.get('logo');
    const sample = this.sounds.get('sample');

    logo.set({
      width: 240,
      height: 240,
      x: 'center',
      y: 'center',
      opacity: 0,
    });

    stage.add(logo, sample);

    sample.play();

    await logo.fadeIn({
      easing: 'ease',
      duration: 2000,
    });

    await stage.pressAnyKeyOrWait(5000);

    await logo.fadeOut({
      easing: 'ease',
      duration: 2000,
    });

    stage.remove(logo, sample);

    resolve();
  },
});
