module.exports = {
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/require-default-prop': 'off'
  },
  parserOptions: {
    ecmaVersion: 2018
  }
}
