// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt()
  .override('nuxt/rules', {
    rules: {
      'no-process-env': 'error',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': 'off',
    },
  });
