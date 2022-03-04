import React, { useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, ColorPropType } from 'react-native';
import PropTypes from 'prop-types';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ScrollView } from 'react-native-gesture-handler';

const Post = () => {
  const richText = React.useRef();
  const toolbar = React.useRef();
  const scroll = React.useRef();

  let handleCursorPosition = useCallback((scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  }, [])

  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <RichEditor
        style={{ flex: 1 }}
        androidLayerType="software"
        ref={richText}
        editorStyle={{
          ...styles.editor,
          contentCSSText: `
          font-family: sans-serif; 
          font-size: 14px; 
          display: flex; 
          flex-direction: column; 
          min-height: 200px; 
          position: absolute; 
          top: 0; right: 0; bottom: 0; left: 0;`}}
        placeholder={'please input content'}
        initialFocus={false}
        disabled={false}
        initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
        useContainer
        onChange={(text) => {
          //setContent(sanitize(text, { whiteList: { div: ["style"] } }))
          console.log("descriptionText:", text);
        }}
      />
      <KeyboardAvoidingView>
        <RichToolbar
          ref={toolbar}
          editor={richText}

        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editor: {
    backgroundColor: 'white',
    color: 'black'
  }
});

Post.propTypes = {
  navigation: PropTypes.object,
};

export default Post;