import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


// Lets the user pick an image or video and calls the onDone() function when finished. 
// onDone() function is passed a base64 media uri with media type ('video'/'image') or undefined if cancelled as its parameter.
// Example { uri: `data:${result.type}/${filetype};base64,${result.base64}`, type: 'video'}
const selectMedia = async (onDone, mediatype = undefined, aspectRatio = undefined) => {


    if(mediatype == undefined)
        mediatype = ImagePicker.MediaTypeOptions.All
    else if(mediatype == 'video')
        mediatype = ImagePicker.MediaTypeOptions.Videos
    else if(mediatype == 'image')
        mediatype = ImagePicker.MediaTypeOptions.Images


    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: mediatype,
        allowsEditing: true,
        aspect: aspectRatio == undefined ? [4, 3] : aspectRatio
    });

    if (!result.cancelled) {
        if (result.uri.slice(0, 'data:'.length) != 'data:') { // Uri not given in base64

            // Get file type for creating new base64 image uri
            const filename = result.uri.split(/[\\/]/).pop(), extensionDotIndex = filename.lastIndexOf(".");
            if (filename === "" || extensionDotIndex < 0) {
                Alert.alert("Filetype error", "Filetype is unrecognized")
                onDone(undefined)
                return;
            }
            const filetype = filename.slice(extensionDotIndex + 1);

            if (result.base64 != null) {
                result.uri = `data:${result.type}/${filetype};base64,${result.base64}`
            }
            else { // No base64 given
                // Not compatible with web, but web is guaranteed to give base64 so this should never be hit.
                result.uri = `data:${result.type}/${filetype};base64,${await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })}`
            }
        }

        if (result.uri.slice(0, 'data:image'.length) == 'data:image')
            onDone({ uri: result.uri, type: 'image' })
        else
            onDone({ uri: result.uri, type: 'video' })
    }

};

export default selectMedia