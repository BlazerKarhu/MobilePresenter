import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, } from 'react-native';
import PropTypes from 'prop-types';
import ExpandingTextInput from '../../components/expandingTextInput';
import CircleButton from '../../components/circleButton';
import selectMedia from '../../utils/select';
import media from '../../database/media';
import { uploadPost } from '../../database/posts'
import { uploadTags } from '../../database/tags';
import Dialog from '../modals/DialogModal';
import { MainContext } from '../../contexts/MainContext';
import { isVisible } from '../../utils/visible';
import Card from '../../components/card';
import TagsDropdownPicker from '../../components/tagsDropdownPicker';


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
        unselectedTags: props.tags,
        selectedTags: [],
    });

    const setTagsWithSelected = (s) => {
        setTags({
            tags: props.tags.filter((tag) => !s.includes(tag.value)),
            selected: s
        })
    }

    const [errorDialog, setErrorDialog] = useState('');

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
                console.log('Number of tags selected:', tags.selected.length)
                const resp = await uploadPost(title, imagePath, html)
                console.log('PostId',resp.id)
                if (resp.error == undefined) {
                    //if tags selected for post, add them into the post
                    if (tags.selected.length != undefined) {
                        for (let i = 0; i < tags.selected.length; i++) {
                            console.log(tags.selected[i])
                            const tagresp = await uploadTags(resp.id, tags.selected[i])
                        }
                    }
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

                            <TagsDropdownPicker 
                            tags={tags}
                            onTagClicked={(dropdownTags, selected)=>{
                                if (selected) {
                                    setTags({selectedTags: dropdownTags, unselectedTags: props.tags.filter()})
                                } else {
                                    
                                }
                                setTagsWithSelected(s.map((t) => t.value))
                            }} />

                            <CircleButton text='➤'
                                    size={35}
                                    color="#2196f3"
                                    textColor="white"
                                    margin={10}
                                    fontSize={20}
                                    style={styles.modalContentEnd}
                                    onPress={() => doPost()}
                                />
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



picker.propTypes = {
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker

