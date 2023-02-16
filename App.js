import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/configureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navgation from './src/navigators/Navgation';

// const Stack = createStackNavigator();

export default function App() {
  // const [token, SetToken] = React.useState('');
  // async function getToken() {
  //   const tok = await AsyncStorage.getItem('@access_token');
  //   SetToken(tok);
  // }
  // React.useEffect(() => {
  //   getToken();
  // }, [token]);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navgation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
