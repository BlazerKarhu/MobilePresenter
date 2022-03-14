import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const Single = ({ route }) => {
  const [isHTML, setIsHTML] = useState(true)
  const { file } = route.params;
  console.log(file);


  return (
    //Ternary operator
    <>
      {file == undefined ? (
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          source={{ uri: "https://www.is.fi/ulkomaat/art-2000008608788.html" }}
        />
      ) : (
        //Ternary operator
        <SafeAreaView style={styles.scrollView}>
          <View style={styles.container}>
            <Text>{file.title}</Text>
            <Image
              style={{ width: '90%', height: '80%',  }}
              source={{ uri: file.thumbnails.w160 }}
            />
            <Text>{file.description}</Text>
          </View>
        </SafeAreaView>
      )}
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