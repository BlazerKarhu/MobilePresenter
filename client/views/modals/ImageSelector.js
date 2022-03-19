import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Button, Image, TouchableWithoutFeedback, TextInput, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Platform } from 'expo-modules-core';
import ExpandingTextInput from '../../components/expandingTextInput';

// Currently unused, can be deleted if not needed.

const picker = (props) => {
    const { actions, active, visible, onPressItem, onDone } = props;

    const image = useState(0)

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalContent}
                visible={visible}
                onRequestClose={() => onDone()}>
                <TouchableWithoutFeedback onPress={() => onDone()}>
                    <View style={styles.modalBackdrop} >
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalOverlay}>
                                <Text style={styles.title}>Post Preview Image</Text>
                                {image == undefined ?

                                    <ImageBackground source={image} style={{ width: '100%', height: '100%' }}>
                                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>Centered text</Text>
                                            <ExpandingTextInput style={{maxHeight: '50%'}}/>
                                        </View>
                                    </ImageBackground>

                                    :

                                    <View style={{ width: '80%', height: '40%', backgroundColor: 'lightblue', alignSelf: 'center', margin: 10 }}>
                                        
                                        <ExpandingTextInput placeholder={'Title'} style={{maxHeight: '50%'}} maxLength={100}/>

                                    </View>
                                }
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
        alignSelf: 'center', width: '80%', height: '50%', backgroundColor: 'white', top: 100
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)', flex: 1
    },
    modalContent: {
        width: '100%', alignSelf: 'center', height: '100%', justifyContent: 'flex-start'
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        margin: 10,
    }
});


picker.propTypes = {
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker