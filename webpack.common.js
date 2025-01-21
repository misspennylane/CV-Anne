const path = require('path');

module.exports = {
  entry: {
    app: './JS/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './JS/app.js',
  },
};
