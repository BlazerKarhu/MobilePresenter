import React, { useState, useEffect, useContext } from 'react';
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Platform } from 'expo-modules-core';
import ExpandingTextInput from '../../components/expandingTextInput';
import CircleButton from '../../components/circleButton';
import selectMedia from '../../utils/select';
import DropDownPicker from 'react-native-dropdown-picker';
import media from '../../database/media';
import { uploadPost } from '../../database/posts'
import Dialog from '../modals/DialogModal';
import { MainContext } from '../../contexts/MainContext';
import { isVisible } from '../../utils/visible';
import Card from '../../components/card';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';


const picker = (props) => {
    const mounted = isVisible()
    const { visible, html: html, onDone } = props;

    const { update, setUpdate } = useContext(MainContext);

    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
    });

    const [image, setImage] = useState(undefined)
    const [title, setTitle] = useState('')

    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
    const [tags, setTags] = useState({
        tags: props.tags,
        selected: [],
    });
    const [errorDialog, setErrorDialog] = useState('');

    const setTagsWithSelected = (s) => {
        setTags({
            tags: props.tags.filter((tag) => !s.includes(tag.value)),
            selected: s
        })
    }

    const onExit = (postSuccess = false) => {
        onDone(postSuccess);
        setTitle('');
        setImage(undefined);
        setTagsWithSelected([]);
    }

    const doPost = async () => {
        console.log('doPost title:', title)
        console.log('doPost html:', html)

        media.uploadMedia(image, async (imagePath) => {
            console.log('doPost image path:', imagePath)

            if (imagePath.error == undefined) {
                const resp = await uploadPost(title, imagePath, html)
                if (resp.error == undefined) {
                    console.log('upload response', resp) // TODO: Add tags to resp.postId
                    setUpdate(!update);
                    onExit(true);
                }
                else {
                    setErrorDialog(resp.error)
                }
            } else {
                setErrorDialog(imagePath.error)
            }
        })
    }

    if (!mounted) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            style={styles.modalOverlay}
            visible={visible}
            onRequestClose={() => onExit()}>
            <TouchableWithoutFeedback onPress={() => onExit()}>
                <View style={styles.modalBackdrop} >
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalContent} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                            <Text style={styles.title}>Post Preview</Text>
                            <Card
                                onPress={() => selectMedia((media) => { setImage(media.uri) }, 'image', [2, 1])}
                                image={image}
                                style={styles.card}
                                contentContainerStyle={styles.image}
                            >
                                <ExpandingTextInput
                                    placeholder={'Title'}
                                    placeholderTextColor="white"
                                    style={{ maxHeight: '40%', color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', fontWeight: "400", textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}
                                    maxLength={100}
                                    onChange={(input) => {
                                        setTitle(input);
                                    }} />

                            </Card>



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
                                style={{ backgroundColor: '#fff', borderColor: 'gray', borderWidth: 0.5, padding: 15, textAlign: 'center', elevation: 10 }}
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
                                    borderTopWidth: 0.5,
                                }}
                                searchTextInputStyle={{
                                    borderRadius: 0,
                                    borderColor: 'gray',
                                    borderWidth: 0,
                                }}



                                addCustomItem={true}
                                selectedItemContainerStyle={{ /*behind each dropdown item */ }}
                                min={0}
                            />

                            <ScrollView>

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
                                    onPress={() => doPost()}
                                />
                            </ScrollView>
                            <Dialog
                                visible={errorDialog != ''}
                                text={errorDialog} buttons={["Ok"]}
                                onDone={() => { setErrorDialog('') }}>
                            </Dialog>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

}


const styles = StyleSheet.create({
    modalOverlay: {
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignContent: 'center'
    },
    modalContent: {
        backgroundColor: '#f8f8f8', margin: 'auto', alignItems: 'center', minWidth: '50%', maxWidth: '100%', maxHeight: '100%'
    },
    title: {
        textAlign: 'center', fontSize: 32, padding: 10
    },
    modalContentTop: { justifyContent: 'flex-start' },
    card: { width: '100%' },
    image: { aspectRatio: 2 / 1, backgroundColor: 'lightblue', borderWidth: 0.5, borderColor: 'gray', justifyContent: 'flex-start' },
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

