import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions, Touchable, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const newsCarousel = (props) => {
  const { navigation, posts } = props;

  const windowHeight = Dimensions.get('window').height;
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const [interval, setInterval] = React.useState(0);
  console.log('Post index number:',interval)

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
            carouselRef.current.scrollToOffset({ animated: true, offset: i*100 });
            console.log('Clicked bullet number:',i)
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
        onScroll={(event) => { let i = Math.round((event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width) / (1 / posts.length)); setInterval(i); }}
        data={posts}
        ref={carouselRef}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingTop: (layout.height > windowHeight * 0.75) ? 50 : 0 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Single', { html: item.html })}
              style={{ width: layout.width, alignItems: 'center' }}>
              <Image
                style={{
                  aspectRatio: 2 / 1,
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