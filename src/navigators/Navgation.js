import React, {Component, useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../src/screens/wallet';
import Login from '../../src/registration/login';
import SignUp from '../../src/registration/signup';
import ResetPassword from '../../src/registration/reset_password';
import Verification from '../../src/registration/verification';
import ConfirmPassword from '../../src/registration/confirm_newpassword';
import Verified from '../../src/registration/verified';
import SignUp2 from '../../src/registration/signup2';
import CreateAccount from '../../src/registration/create_account';
import TabNavigator from '../../src/navigators/tab_navigator';
// import Home from './src/registration/dashboard';
import BuyCoins from '../../src/screens/buy_coins';
import DrawerNavigator from '../../src/navigators/drawer_navigator';
import MyRefferal from '../../src/screens/my_refferal';
import SendRequestCoin from '../../src/screens/send_request_coin';
import SignInActivity from '../../src/screens/signin_activity';
import SwapCoins from '../../src/screens/swap_coins/swap_coins';
import Activity from '../../src/screens/activity';
import Settings from '../../src/screens/settings';
import TransactionHistory from '../../src/screens/transaction_history';
import ScheduleTransaction from '../../src/screens/schedule_transaction';
import EditProfile from '../../src/screens/edit_profile';
import SecurityVerification from '../../src/screens/security_verification';
import ChangePassword from '../../src/screens/change_password';
import ChangePassword2 from '../../src/screens/swap_coins/change_password';
import AddressBook from '../../src/screens/address_book/address_book';
import SendRec from '../../src/screens/send_recieve';
import FAQs from '../../src/screens/FAQs';
import Offers from '../../src/screens/Offers';
import OfferDetails from '../../src/screens/OfferDetails';
import {useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Navgation = () => {

  const Stack = createNativeStackNavigator();
  return (
    <>
      {/* {token == null ? ( */}
      <Stack.Navigator initialRouteName="CreateAccount">
        <Stack.Screen
          name="CreateAccount"
          options={{headerShown: false}}
          component={CreateAccount}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />

        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="SignUp2"
          options={{headerShown: false}}
          component={SignUp2}
        />
        <Stack.Screen
          name="Verification"
          options={{headerShown: false}}
          component={Verification}
        />
        <Stack.Screen
          name="ResetPassword"
          options={{headerShown: false}}
          component={ResetPassword}
        />
        <Stack.Screen
          name="ConfirmPassword"
          options={{headerShown: false}}
          component={ConfirmPassword}
        />
        <Stack.Screen
          name="Verified"
          options={{headerShown: false}}
          component={Verified}
        />
        {/* </Stack.Navigator> */}
        {/* //  ) : (  */}
        {/* //  <Stack.Navigator initialRouteName="DrawerNavigator">  */}
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />

        <Stack.Screen
          name="TabNavigator"
          options={{headerShown: false}}
          component={TabNavigator}
        />
        <Stack.Screen
          name="DrawerNavigator"
          options={{headerShown: false}}
          component={DrawerNavigator}
        />

        {/* profile */}

        <Stack.Screen
          name="EditProfile"
          options={{headerShown: false}}
          component={EditProfile}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{headerShown: false}}
          component={ChangePassword}
        />
        <Stack.Screen
          name="SignInActivity"
          options={{headerShown: false}}
          component={SignInActivity}
        />
        <Stack.Screen
          name="SecurityVerification"
          options={{headerShown: false}}
          component={SecurityVerification}
        />

        {/* swap coins */}

        <Stack.Screen
          name="SwapCoins"
          options={{headerShown: false}}
          component={SwapCoins}
        />

        <Stack.Screen
          name="ChangePassword2"
          options={{headerShown: false}}
          component={ChangePassword2}
        />
        <Stack.Screen
          name="Activity"
          options={{headerShown: false}}
          component={Activity}
        />

        {/* address book */}

        <Stack.Screen
          name="addressbook"
          options={{headerShown: false}}
          component={AddressBook}
        />

        {/* transaction history */}

        <Stack.Screen
          name="TransactionHistory"
          options={{headerShown: false}}
          component={TransactionHistory}
        />

        {/* others */}

        <Stack.Screen
          name="Settings"
          options={{headerShown: false}}
          component={Settings}
        />

        {/* <Stack.Screen
          name="ScheduleTransaction"
          options={{headerShown: false}}
          component={ScheduleTransaction}
        /> */}
        <Stack.Screen
          name="MyRefferal"
          options={{headerShown: false}}
          component={MyRefferal}
        />
        <Stack.Screen
          name="SendRequestCoin"
          options={{headerShown: false}}
          component={SendRequestCoin}
        />
        {/* Made by Manik */}

        <Stack.Screen
          name="Send/Receive"
          options={{headerShown: false}}
          component={SendRec}
        />

        <Stack.Screen
          name="Transaction History"
          options={{headerShown: false}}
          component={TransactionHistory}
        />

        <Stack.Screen
          name="Schedule Transaction"
          options={{headerShown: false}}
          component={ScheduleTransaction}
        />

        <Stack.Screen
          name="FAQs"
          options={{headerShown: false}}
          component={FAQs}
        />

        <Stack.Screen
          name="Offers"
          options={{headerShown: false}}
          component={Offers}
        />

        <Stack.Screen
          name="OfferDetails"
          options={{headerShown: false}}
          component={OfferDetails}
        />

        <Stack.Screen
          name="BuyCoins"
          options={{headerShown: false}}
          component={BuyCoins}
        />

        {/* ends here */}
      </Stack.Navigator>
       {/* )}  */}
    </>
  );
};

export default Navgation;
