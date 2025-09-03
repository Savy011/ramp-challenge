import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  react: true,
  stylistic: {
    semi: true,
    quotes: 'single',
    indent: 2,
  },
});
