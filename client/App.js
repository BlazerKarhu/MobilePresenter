import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Navigator from './navigation/Navigator';
import Home from './views/Home';



const App = () => {
  return (
    <>
      <Navigator></Navigator>
      <StatusBar style='auto' />
    </>
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