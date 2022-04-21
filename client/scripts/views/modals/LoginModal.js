import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import CircleButton from '../../components/circleButton';
import auth from '../../database/auth';
import { MainContext } from '../../contexts/MainContext';

import Dialog from './DialogModal';

const picker = (props) => {
    const { actions, active, visible, onPressItem, onDone, onClose } = props;

    const [accountInput, setAccountInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);

    const [errorDialog, setErrorDialog] = useState('');


    const doLogin = async () => {
        if (isLoggedIn) {
            onDone()
        } else {
                const username = accountInput;
                const password = passwordInput;
                await auth.login(username, password, (
                    async (resp) => {
                        console.log("resp:"+ resp)
                        if (resp.error == undefined) {
                            setIsLoggedIn(true);
                            onDone()
                        }
                        else setErrorDialog(resp.error)
                    }));
                    
        }

    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalOverlay}
                visible={visible}
                onRequestClose={() => onClose()}>
                <TouchableWithoutFeedback onPress={() => onClose()}>
                    <View style={styles.modalBackdrop} >
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={[styles.modalContent, { minWidth: "20%" }]}>
                                <Text style={{ textAlign: 'center', fontSize: 32, margin: 10 }}>Login</Text>
                                <TextInput
                                    style={styles.input}
                                    minWidth="80%"
                                    autoCapitalize='none'
                                    placeholder='Account'
                                    backgroundColor="lightgrey"
                                    onChangeText={setAccountInput}
                                />
                                <TextInput
                                    style={styles.input}
                                    minWidth="80%"
                                    autoCapitalize='none'
                                    placeholder='Password'
                                    backgroundColor="lightgrey"
                                    secureTextEntry={true}
                                    onChangeText={setPasswordInput}
                                />
                                <CircleButton text='➤'
                                    size={35}
                                    color="#2196f3"
                                    textColor="white"
                                    fontSize={20}
                                    style={styles.modalContentEnd}
                                    onPress={() => doLogin()}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Dialog
                visible={errorDialog != ''}
                text={errorDialog} buttons={["Ok"]}
                onDone={() => { setErrorDialog('') }}>
            </Dialog>
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
        backgroundColor: '#f8f8f8', margin: 'auto', alignItems: 'center'
    },
    modalContentTop: { justifyContent: 'flex-start' },
    image: { width: '100%', aspectRatio: 2 / 1, backgroundColor: 'lightblue', elevation: 5, margin: 10, borderWidth: 0.5, borderColor: 'gray' },
    modalContentEnd: { alignSelf: 'flex-end', elevation: 5, margin: 10 },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 8,
    }
});


picker.propTypes = {
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker