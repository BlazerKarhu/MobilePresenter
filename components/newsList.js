import React from 'react';
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

const NewsList = () => {

    return (
        <FlatList
        style={styles.newsList}
        data={mediaArray}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.newsItem}>
               <Image
            style={{width: 100, height: 100}}
            source={{uri: item.thumbnails.w160}}
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
    margin: 20,
  },
  newsItem: {
    marginBottom: 10,
  },
  });

export default NewsList