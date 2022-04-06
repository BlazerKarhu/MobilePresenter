import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions, Touchable, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// const mediaArray = [
//   {
//     'key': '0',
//     'title': 'Title 1',
//     'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
//     'thumbnails': {
//       w160: 'https://placekitten.com/320/160',
//     },
//     'filename': 'http://placekitten.com/2048/1920',
//   },
//   {
//     'key': '1',
//     'title': 'Title 2',
//     'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
//     'thumbnails': {
//       w160: 'https://placekitten.com/322/161',
//     },
//     'filename': 'http://placekitten.com/2041/1922',
//   },
//   {
//     'key': '2',
//     'title': 'Title 3',
//     'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
//     'thumbnails': {
//       w160: 'http://placekitten.com/324/162',
//     },
//     'filename': 'http://placekitten.com/2039/1920',
//   },
// ];

const newsCarousel = (props) => {
  const { navigation, posts } = props;

  const windowHeight = Dimensions.get('window').height;
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const [interval, setInterval] = React.useState(0);

  const carouselRef = React.useRef()

  const bullets = (carouselRef, interval) => {
    return <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {posts.map((image, i) => {
      return <Text
        key={i}
        onPress={() => {
          carouselRef.current.scrollToIndex({ animated: true, index: i });
        }}
        style={[styles.bulletstyle, { opacity: interval == i ? 0.6 : 0.42 }]}
      >•</Text>
    })}</View>
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        onLayout={(event) => setLayout(event.nativeEvent.layout)}
        onScroll={(event) => {let i = Math.round((event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width) / (1 / posts.length)); setInterval(i);}}
        data={posts}
        ref={carouselRef}
        style={{paddingTop: (layout.height > windowHeight * 0.75) ? 50 : 0}}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Single', { html: item.html })}
              style={{ width: layout.width, alignItems: 'center' }}>
              <Image
                style={{
                  aspectRatio: 2/1,
                  width: "100%",
                  maxHeight: windowHeight * 0.75,
                  resizeMode: 'stretch'
                }}
                source={{ uri: item.image }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )
        }}
      />
      {bullets(carouselRef, interval)}

    </View>

  )
  
}

const styles = StyleSheet.create({
  bulletstyle: {
    fontSize: 60,
    padding: 10,
    textAlign: 'center',
  },
});

newsCarousel.propTypes = {
  navigation: PropTypes.object,
};

export default newsCarousel