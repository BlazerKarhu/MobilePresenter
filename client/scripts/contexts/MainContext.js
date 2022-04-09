import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContext = React.createContext({});

const hasSession = async () => await AsyncStorage.getItem('userToken') && await AsyncStorage.getItem('username') && await AsyncStorage.getItem('password')

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(async () => {
    setIsLoggedIn(await hasSession())
  }, []);

  return (
    <MainContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, update, setUpdate }}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
