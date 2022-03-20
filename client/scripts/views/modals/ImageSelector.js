import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Button, Image, TouchableWithoutFeedback, TextInput, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Platform } from 'expo-modules-core';
import ExpandingTextInput from '../../components/expandingTextInput';
import CircleButton from '../../components/circleButton';
import selectMedia from '../../helpers/media';

// Currently unused, can be deleted if not needed.

const picker = (props) => {
    const { actions, active, visible, onPressItem, onDone } = props;

    const [image, setImage] = useState(undefined)

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalOverlay}
                visible={visible}
                onRequestClose={() => onDone()}>
                <TouchableWithoutFeedback onPress={() => onDone()}>
                    <View style={styles.modalBackdrop} >
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContent}>
                                <Text style={{ textAlign: 'center', fontSize: 32, margin: 10 }}>Post Preview</Text>

                                <TouchableWithoutFeedback onPress={() => selectMedia((media) => { setImage(media.uri) }, 'image', [2, 1])}>
                                    <ImageBackground source={{ uri: image }} style={styles.image}>
                                        <ExpandingTextInput placeholder={'Title'} style={{ maxHeight: '50%' }} maxLength={100} />
                                    </ImageBackground>
                                </TouchableWithoutFeedback>

                                <CircleButton text='➤'
                                    size={35}
                                    color="#2196f3"
                                    textColor="white"
                                    margin={10}
                                    fontSize={20}
                                    style={styles.modalContentEnd}
                                    onPress={() => onDone()}
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
        backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, padding: 10
    },
    modalContent: {
        minWidth: "50%", backgroundColor: 'white', margin: 'auto', alignItems: 'center', elevation: 5
    },
    modalContentTop: { justifyContent: 'flex-start' },
    image: { width: '100%', aspectRatio: 2 / 1, backgroundColor: 'lightblue', elevation: 5, margin: 10, borderWidth: 0.5, borderColor: 'gray' },
    modalContentEnd: { alignSelf: 'flex-end', elevation: 5 }
});


picker.propTypes = {
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker