import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wallet from '../screens/wallet';
import SwapCoins from '../screens/swap_coins/swap_coins';
import AddressBook from '../screens/address_book/address_book';
// import SendRequestCoin from '../screens/send_request_coin';
import Pocket from '../screens/send_recieve';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';
import Dashboard from '../screens/dashboard';
import LinearGradient from 'react-native-linear-gradient';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          // position: 'absolute',
          elevation: 0,
          // backgroundColor: '#15172C',
          backgroundColor: 'rgba(21,23,44,11)',
          height: 75,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tabs.Screen
        name="Home"
        component={Wallet}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../assets/send.png')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="&&&&"
        component={Pocket}
        listeners={{
          tabPress: e => {},
        }}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              style={[styles.image, {right: 15}]}
              source={require('../assets/swap.png')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="new"
        component={Dashboard}
        listeners={{
          tabPress: e => {},
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
              source={require('../assets/logo_tab.png')}
              resizeMode="contain"
            />
          ),
          tabBarButton: props => (
            <TouchableOpacity
              style={{
                // bottom: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={props.onPress}>
              <View style={{width: 70, height: 70, borderRadius: 35}}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    // tintColor:'#fff'
                  }}
                  source={require('../assets/logo_tab.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="Home3"
        component={SwapCoins}
        listeners={{
          tabPress: e => {},
        }}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              style={[styles.image, {left: 20}]}
              source={require('../assets/purple_swap.png')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="book"
        component={AddressBook}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={styles.image}
              source={require('../assets/book.png')}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

let styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    // top: '15%',
  },
  labelStyle: {color: 'white', lineHeight: 28},
});

export default TabNavigator;
