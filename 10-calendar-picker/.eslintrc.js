module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'import'],
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    overrides: [
        {
            files: ['**/*.tsx'],
            rules: {
                'no-return-await': 'off',
                'react/prop-types': 'off',
            },
        },
    ],
    rules: {
        'linebreak-style': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
        'import/no-cycle': 'warn',
        'import/no-extraneous-dependencies': ['warn', { devDependencies: ['**/*.test.js', '**/*.spec.js'] }],
        'no-debugger': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
