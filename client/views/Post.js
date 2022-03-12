import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Post = () => {
  const richText = React.useRef();

  const [sizeSelectorState, setSizeSelectorState] = useState(false)

  const onInsertMedia = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result)

    if (!result.cancelled) {
      if (result.uri.slice(0, 'data:'.length) != 'data:') { // Uri not given in base64
      
        // Get file type for creating new base64 image uri
        const filename = result.uri.split(/[\\/]/).pop(), extensionDotIndex = filename.lastIndexOf(".");
        if (filename === "" || extensionDotIndex < 0) {
          Alert.alert("Filetype error", "Filetype is unrecognized")
          return;
        }
        const filetype = filename.slice(extensionDotIndex + 1);

        if (result.base64 != null) {
          result.uri = `data:${result.type}/${filetype};base64,${result.base64}`
        }
        else { // No base64 given
          // Not compatible with web, but web is guaranteed to give base64 so this should never be hit.
          result.uri = `data:${result.type}/${filetype};base64,${await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })}`
        }
      }

      if (result.uri.slice(0,'data:image'.length) == 'data:image') {
        richText.current?.insertImage(
          `${result.uri}`,
          'background: gray;',
        );
      }
      else 
      {
        richText.current?.insertVideo(
          `${result.uri}`,
          'width: 50%;margin-left: auto;margin-right: auto;',
        );
      }
    }

  }, []);


  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <RichEditor
        style={{ flex: 1 }}
        onChange={(text) => console.log(text)}
        androidLayerType="auto"
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
          onPressAddImage={onInsertMedia}
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
          ]}
        />
        {sizeSelectorState &&
          <RichToolbar
            editor={richText}
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
  },
});

Post.propTypes = {
  navigation: PropTypes.object,
};

export default Post;