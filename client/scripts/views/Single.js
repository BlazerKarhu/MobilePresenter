import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const Single = ({ route }) => {
  const { html } = route.params;
  console.log(html)
  return (
    <>
      <WebView
        style={styles.container}
        originWhitelist={['*']}
        source={{ html: 
          `<html>
            <head>
              <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
              <style>
              * {outline: 0px solid transparent;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;box-sizing: border-box;}
              html, body { margin: 0; padding: 0;font-family: Arial, Helvetica, sans-serif; font-size:1em; height: 100%}
              body { overflow-y: hidden; -webkit-overflow-scrolling: touch}
              .content {font-family: Arial, Helvetica, sans-serif;color: 'black'; width: 100%;padding-left: 0;padding-right: 0;}
              .pell { height: 100%;} .pell-content { outline: 0; overflow-y: auto;padding: 10px;height: 100%}
              </style>
            </head>
            <body>
              <div style="max-width: 100%;height: auto;width: auto; /* for ie9 */">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jtzLV8nbTiaPVkbonKgPJAHaDk%26pid%3DApi&f=1" style="width: 50%"/>${html}
              </div>
            </body>
          </html>` }} 

      />
    </>
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