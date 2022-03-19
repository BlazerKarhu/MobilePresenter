import { Platform } from "expo-modules-core";
import { useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import PropTypes from 'prop-types';

const ExpandingTextInput = props => {
    const { lineHeight } = props;

    const textInputRef = useRef();

    const [textInput, setTextInput] = useState({
        width: 0,
        height: lineHeight,
    });


    return (
        <TextInput editable multiline
            {...props}
            ref={textInputRef}
            style={[styles.multiline, (Platform.OS === "web" && { outlineStyle: "none" }), props.style, { height: Math.max(lineHeight, textInput.height) + 1, lineHeight: lineHeight }]}
            onContentSizeChange={e => {
                // If a significant change in height occurs (meaning at least one lines worth.)
                if (Math.abs(textInput.height - e.nativeEvent.contentSize.height) >= lineHeight) {
                    setTextInput(e.nativeEvent.contentSize);
                }
            }}
            enablesReturnKeyAutomatically={true}
            returnKeyType="none"
            blurOnSubmit={true}
        />
    )
}

const styles = StyleSheet.create({
    multiline: {
        fontSize: 25,
        textAlign: 'center',
        margin: 5,
    },
});

ExpandingTextInput.propTypes = {
};

ExpandingTextInput.defaultProps = {
    lineHeight: 35
}



export default ExpandingTextInput