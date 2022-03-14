import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

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
];

const newsCarousel = (props) => {
  const { navigation } = props;

  const windowHeight = Dimensions.get('window').height;
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const [interval, setInterval] = React.useState(0);

  const carouselRef = React.useRef()


  return (
    <View style={{
      flex: 1,
      flexDirection: "column"
    }}>
      <FlatList
        horizontal
        pagingEnabled
        onLayout={(event) => setLayout(event.nativeEvent.layout)}
        onMomentumScrollEnd={(event) => { let i = Math.round((event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width) / (1 / mediaArray.length)); setInterval(i) }}
        data={mediaArray}
        ref={carouselRef}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: windowHeight / 1.5 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={
                () => {
                  navigation.navigate('Single', { file: item });
                }
              }
              style={{ width: layout.width, alignItems: 'center' }}>
              <Image
                style={{
                  aspectRatio: 1,
                  width: layout.width,
                  maxHeight: windowHeight / 1.5,
                  resizeMode: 'stretch'
                }}
                source={{ uri: item.thumbnails.w160 }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )
        }}
      />
      {bullets(carouselRef, interval, setInterval)}

    </View>

  )
}

const bullets = (carouselRef, interval, setInterval) => {
  return <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >{mediaArray.map(function (image) {
    return <Text
      key={image.key}
      onPress={() => {
        setInterval(image.key)
        carouselRef.current.scrollToIndex({ animated: true, index: image.key });
      }}
      style={[bulletstyle, { opacity: interval == image.key ? 0.5 : 0.2 }]}
    > &bull; </Text>
  })}</View>
}

const bulletstyle = StyleSheet.create({
  fontSize: 50,
  paddingHorizontal: 10
});

newsCarousel.propTypes = {
  navigation: PropTypes.object,
};

export default newsCarousel