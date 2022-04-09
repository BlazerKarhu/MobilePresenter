import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const Single = ({ route }) => {
  const { html } = route.params;

  return (
    <>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{ html: html }}
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