import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

import PickerModal from '../views/modals/Picker';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const Post = () => {
  const richText = React.useRef();
  const toolbar = React.useRef();
  const scroll = React.useRef();

  const [pickerPopupVisibility, setPickerPopupVisibility] = useState(false)
  const [fontSize, setFontSize] = useState(1)

  const handleInsertVideo = useCallback(() => {
    richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
      'width: 50%;',
    );
  }, []);

  const onPressAddImage = useCallback(() => {
    // insert URL
    richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
      'background: gray;',
    );
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <RichEditor
        style={{ flex: 1 }}
        androidLayerType="software"
        ref={richText}
        initialFocus={true}
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
          fontSize={() => setPickerPopupVisibility(true)}
          // Custom buttons
          actions={[
            /* TEXT */
            actions.undo,
            actions.redo,

            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,

            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,

            actions.removeFormat,

            actions.fontSize,
          ]}
        />
        <RichToolbar
          ref={toolbar}
          editor={richText}
          onPressAddImage={onPressAddImage}
          insertVideo={handleInsertVideo}
          actions={[
            /* TEXT DECORATION */

            actions.indent,
            actions.outdent,

            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.checkboxList,

            // actions.table,

            actions.blockquote,
            actions.code,
            actions.line,

            /* EXTERNAL */
            actions.insertLink,
            actions.insertImage,
            actions.insertVideo,
          ]}
          />
      </KeyboardAvoidingView>

      <PickerModal 
      actions={[1,2,3,4,5,6,7]} 
      onPressItem={(i) => {richText.current?.setFontSize(i); setFontSize(i);}} 
      visible={pickerPopupVisibility} 
      active={fontSize}
      onDone={() => {setPickerPopupVisibility(false); richText.current?.focusContentEditor();}}/>
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