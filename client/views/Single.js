import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const Single = ({ route }) => {
  const [isHTML, setIsHTML] = useState(false)
  const { file } = route.params;
  console.log(file);

  return (
    //Ternary operator, CTD on WebView
    <SafeAreaView style={styles.container}>
      {isHTML ? (
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{ html: '<h1><center>Hello world</center></h1>' }}
        />
      ) : (
        //Ternary operator, Image not working currently
        <View>
          <Text>{file.title}</Text>
          <Image
            style={{ width: '90%', height: '80%' }}
            source={{ uri: file.thumbnails.w160 }}
          />
          <Text>{file.description}</Text>
        </View>
      )}
    </SafeAreaView>
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
});

Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;