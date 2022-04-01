import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Button, Image, TouchableWithoutFeedback, TextInput, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Platform } from 'expo-modules-core';
import ExpandingTextInput from '../../components/expandingTextInput';
import CircleButton from '../../components/circleButton';
import selectMedia from '../../utils/select';
import DropDownPicker from 'react-native-dropdown-picker';

// Currently unused, can be deleted if not needed.

const picker = (props) => {
    const { actions, active, visible, onPressItem, onDone } = props;

    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
      });

    const [image, setImage] = useState(undefined)

    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
    const [tags, setTags] = useState({
        tags: props.tags,
        selected: [],
    });

    const setTagsWithSelected = (s) => {
        setTags({
            tags: props.tags.filter((tag) => !s.includes(tag.value)),
            selected: s
        })
    }

    const onExit = () => {
        setTagsWithSelected([]);
        onDone();
    }


    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalOverlay}
                visible={visible}
                onRequestClose={() => onExit()}>
                <TouchableWithoutFeedback onPress={() => onExit()}>
                    <View style={styles.modalBackdrop} >
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={[styles.modalContent, {minWidth: "50%"}]} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                                <Text style={{ textAlign: 'center', fontSize: 32, margin: 10 }}>Post Preview</Text>

                                <TouchableWithoutFeedback onPress={() => selectMedia((media) => { setImage(media.uri) }, 'image', [2, 1])}>
                                    <ImageBackground source={{ uri: image }} style={styles.image}>
                                        <ExpandingTextInput placeholder={'Title'} style={{ maxHeight: '40%' }} maxLength={100} />
                                    </ImageBackground>
                                </TouchableWithoutFeedback>

                                <DropDownPicker
                                    open={tagsDropdownOpen}
                                    /*TODO: Load list and set this with state => loading={loading} */
                                    items={tags.tags}
                                    value={tags.selected}
                                    setOpen={setTagsDropdownOpen}
                                    // setValue={setValue}
                                    onSelectItem={(s) => setTagsWithSelected(s.map((t) => t.value))}
                                    searchable={true}
                                    multiple={true}
                                    placeholder='Select tags'
                                    multipleText='Select tags'
                                    dropDownDirection="TOP"
                                    showTickIcon={false}
                                    showArrowIcon={false}
                                    style={{ backgroundColor: '#fff', borderColor: 'gray', borderWidth: 0.5, padding: 15, textAlign: 'center', elevation: 20 }}
                                    containerStyle={{ height: 50, width: '90%', maxWidth: '99%', alignSelf: 'center' }}
                                    listItemContainerStyle={{
                                        padding: 10,
                                      }}
           
                                    dropDownContainerStyle={{
                                        /*Selector*/
                                        borderRadius: 0,
                                        borderColor: 'gray',
                                        borderWidth: 0,
                                        borderLeftWidth: 0.5,
                                        borderRightWidth: 0.5,
                                        borderTopWidth: 0.5
                                    }}
                                    searchTextInputStyle={{
                                        borderRadius: 0,
                                        borderColor: 'gray',
                                        borderWidth: 0,
                                        borderBottomWidth: 0.5
                                      }}

               
             
                                    addCustomItem={true}
                                    selectedItemContainerStyle={{ /*behind each dropdown item */ }}
                                    min={0}
                                />

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width: layout.width }}>
                                    {tags.selected.map((tag) => (
                                            <CircleButton text={tag[0].toUpperCase() + tag.slice(1)}
                                                color="#2196f3"
                                                key={tag}
                                                textColor="white"
                                                margin={10}
                                                fontSize={20}
                                                style={{ borderRadius: 1, padding: 10 }}
                                                onPress={() => setTagsWithSelected(tags.selected.filter((t) => t != tag))}
                                            />)
                                    )}
                                </View>


                                <CircleButton text='➤'
                                    size={35}
                                    color="#2196f3"
                                    textColor="white"
                                    margin={10}
                                    fontSize={20}
                                    style={styles.modalContentEnd}
                                    onPress={() => onExit()}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )

}


const styles = StyleSheet.create({
    modalOverlay: {
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignContent: 'center'
    },
    modalContent: {
        backgroundColor: '#f8f8f8', margin: 'auto', alignItems: 'center', maxWidth: '100%'
    },
    modalContentTop: { justifyContent: 'flex-start' },
    image: { width: '100%', aspectRatio: 2 / 1, backgroundColor: 'lightblue', margin: 10, borderWidth: 0.5, borderColor: 'gray' },
    modalContentEnd: { alignSelf: 'flex-end', elevation: 5 }
});

picker.defaultProps = {
    tags:
        [
            { label: 'Announcements', value: 'announcements' },
            { label: 'News', value: 'news' },
            { label: 'Summary', value: 'summary' },
            { label: 'World', value: 'world' },
            { label: 'Insider', value: 'insider' },
            { label: 'Misc', value: 'misc' },
        ]
}


picker.propTypes = {
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker

