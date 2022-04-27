import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CircleButton from './circleButton';
import PropTypes from 'prop-types';

const tagsDropdownContainer = ({ selected, onSelectedChange }) => {

    return (
    <ScrollView >

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width: "100%" }}>
            {selected.map((tag) => (
                <CircleButton text={tag}
                    color="#2196f3"
                    key={tag}
                    textColor="white"
                    fontSize={20}
                    style={{ borderRadius: 1, padding: 10, flexGrow: 1, borderWidth: 10, borderColor: 'white' }}
                    onPress={() => onSelectedChange(selected.filter((t) => t != tag))}
                />)
            )}
        </View>

    </ScrollView>)
}

tagsDropdownContainer.defaultProps = {
    selected: [],
    onSelectedChange: (selectedTags) => {}
}

export default tagsDropdownContainer