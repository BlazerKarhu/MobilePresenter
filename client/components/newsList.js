import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';

const mediaArray = [
  {
    'key': '0',
    'title': 'Title 1',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    'thumbnails': {
      w160: 'http://placekitten.com/160/161',
    },
    'filename': 'http://placekitten.com/2048/1920',
  },
  {
    'key': '1',
    'title': 'Title 2',
    'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/164',
    },
    'filename': 'http://placekitten.com/2041/1922',
  },
  {
    'key': '2',
    'title': 'Title 3',
    'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/167',
    },
    'filename': 'http://placekitten.com/2039/1920',
  },
  {
    'key': '3',
    'title': 'Title 4',
    'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/114',
    },
    'filename': 'http://placekitten.com/2039/1920',
  },
];

const targetwidth = 500 // When a single view should be cut off width wise. Target width for each item.

const NewsList = (props) => {
  const { navigation } = props;
  const window = Dimensions.get('window'); // Used only for starting values to have one less redraw
  const [layout, setLayout] = useState({
    width: window.width,
    height: window.height,
  });

  const columns = Math.round(layout.width / targetwidth)

  return (
    <FlatList
      style={styles.newsList}
      data={mediaArray}
      onLayout={(e) => setLayout({ ...e.nativeEvent.layout })}
      key={columns}
      numColumns={columns}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={
              () => {
                props.navigation.navigate('Single');
              }
            }
            style={styles.newsItem}>
            <Image
              style={{ width: layout.width / columns, aspectRatio: layout.width / targetwidth }}
              source={{ uri: item.thumbnails.w160 }}
            />
            <View>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  newsList: {
    flex: 1,
    padding: 10,
    margin: 20
  },
  newsItem: {
    marginVertical: 10,
    marginHorizontal: 10
  },
});

export default NewsList