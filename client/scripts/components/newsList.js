import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';

const targetwidth = 500 // When a single view should be cut off width wise. Target width for each item.
const margin = 10

const NewsList = (props) => {
  const { navigation, posts } = props;
  const window = Dimensions.get('window'); // Used only for starting values to have one less redraw
  const [layout, setLayout] = useState({
    width: window.width,
    height: window.height,
  });

  const columns = Math.round(layout.width / targetwidth)
  const itemWidth = (layout.width - margin * 2 * columns) / columns

  return (
    <FlatList
      style={styles.newsList}
      data={posts}
      onLayout={(e) => setLayout({ ...e.nativeEvent.layout })}
      key={columns}
      numColumns={columns}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        console.log(item)
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Single', { html: item.html })}
            style={[styles.newsItem, { width: itemWidth }]}>
            <Image
              style={{ aspectRatio: 2 / 1 }}
              source={{ uri: item.image }}
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
  },
  newsItem: {
    margin: margin
  },
});

export default NewsList