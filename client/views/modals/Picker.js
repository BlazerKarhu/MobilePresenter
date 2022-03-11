import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Currently unused, can be deleted if not needed.

const picker = (props) => {
    const { actions, active, visible, onPressItem, onDone } = props;

    return (
        <View>
            <Modal
                animationType="fade"
                visible={visible}
                onPress={() => onDone()}
                onRequestClose={() => onDone()}
            >
                <TouchableWithoutFeedback onPress={() => onDone()}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <FlatList
                        data={actions}
                        keyExtractor={(i) => i}
                        renderItem=
                        {
                            ({ item }) =>
                                <Pressable
                                    onPress={() => { onPressItem(item); onDone() }}>
                                    <Text style={item == active ? styles.selecteditem : styles.item}>{item}</Text>
                                </Pressable>
                        }
                    >

                    </FlatList>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        margin: 40,
        padding: 5,
    },
    item: {
        fontSize: 16,
        margin: 20,
        textAlign: "center",
        padding: 10,
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
    },
    selecteditem: {
        fontSize: 16,
        margin: 20,
        textAlign: "center",
        padding: 10,
        backgroundColor: '#bfbfbf',
        alignItems: 'center',
    },
    button: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
});

picker.propTypes = {
    actions: PropTypes.array,
    onPressItem: PropTypes.func,
    visible: PropTypes.bool,
    onDone: PropTypes.func,
};

export default picker