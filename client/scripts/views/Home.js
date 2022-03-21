import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import NewsCarousel from '../components/newsCarousel';
import NewsList from '../components/newsList';
import Fab from '../components/fab';
import LoginModal from '../views/modals/LoginModal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Home = (props) => {
  const { navigation } = props;
  const [loginForm, setLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  console.log("Logged in", loggedIn)
  return (
    <View style={styles.container}>
      <NewsCarousel navigation={navigation} />
      <NewsList navigation={navigation} />
      <>
        {loggedIn == true ? (
          <><View style={styles.buttonView}>
            <Button
              title='Logout'
              onPress={() => {
                setLoggedIn(false);
              } } />
          </View><Fab actions={actions} onPressItem={name => navigation.navigate(name)} /></>
        ) : (
          <View style={styles.buttonView} >
            <Button
              title='Login'
              onPress={() => {
                setLoginForm(!loginForm)
              }}
            />
          </View>
        )}
      </>
      <LoginModal
        visible={loginForm}
        transparent={true}
        onClose={() => { setLoginForm(false) }}
        onDone={() => { setLoginForm(false), setLoggedIn(true) }} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 20,
  },
  buttonView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    alignSelf: 'flex-end',
    marginStart: "80%",
    marginEnd: 5,
    paddingTop: 25,
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