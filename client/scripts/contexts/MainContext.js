import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContext = React.createContext({});

const hasSession = async () => await AsyncStorage.getItem('userToken') && await AsyncStorage.getItem('username') && await AsyncStorage.getItem('password')

const MainProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState();
  
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await hasSession())
  }, []);

  return (
    <MainContext.Provider value={{ isLoggedIn, setIsLoggedIn, update, setUpdate, tagsArray, setTagsArray }}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
