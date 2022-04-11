import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions, ImageBackground } from 'react-native';
import { convertIp } from '../utils/debug';
import { isMounted, isVisible } from '../utils/visible';

const targetwidth = 500 // When a single view should be cut off width wise. Target width for each item.
const margin = 10



const NewsList = (props) => {
  const { navigation, posts, style, contentContainerStyle } = props;
  const visible = isVisible()
  const window = Dimensions.get('window'); // Used only for starting values to have one less redraw
  const [layout, setLayout] = useState({
    width: window.width,
    height: window.height,
  });

  if(!visible) return null
  
  const columns = Math.max(Math.round(layout.width / targetwidth),1)

  const itemWidth = Math.max((layout.width - margin * 2 * columns) / columns,0)

  return (
    <FlatList
    {...props}
      style={[styles.newsList, style]}
      contentContainerStyle={contentContainerStyle}
      data={posts}
      onLayout={(e) => visible && setLayout({ ...e.nativeEvent.layout })}
      key={columns}
      numColumns={columns}
      keyExtractor={(_, index) => "l"+index}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {navigation.navigate('Single', { html: item.html }); console.log(item.image)} }
            style={[styles.newsItem, { width: itemWidth }]}>
            <ImageBackground source={{ uri: convertIp(item.image) }} resizeMode={"cover"} style={{ aspectRatio: 2 / 1 }}></ImageBackground>
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
  },
  newsItem: {
    margin: margin
  },
});

export default NewsList