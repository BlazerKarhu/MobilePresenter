import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';

import PreviewModal from '../views/modals/PreviewModal'
import CircleButton from '../components/circleButton';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import selectMedia from '../utils/select';

const Post = () => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const tlbarBtnSize = 36
  const tlbarMaxBtnCount = 11

  const richText = React.useRef();

  const [sizeSelectorState, setSizeSelectorState] = useState(false)
  const [publishSelectorState, setPublishSelectorState] = useState(false)




  return (
    <SafeAreaView
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
      style={{ width: '100%', height: '100%' }}>
      <RichEditor
        style={{ flex: 1 }}
        onChange={(text) => console.log(text)}
        androidLayerType="hardware"
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
      />
      <KeyboardAvoidingView>
        <RichToolbar
          editor={richText}
          style={styles.toolbar}
          flatContainerStyle={[styles.toolbarcontainer, { width: (tlbarBtnSize*tlbarMaxBtnCount > layout.width) ? layout.width : undefined }]}
          fontSize={() => setSizeSelectorState(!sizeSelectorState)}
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
          editor={richText}
          style={styles.toolbar}
          flatContainerStyle={[styles.toolbarcontainer, { width: (tlbarBtnSize*tlbarMaxBtnCount > layout.width) ? layout.width : undefined }]}
          onPressAddImage={() => selectMedia(result => {
            if (result == undefined) return;

            if (result.type == 'image') {
              richText.current?.insertImage(
                `${result.uri}`,
                'background: gray;',
              );
            }
            else {
              richText.current?.insertVideo(
                `${result.uri}`,
                'width: 50%;margin-left: auto;margin-right: auto;',
              );
            }
          })}
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

            /* FINISH */
            `publish`
          ]}
          iconMap={{
            ['publish']: () => ((<CircleButton text='➤'
              size={32}
              color="#2196f3"
              textColor="white"
              margin={10}
              fontSize={20}
              onPress={() => setPublishSelectorState(true)}
            />)),
          }}
        />
        {sizeSelectorState &&
          <RichToolbar
            editor={richText}
            style={styles.toolbar}
            flatContainerStyle={[styles.toolbarcontainer, { width: (tlbarBtnSize*tlbarMaxBtnCount > layout.width) ? layout.width : undefined }]}
            actions={[
              /* CUSTOM */
              'size1',
              'size2',
              'size3',
              'size4',
              'size5',
              'size6',
              'size7',
            ]}
            iconMap={{
              ['size1']: () => ((<Text>10</Text>)),
              ['size2']: () => ((<Text>13</Text>)),
              ['size3']: () => ((<Text>16</Text>)),
              ['size4']: () => ((<Text>18</Text>)),
              ['size5']: () => ((<Text>24</Text>)),
              ['size6']: () => ((<Text>32</Text>)),
              ['size7']: () => ((<Text>48</Text>)),
            }}
            size1={() => { richText.current?.setFontSize(1) }}
            size2={() => { richText.current?.setFontSize(2) }}
            size3={() => { richText.current?.setFontSize(3) }}
            size4={() => { richText.current?.setFontSize(4) }}
            size5={() => { richText.current?.setFontSize(5) }}
            size6={() => { richText.current?.setFontSize(6) }}
            size7={() => { richText.current?.setFontSize(7) }}
          />}
      </KeyboardAvoidingView>
      <PreviewModal visible={publishSelectorState} transparent={true} onDone={() => setPublishSelectorState(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  editor: {
    backgroundColor: 'white',
    color: 'black'
  },
  toolbar: {
  },
  toolbarcontainer: {
    margin: 'auto'
  }
});

Post.propTypes = {
  navigation: PropTypes.object,
};

export default Post;