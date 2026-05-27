import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/.turbo/**',
      'notes/.vitepress/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'vue/html-indent': ['error', 2],
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/vitest.config.ts', 'vitest.workspace.ts'],
    languageOptions: {
      globals: globals.vitest
    }
  }
]
