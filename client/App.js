import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { MainProvider } from './scripts/contexts/MainContext';
import Navigator from './scripts/utils/navigator';



const App = () => {
  return (
    <>
    <MainProvider>
      <Navigator></Navigator>
      <StatusBar style='auto' />
    </MainProvider>
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