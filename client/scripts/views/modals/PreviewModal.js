import React, { useState, useContext, useEffect } from 'react';
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
import TagsDropdownContainer from '../../components/tagsDropdownContainer';


const picker = (props) => {
    const mounted = isVisible()
    const { visible, html: html, onDone } = props;

    const { update, setUpdate, tagsArray } = useContext(MainContext);

    const [selected, setSelected] = useState([]);

    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
    });

    const [image, setImage] = useState(undefined)
    const [title, setTitle] = useState('')

    const [errorDialog, setErrorDialog] = useState('');
    const [posting, setPosting] = useState(false);

    const onExit = (postSuccess = false) => {
        onDone(postSuccess);
        setTitle('');
        setImage(undefined);
        setSelected([])
        setPosting(false)
    }

    const doPost = async () => {

        if (selected == undefined || selected.length == 0) {
            setErrorDialog('Tags are required')
            return;
        }

        if (posting) return;
        setPosting(true)

        media.uploadMedia(image, async (imagePath) => {
            console.log('doPost image path:', imagePath)

            if (imagePath.error == undefined) {
                console.log('Number of tags selected:', selected.length)
                const resp = await uploadPost(title, imagePath, html)
                console.log('PostId', resp.id)
                if (resp.error == undefined) {
                    //Add tags into the post
                    for await (const tag of selected)
                        await uploadTags(resp.id, tag)
                    

                    console.log('upload response', resp)

                    setUpdate(!update);
                    onExit(true);
                }
                else {
                    setErrorDialog(resp.error)
                    setPosting(false)
                }
            } else {
                setErrorDialog(imagePath.error)
                setPosting(false)
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
                            <Text style={styles.title}>Finalize Post</Text>
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

                                <Text
                                    onPress={() => selectMedia((media) => { setImage(media.uri) }, 'image', [2, 1])}
                                    style={styles.thumbnailText}
                                >{image == undefined ? 'Place a thumbnail here' : null} </Text>
                            </Card>

                            <TagsDropdownPicker
                                tags={tagsArray}
                                selected={selected}
                                onSelectedChange={(selected) => {
                                    console.log("Clicked, selected now: " + selected)
                                    setSelected(selected);
                                }} />

                            <TagsDropdownContainer selected={selected}
                                onSelectedChange={(selected) => {
                                    console.log("Clicked, selected now: " + selected)
                                    setSelected(selected);
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
        backgroundColor: 'white', margin: 'auto', alignItems: 'center', minWidth: '50%', maxWidth: '100%', maxHeight: '100%'
    },
    title: {
        textAlign: 'center', fontSize: 32, padding: 10
    },
    thumbnailText: {
        textAlign: 'center', fontSize: 16, padding: 10, color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', fontWeight: "400", textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10
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

