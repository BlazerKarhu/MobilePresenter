import { TouchableOpacity, Text } from 'react-native';

const CircleButton = props => (
  <TouchableOpacity
    {...props}
    style={[props.style, {
      height: props.size,
      width: props.size,
      backgroundColor: props.color,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: props.size ? props.size * 2 : undefined,
    }]}
    onPress={props.onPress}>
    <Text style={{ color: props.textColor, fontSize: props.fontSize, textAlign: props.textAlign }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);


export default CircleButton