import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { convertIp } from '../utils/debug';
import { MainContext } from '../contexts/MainContext';
import { deletePost } from '../database/posts'
import { isVisible } from '../utils/visible';

import Dialog from './modals/DialogModal';

// const doDelete = async () => {
// const resp = await deletePost(postId)
// if (resp.error == undefined) {
//     console.log('upload response', resp) 
//     setUpdate(!update);
//     onExit(true);
// }
// else {
//   setErrorDialog(resp.error)
// }
// }


const Single = ({ route, navigation }) => {
  const [errorDialog, setErrorDialog] = useState('');
  const { html, postId } = route.params;
  console.log(convertIp(html))

  const visible = isVisible()
  const { isLoggedIn, update, setUpdate } = useContext(MainContext);

  const doDelete = async () => {
      const resp = await deletePost(postId)

      if (resp.error == undefined) {
        setUpdate(!update)
        navigation.replace("Home")
      }
      else
      {
        setErrorDialog(resp.error)
      }
  }


  React.useLayoutEffect(() => {
    if (!visible || !isLoggedIn) return;
    navigation.setOptions({
      headerRight: () => (
        <View style={{ margin: 10 }}>
          <Button
            color="#FF0000"
            onPress={() => doDelete()}
            title="Delete post" />
        </View>
      ),
    });
  }, [navigation]);



  // Do not render anything if post deleted or navigated in some other way.
  if (!visible) return null

  return (
    <>
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
      <Dialog
        visible={errorDialog != ''}
        text={errorDialog} buttons={["Ok"]}
        onDone={() => { setErrorDialog('') }}>
      </Dialog>
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