import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  BackHandler,
  Alert
} from 'react-native';
import Profile from '../screens/profile';
import MyProfile from '../screens/my_profile';
import IdVerification from '../screens/id_verification';
import PhoneVerification from '../screens/phone_verification';
import TabNavigator from './tab_navigator';
import CustomDrawer from '../utils/CustomDrawer';
import SwapCoins from '../screens/swap_coins/swap_coins';
import Activity from '../screens/activity';
import ChangePassword2 from '../screens/swap_coins/change_password';
import AddressBook from '../screens/address_book/address_book';
import TransactionHistory from '../screens/transaction_history';
import Settings from '../screens/settings';
import ScheduleTransaction from '../screens/schedule_transaction';
import Pocket from '../screens/send_recieve';
import FAQs from '../screens/FAQs';
import Offers from '../screens/Offers';
import BuyCoins from '../screens/buy_coins';
import Dashboard from '../screens/dashboard';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/wallet';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

React.useEffect(() => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
}, []);

  return (
    <Drawer.Navigator
      initialRouteName="iHODL Pocket"
      drawerContent={props => <CustomDrawer {...props} />}
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -20},
      }}>
      <Drawer.Screen
        name="iHodlWallet"
        options={{
          title: 'iHodlWallet', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={TabNavigator}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          title: 'Profile', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={Profile}
      />

      <Drawer.Screen
        name="SwapCoins"
        options={{
          title: 'SwapCoins', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={SwapCoins}
      />

      <Drawer.Screen
        name="Activity"
        options={{
          title: 'Activity', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={Activity}
      />

      <Drawer.Screen
        name="ChangePassword"
        options={{
          title: 'Change Password', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={ChangePassword2}
      />

      <Drawer.Screen
        name="AddressBook"
        options={{
          title: 'Address Book', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        mn
        component={AddressBook}
      />

      <Drawer.Screen
        name="Transaction"
        options={{
          title: 'Transaction History', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        component={TransactionHistory}
      />

      <Drawer.Screen
        name="Settings"
        options={{
          title: 'Settings', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //     <Image style={{ height: 20, width: 20 }}
          //         source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={Settings}
      />
      <Drawer.Screen
        name="Send/Receive"
        options={{
          title: 'Send/Receive', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={Pocket}
      />
      <Drawer.Screen
        name="Transaction History"
        options={{
          title: 'Transaction History', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={TransactionHistory}
      />
      <Drawer.Screen
        name="Schedule Transaction"
        options={{
          title: 'Schedule Transaction', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={ScheduleTransaction}
      />
      <Drawer.Screen
        name="FAQs"
        options={{
          title: 'FAQs', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={FAQs}
      />
      <Drawer.Screen
        name="Offers"
        options={{
          title: 'Offers', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={Offers}
      />
      <Drawer.Screen
        name="BuyCoins"
        options={{
          title: 'BuyCoins', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={BuyCoins}
      />
      <Drawer.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard', //Set Header Title
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'white',
          // drawerIcon: ({ focused, size }) => (
          //   <Image style={{ height: 20, width: 20 }}
          //     source={require('../assets/settings_icon.png')} />
          // )
        }}
        component={Dashboard}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});

export default DrawerNavigator;
