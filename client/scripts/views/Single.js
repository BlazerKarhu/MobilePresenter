import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { convertIp } from '../utils/debug';

const Single = ({ route }) => {
  const { html } = route.params;
  console.log(convertIp(html))
  return (

    <WebView
    style={styles.container}
      nestedScrollEnabled
      originWhitelist={['*']}
      source={{
        html:
          `<html>
            <head>
              <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
              <style>
              * {outline: 0px solid transparent;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;box-sizing: border-box;}
              html, body { margin: 5; padding: 0;font-family: Arial, Helvetica, sans-serif; font-size:1em; height: 100%}
              body { -webkit-overflow-scrolling: touch}
              .content {font-family: Arial, Helvetica, sans-serif;color: 'black'; width: 100%;padding-left: 0;padding-right: 0;}
              .pell { height: 100%;} .pell-content { outline: 0; overflow-y: auto;padding: 10px;height: 100%}
              </style>
            </head>
            <body>
              <div style="max-width: 100%;height: auto;width: auto; /* for ie9 */">
                ${convertIp(html)}
              </div>
            </body>
          </html>` }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,

  }
});

Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;