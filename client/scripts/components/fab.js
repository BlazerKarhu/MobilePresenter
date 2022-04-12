import React, { useRef } from 'react';
import { FloatingAction } from "react-native-floating-action"; // https://github.com/santomegonzalo/react-native-floating-action
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

const fab = (props) => {
  const { actions, onPressItem } = props;
  // Bug: Horizontal scroll appears on web if actions exists when not opened. Thus state is needed.
  const fab = useRef(undefined)
  const [internalActions, setInternalActions] = React.useState(actions.length == 1 ? actions : undefined);


  return (
      <FloatingAction
        animated={true}
        ref={(ref) => { fab.current = ref; }}
        overrideWithAction={actions.length == 1}
        actions={internalActions}
        onClose={() => {
          actions.length != 1 && setInternalActions(undefined)
        }}
        onOpen={() => {
          actions.length != 1 && setInternalActions(actions)
        }}
        onPressItem={(name) => onPressItem(name)}
      />
  )

}

fab.propTypes = {
  actions: PropTypes.array,
  onPressItem: PropTypes.func
};

export default fab