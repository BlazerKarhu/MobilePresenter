import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Platform} from 'react-native';
import NewsCarousel from '../components/newsCarousel';
import NewsList from '../components/newsList';
import Fab from '../components/fab';
import LoginModal from '../views/modals/LoginModal';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getPosts from '../database/posts'

const Home = (props) => {
  const { navigation } = props;
  const [loginForm, setLoginForm] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts.getPosts ((posts)=> {
      if (posts.data != undefined) {
        setPosts(posts.data)
      }
    })
  }, [])

  return (
    <SafeAreaProvider style={styles.container}>
      <NewsCarousel navigation={navigation} posts={posts} />
      <NewsList navigation={navigation} posts={posts}/>

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



      {isLoggedIn && <Fab actions={actions} onPressItem={name => navigation.navigate(name)} />}

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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonView: {
    top: 10,
    right: 10,
    position: 'absolute',
  },
});


Home.propTypes = {
  navigation: PropTypes.object,
};

const actions = [
  {
    text: "Post",
    icon: require("../../assets/adaptive-icon.png"),
    name: "Post"
  },
  {
    text: "Tag",
    icon: require("../../assets/favicon.png"),
    name: "Tags"
  }
];

export default Home;