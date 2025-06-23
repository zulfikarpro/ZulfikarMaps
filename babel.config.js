module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './assets',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@pages': './src/pages',
          '@slices': './src/slices',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
