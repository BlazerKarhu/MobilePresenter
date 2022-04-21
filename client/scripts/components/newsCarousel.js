import React, { memo, PureComponent, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions, Touchable, TouchableNativeFeedback, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { isMounted, isVisible } from '../utils/visible';
import { convertIp } from '../utils/debug';
import Card from './card';

const newsCarousel = ({ navigation, refresh, posts, style}) => {
  const visible = isVisible()
  const mounted = isMounted()
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const [interval, setInterval] = React.useState(0);
  const onIntervalChange = useRef((items) => { 
    if(!visible || !mounted || items.viewableItems.length == 0) return;
    setInterval(items.viewableItems[0].index)
  })

  const carouselRef = React.useRef()

  if(!visible || !mounted) return null

  const bullets = (carouselRef, interval) => {
    return <FlatList
      horizontal
      data={posts}
      keyExtractor={(_, index) => "b" + index}
      contentContainerStyle={{marginLeft: 'auto', marginRight: 'auto'}}
      renderItem={({ item, index }) =>
        <Text
          onPress={() => carouselRef.current.scrollToIndex({ animated: true, index: index})}
          style={[styles.bulletstyle, { opacity: interval == index ? 0.6 : 0.42 }]}
        >•</Text>
      }></FlatList>
  }

  return (
    <View style={style}>
      <FlatList
        horizontal
        pagingEnabled
        onLayout={(event) => setLayout(event.nativeEvent.layout)}
        onViewableItemsChanged={onIntervalChange.current}
        data={posts}
        ref={carouselRef}
        keyExtractor={(_, index) => "c" + index}
        style={[{ paddingTop: (layout.height >= 400) ? 50 : 0 }]}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => (
          { length: layout.width, offset: layout.width * index, index }
        )}
        renderItem={({ item }) => {
          return (
            <Card
            onPress={() => navigation.navigate('Detail', { html: item.html, postId: item.postId, refresh: refresh })}
            style={{ width: layout.width, marginHorizontal: Platform.OS == 'web' ? 1 : undefined }}
            contentContainerStyle={{width: "100%", maxHeight: 400, alignSelf:"center"}}
            image={item.image}
            text={item.title}
            />
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