import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback, Animated, Platform, Dimensions } from 'react-native';

/**
 * A animated sliding popup for showing option buttons to choose from.
 * 
 * Example:
 * import Dialog from './modals/DialogModal';
 * 
 * ...
 * const [popupDialogText, setPopupDialogText] = useState(undefined);
 * <Dialog visible={popupDialogText != undefined} text={popupDialogText} buttons={["Cancel", "Yes"]} onDone={(button) => {setPopupDialogText(undefined)}}>
 */

const windowHeight = Dimensions.get("window").height;

const dialog = (props) => {
    const { buttons, visible, onDone } = props;
    const animVerticalOffset = useRef(new Animated.Value(-windowHeight)).current;

    const appearAnimation = () =>
        Animated.timing(animVerticalOffset, {
            duration: 300,
            toValue: 0,
            useNativeDriver: Platform.OS == 'web' ? false : true
        })

    const disapearAnimation = () =>
        Animated.timing(animVerticalOffset, {
            duration: 300,
            toValue: -windowHeight,
            useNativeDriver: Platform.OS == 'web' ? false : true
        })

    const onExit = (value = undefined) => disapearAnimation().start(() => {
        value == undefined ? props.onDone() : props.onDone(value)
    })

    useEffect(() => {
        if (props.visible == true) {
            console.log("animation start: ")
            appearAnimation().start()
        }
    }, [props.visible])


    return (
        <View>
            <Modal visible={props.visible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => onExit(undefined)}>
                    <View style={styles.modalBackdrop} >
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <Animated.View
                                style={[styles.modalContent, {
                                    minWidth: "20%",
                                    transform: [{ translateY: animVerticalOffset }]
                                }]
                                }
                            >
                                <Text style={styles.dialog}> {props.text} </Text>
                                <View {...props} style={styles.buttonContainer}>
                                    {props.buttons.map((button, index) =>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => onExit(button)} key={index}>
                                            <Text style={styles.button}>{button}</Text>
                                        </Pressable>
                                    )}
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>);
}

const styles = StyleSheet.create({
    modalOverlay: {
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignContent: 'center'
    },
    modalContent: {
        backgroundColor: '#f8f8f8',
        marginHorizontal: 'auto',
        maxWidth: '100%',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    modalContentTop: { justifyContent: 'flex-start' },
    modalContentEnd: { alignSelf: 'flex-end', elevation: 5 },
    button: {
        marginHorizontal: 8,
        backgroundColor: 'white',
        color: 'rgb(76,94,188)',
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 16,
        color: 'blue',
    },
    dialog: {
        padding: 24,
    },
});

dialog.defaultProps = {
    text: '',
    buttons: ["Ok"],
    visible: false,
    onDone: () => { },
}

export default dialog;