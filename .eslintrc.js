module.exports = {
  extends: ['fbjs', 'prettier'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'max-len': 'off',
    'flowtype/object-type-delimiter': 'off',
  },
};
