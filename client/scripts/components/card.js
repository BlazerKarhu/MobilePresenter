import { TouchableOpacity, Text, ImageBackground, TouchableWithoutFeedback, View } from 'react-native';

import { convertIp } from '../utils/debug';

const Card = props => (
    <View {...props}
        style={[{ backgroundColor: 'white' }, props.style]}>
        <TouchableWithoutFeedback
            onPress={props.onPress}>
            <ImageBackground
                source={{ uri: convertIp(props.image) }}
                resizeMode={props.resizeMode}
                style={[{ aspectRatio: props.aspectRatio, justifyContent: 'flex-end' }, props.contentContainerStyle]}
            >
                {props.children}
                {props.text != undefined &&
                    <Text style={[{ color: props.textColor, fontSize: props.fontSize, textAlign: props.textAlign }, { margin: props.textPadding, fontWeight: props.fontWeight, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }]}>
                        {props.text}
                    </Text>}
            </ImageBackground>
        </TouchableWithoutFeedback>
    </View>
);

Card.defaultProps = {
    onPress: () => { },
    aspectRatio: 2 / 1,
    resizeMode: "stretch",

    textAlign: "left",
    textColor: "white",
    fontWeight: "400",
    textPadding: 20,
    fontSize: 30,
}


export default Card