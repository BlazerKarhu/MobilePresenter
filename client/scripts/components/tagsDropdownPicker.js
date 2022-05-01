import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CircleButton from './circleButton';
import PropTypes from 'prop-types';

const TagsDropdownPicker = ({tags, selected, onSelectedChange}) => {

    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);

    const unselected = (_tags, _selected) => _tags.filter(i => !_selected.includes(i))

    const tagListAsObject = () => unselected(tags,selected).map((tag) => { 
        return  { label: tag[0].toUpperCase() + tag.slice(1).toLowerCase(), value: tag.toLowerCase() }
    })

    return (
            <DropDownPicker
                /*TODO: Load list and set this with state => loading={loading} */
                // setValue={setValue}
                open={tagsDropdownOpen}
                setOpen={setTagsDropdownOpen}
                items={tagListAsObject()}
                value={selected}
                onSelectItem={(s) => { 
                    const newSelected = s.map(t => t.value)
                    onSelectedChange(newSelected) }
                }
                listMode={"SCROLLVIEW"}
                searchable={true}
                multiple={true}
                placeholder='Select tags'
                multipleText='Select tags'
                dropDownDirection="TOP"
                showTickIcon={false}
                showArrowIcon={false}
                style={{ backgroundColor: '#fff', borderColor: 'gray', borderWidth: 0.5, padding: 15, textAlign: 'center', elevation: 10 }}
                containerStyle={{ height: 50, width: '90%', maxWidth: '99%', alignSelf: 'center' }}
                listItemContainerStyle={{
                    padding: 10,
                }}
                dropDownContainerStyle={{
                    /*Selector*/
                    borderRadius: 0,
                    borderColor: 'gray',
                    borderWidth: 0,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderTopWidth: 0.5,
                }}
                searchTextInputStyle={{
                    borderRadius: 0,
                    borderColor: 'gray',
                    borderWidth: 0,
                }}
                addCustomItem={true}
                selectedItemContainerStyle={{ /*behind each dropdown item */ }}
                min={0}
            />
    )

}
TagsDropdownPicker.defaultProps = {
    tags: [ 'important' , 'news', 'summary', 'world','insider', 'misc' ],
    selected: [],
    onSelectedChange: (selectedTags) => {}
}
TagsDropdownPicker.propTypes = {
    navigation: PropTypes.object,
};
export default TagsDropdownPicker