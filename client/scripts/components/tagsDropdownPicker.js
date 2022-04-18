import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CircleButton from './circleButton';
import PropTypes from 'prop-types';

const TagsDropdownPicker = (props) => {
    const setTagsWithSelected = (s) => {
        setTags({
            tags: props.tags.filter((tag) => !s.includes(tag.value)),
            selected: s
        })
    }
    const [tags, setTags] = useState({
        tags: props.tags,
        selected: [],
    });
    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
    return (
        <>
            <DropDownPicker
                open={tagsDropdownOpen}
                /*TODO: Load list and set this with state => loading={loading} */
                items={tags.tags}
                value={tags.selected}
                setOpen={setTagsDropdownOpen}
                // setValue={setValue}
                onSelectItem={(s) => setTagsWithSelected(s.map((t) => t.value))}
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
            <ScrollView >

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width: "100%" }}>
                    {tags.selected.map((tag) => (
                        <CircleButton text={tag[0].toUpperCase() + tag.slice(1)}
                            color="#2196f3"
                            key={tag}
                            textColor="white"
                            fontSize={20}
                            style={{ borderRadius: 1, padding: 10, flexGrow: 1, borderWidth: 10, borderColor: 'white' }}
                            onPress={() => setTagsWithSelected(tags.selected.filter((t) => t != tag))}
                        />)
                    )}
                </View>

            </ScrollView>
            
        </>
    )

}
TagsDropdownPicker.defaultProps = {
    tags:
        [
            { label: 'Important', value: 'important' },
            { label: 'News', value: 'news' },
            { label: 'Summary', value: 'summary' },
            { label: 'World', value: 'world' },
            { label: 'Insider', value: 'insider' },
            { label: 'Misc', value: 'misc' },
        ]
}
TagsDropdownPicker.propTypes = {
    navigation: PropTypes.object,
};
export default TagsDropdownPicker