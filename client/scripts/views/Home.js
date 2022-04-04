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
import media from '../database/media';

const Home = (props) => {
  const { navigation } = props;
  const [loginForm, setLoginForm] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);

    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      if (userToken) {
        try {
          setIsLoggedIn(true);
          media.uploadMedia(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`, (path) => {
            console.log(path)
          })
        } catch (error) {
          console.log('getToken check failed', error.messge);
        }
      }
    };
    useEffect(() => {
      getToken();
    }, []);
  


  return (
    <SafeAreaProvider style={styles.container}>
      <NewsCarousel navigation={navigation} />
      <NewsList navigation={navigation} />

      <View style={styles.buttonView}>

        <Button
          title={isLoggedIn ? 'Logout' : 'Login'}
          onPress={async () => {
            if (isLoggedIn) {
              console.log("removed user info")
              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("username")
              await AsyncStorage.removeItem("password")
              console.log("useEffect clear username", await AsyncStorage.getItem("username"))
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