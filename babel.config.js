module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    ['nativewind/babel', {mode: 'transformOnly'}],
  ],
  plugins: ['react-native-reanimated/plugin', 'babel-plugin-macros'],
  ignore: ['**/*.css'],
};
