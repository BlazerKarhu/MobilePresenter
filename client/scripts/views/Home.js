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
import TagsDropdownContainer from '../components/tagsDropdownContainer';

const Home = (props) => {
  const { navigation } = props;
  const { isLoggedIn, setIsLoggedIn, update, setUpdate, tagsArray, setTagsArray } = useContext(MainContext);

  // Popups
  const [loginForm, setLoginForm] = useState(false);
  const [filterShow, setFilterShow] = useState(false)
  
  // Posts
  const [listPosts, setListPosts] = useState([]);
  const [carouselPosts, setCarouselPosts] = useState([]);

  // Tags
  const [selectedFilterTags, setSelectedFilterTags] = useState([])

  useEffect(async () => {
    console.log("Update")
    postDb.getPosts(['important'], [true], 3, (posts) => {
      if (posts != undefined && posts.data != undefined) {
        setCarouselPosts(posts.data)
      }
    })
    postDb.getPosts(['important'].concat(selectedFilterTags), [false].concat(selectedFilterTags.map(() => true)), undefined, (posts) => {
      if (posts != undefined && posts.data != undefined) {
        setListPosts(posts.data)
      }
    })
    getTags(undefined, (tags) => {
      if (tags != undefined && tags.data != undefined) {
        setTagsArray(tags.data.map((e) => e.tag))
      }
    })
  }, [update])

  const refresh = () => {
    setUpdate(!update)
    navigation.replace("Home")
  }

  const carousel = 
  <>
  <NewsCarousel style={{ backgroundColor: 'white' }} navigation={navigation} refresh={refresh} posts={carouselPosts.slice(0, 4)} />
  <Button
          title='Toggle filter selector'
          onPress={() => {
            setFilterShow(!filterShow)
            setSelectedFilterTags([])
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
                <TagsDropdownContainer selected={selectedFilterTags}
                                onSelectedChange={(selected) => {
                                  setSelectedFilterTags(selected);
                                }} />
              <Button
                title='filter posts'
                onPress={() => {
                  setFilterShow(!filterShow)
                  setUpdate(!update)
                }} />
            </>
            :
            null
          }
        </>
  </>

  return (
    <SafeAreaProvider>
      <NewsList ListHeaderComponent={carousel} style={{ height: 0 }} navigation={navigation} refresh={refresh} posts={listPosts} />

      <View style={styles.buttonView}>
        <Button
          title={isLoggedIn ? 'Logout' : 'Login'}
          onPress={async () => {
            if (isLoggedIn) {
              console.log("Logout")
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