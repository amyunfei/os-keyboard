module.exports = {
  'parser': '@typescript-eslint/parser',
  'env': {
    'browser': true,
    'node': true
  },
  'extends': ['plugin:@typescript-eslint/recommended'],
  'plugins': ['@typescript-eslint'],
  'rules': {
    'indent': ['error', 2, { 'ignoredNodes': ['VariableDeclaration[declarations.length=0]'] }],
    'semi': [2, 'never'],
    'quotes': [1, 'single'],
    'no-trailing-spaces': ['error']
  }
}