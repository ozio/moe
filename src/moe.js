import 'pixi.js';
import * as core from './core/index';
import * as scenes from './scenes/index';

core.VERSION = '%%VERSION%%';
core.scenes = scenes;

export { core, scenes };
