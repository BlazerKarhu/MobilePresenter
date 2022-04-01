import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import NewsCarousel from '../components/newsCarousel';
import NewsList from '../components/newsList';
import Fab from '../components/fab';
import LoginModal from '../views/modals/LoginModal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = (props) => {
  const { navigation } = props;
  const [loginForm, setLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  console.log("Logged in", loggedIn)
  return (
    <SafeAreaProvider style={styles.container}>
      <NewsCarousel navigation={navigation} />
      <NewsList navigation={navigation} />



      <View style={styles.buttonView}>

        <Button
          title={loggedIn ? 'Logout' : 'Login'}
          onPress={() => { loggedIn ? setLoggedIn(false) : setLoginForm(!loginForm) }} />
      </View>



      {loggedIn && <Fab actions={actions} onPressItem={name => navigation.navigate(name)} />}

      <LoginModal
        visible={loginForm}
        transparent={true}
        onClose={() => { setLoginForm(false) }}
        onDone={() => { setLoginForm(false), setLoggedIn(true) }} />
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