import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import NewsCarousel from '../components/newsCarousel';
import NewsList from '../components/newsList';
import Fab from '../components/fab';
import PropTypes from 'prop-types';

const Home = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>You've got mail!</Text>
      <NewsCarousel navigation={navigation} />
      <NewsList navigation={navigation} />
      <Fab navigation={navigation} />
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
});


Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;