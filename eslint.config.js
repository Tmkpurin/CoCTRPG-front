import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFromatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  skipFromatting,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
