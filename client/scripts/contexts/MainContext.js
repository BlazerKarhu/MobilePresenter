import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';

const MainContext = React.createContext({});



const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState({});

  return (
    <MainContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
