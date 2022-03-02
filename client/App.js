import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import NewsCarousel from './components/newsCarousel';
import NewsList from './components/newsList';
import Fab from './components/fab';



const App= () => {
  return (
    <View style={styles.container}>
      <Text>You've got mail!</Text>
      <NewsCarousel />
      <NewsList />
      <Fab/>
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

export default App;