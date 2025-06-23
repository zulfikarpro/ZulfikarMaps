const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const projectRoot = __dirname;
const srcPath = path.join(projectRoot, 'src');

const config = {
  resolver: {
    extraNodeModules: {
      '@assets': path.resolve(projectRoot, 'assets'),
      '@navigation': path.resolve(srcPath, 'navigation'),
      '@store': path.resolve(srcPath, 'store'),
      '@components': path.resolve(srcPath, 'components'),
      '@slices': path.resolve(srcPath, 'slices'),
      '@pages': path.resolve(srcPath, 'pages'),
      '@hooks': path.resolve(srcPath, 'hooks'),
    },
  },
  watchFolders: [srcPath, path.resolve(projectRoot, 'assets')],
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
