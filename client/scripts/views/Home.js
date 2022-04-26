import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Platform } from 'react-native';
import NewsCarousel from '../components/newsCarousel';
import NewsList from '../components/newsList';
import Fab from '../components/fab';
import LoginModal from '../views/modals/LoginModal';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postDb from '../database/posts'
import { getTags } from '../database/tags';
import TagsDropdownPicker from '../components/tagsDropdownPicker';

const Home = (props) => {
  const { navigation } = props;
  const [loginForm, setLoginForm] = useState(false);
  const { isLoggedIn, setIsLoggedIn, update, setUpdate, tagsArray, setTagsArray, selected, setSelected } = useContext(MainContext);
  const [filterShow, setFilterShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [carouselPosts, setCarouselPosts] = useState([]);

  const [selectedFilterTags, setSelectedFilterTags] = useState([])
  let filterArray = ['important']
  const [selectedTagsIncludesList, setSelectedTagsIncludesList] = useState([])
  let filterIncludes = [false]

  useEffect(async () => {
    console.log("Update")
    postDb.getPosts(['important'], [true], 3, (posts) => {
      if (posts != undefined && posts.data != undefined) {
        setCarouselPosts(posts.data)
      }
    })
    postDb.getPosts(['important'].concat(selectedFilterTags), [false].concat(selectedFilterTags.map(() => true)), undefined, (posts) => {
      if (posts != undefined && posts.data != undefined) {
        setPosts(posts.data)
      }
    })
    getTags(undefined, (tags) => {
      if (tags != undefined && tags.data != undefined) {
        console.log(tags.data)
        setTagsArray(tags.data.map((e) => e.tag))
      }
    })
  }, [update])

  const refresh = () => {
    console.log("Refresh")
    setUpdate(!update)
    navigation.replace("Home")
  }

  const placeFiltersAndIncludes = () => {
    for (let i = 0; i < selectedFilterTags.length; i++) {
      filterIncludes.push(true)
    }
    console.log('selected tags lenght', selectedFilterTags.length)
    filterArray = filterArray.concat(selectedFilterTags)
    console.log('Includes list', filterIncludes)
    console.log('Filter array', filterArray)
    setFilterShow(!filterShow)
    setUpdate(!update)
  }


  const carousel = <NewsCarousel style={{ backgroundColor: 'white' }} navigation={navigation} refresh={refresh} posts={carouselPosts.slice(0, 4)} />
  console.log('Filter array', filterArray)

  return (
    <SafeAreaProvider>
      <View>
        <NewsCarousel style={{ backgroundColor: 'white' }} navigation={navigation} refresh={refresh} posts={carouselPosts.slice(0, 4)} />
        <Button
          title='Toggle filter selector'
          onPress={() => {
            setFilterShow(!filterShow)
            setSelectedFilterTags([])
            setSelectedTagsIncludesList([false])
          }} />
        <>
          {filterShow == true ?
            <>
              <TagsDropdownPicker
                tags={tagsArray.filter((e) => e != 'important')}
                selected={selectedFilterTags}
                onSelectedChange={(selected) => {
                  setSelectedFilterTags(selected);
                }} />
              <Button
                title='filter posts'
                onPress={() => {
                  placeFiltersAndIncludes()
                }} />
            </>
            :
            null
          }
        </>
      </View>
      <NewsList style={{ height: 0 }} navigation={navigation} refresh={refresh} posts={posts} />

      <View style={styles.buttonView}>
        <Button
          title={isLoggedIn ? 'Logout' : 'Login'}
          onPress={async () => {
            if (isLoggedIn) {
              console.log("removed user info")
              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("username");
              await AsyncStorage.removeItem("password");
              setIsLoggedIn(false)
            } else {
              setLoginForm(!loginForm)
            }
          }
          } />
      </View>



      {isLoggedIn && <Fab actions={actions} onPressItem={name => navigation.navigate(name, { refresh: refresh })} />}

      <LoginModal
        visible={loginForm}
        transparent={true}
        onClose={() => { setLoginForm(false) }}
        onDone={() => { setLoginForm(false), setIsLoggedIn(true) }} />
      <StatusBar hidden style='auto' />
    </SafeAreaProvider>

  );

}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
  buttonView: {
    top: 10,
    right: 20,
    position: 'absolute',
  },
});


Home.propTypes = {
  navigation: PropTypes.object,
};

const actions = [
  {
    text: "Post",
    icon: require("../../assets/plus.png"),
    name: "Post",
    color: "rgb(45, 214, 89)",
  }
];

export default Home;