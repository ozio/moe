global.paths = {
  entry: 'src/moe.js',
};

require('require-dir')('./gulp/tasks', { recurse: true });
