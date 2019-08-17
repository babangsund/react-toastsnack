module.exports = {
  ignore: ['node_modules/**'],
  presets: ['@babel/env', '@babel/react', '@babel/preset-flow'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
  ],
};
