import { MainProvider } from './scripts/contexts/MainContext';
import Navigator from './scripts/utils/navigator';



const App = () => {
  return (
    <>
    <MainProvider>
      <Navigator></Navigator>
    </MainProvider>
    </>
  );
}
export default App;