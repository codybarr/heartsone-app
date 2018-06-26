module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'indent': ['error', 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
