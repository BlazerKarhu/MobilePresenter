import React from 'react';
import { FloatingAction } from "react-native-floating-action"; // https://github.com/santomegonzalo/react-native-floating-action
import PropTypes from 'prop-types';

const fab = (props) => {
  const { actions, onPressItem } = props;
  // Bug: Horizontal scroll appears on web if actions exists when not opened. Thus state is needed.
  const [internalActions, setInternalActions] = React.useState(undefined);

  return (
    <FloatingAction
      actions={internalActions}
      onClose={() => {
        setInternalActions(undefined)
      }}
      onOpen={() => {
        setInternalActions(actions)
      }}
      onPressItem={onPressItem}
    />)

}

fab.propTypes = {
  actions: PropTypes.array,
  onPressItem: PropTypes.func
};

export default fab