import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';

const Tags = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tags</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Tags.propTypes = {
  navigation: PropTypes.object,
};

export default Tags;