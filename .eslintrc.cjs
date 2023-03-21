module.exports = {
  extends: ['semistandard'],
  rules: {
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'operator-linebreak': ['error', 'after']
  }
};
