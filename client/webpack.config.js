const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  // https://yosukep.medium.com/use-webview-with-expo-web-6722969bf7bb
  // Webview in React Native Web Workaround - Start
  config.module.rules.push({
    test: /postMock.html$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  });

  /*
  config.resolve.alias = {
  "react- native": "react - native - web",
  "react - native - webview": "react - native - web - webview",
  };
  */
  // Webview in React Native Web Workaround - End

  // If you want to add a new alias to the config.
  //config.resolve.alias['react-native'] = 'react-native-web';
  config.resolve.alias['react-native-webview'] = 'react-native-web-webview';

  if (config.mode === 'development') {
    // Turn off compression in dev mode.
    //config.devServer.compress = false;
  }

  if (config.mode === 'production') {
    // Prevent minimizing the bundle on build.
    //config.optimization.minimize = false;
  }

  return config;
};

