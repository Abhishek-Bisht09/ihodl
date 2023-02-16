import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const ConfirmPassword = props => {
  // useEffect(() => {
  //   if(Data.user.access_token){
  //     props.navigation.reset({
  //       index: 0,
  //       routes: [{name: 'DrawerNavigator'}],
  //     });
  //   }
  // }, []);
  // let Data = useSelector(state => state.userReducer);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Image
          style={{height: 194, width: 194}}
          source={require('../assets/logo_cover.png')}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: 25,
            width: 300,
            textAlign: 'center',
            marginTop: '40%',
          }}>
          Create a free account
        </Text>

        <TouchableOpacity
          style={{top: '6%'}}
          onPress={() => props.navigation.navigate('SignUp')}>
          <ImageBackground
            style={{
              height: 63,
              width: 160,
              justifyContent: 'center',
            }}
            source={require('../assets/button.png')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#FFFFFF',
                alignSelf: 'center',
              }}>
              Create Account
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={{top: '9%', marginBottom: '15%'}}
          onPress={() => props.navigation.navigate('Login')}>
          <ImageBackground
            style={{height: 63, width: 160, justifyContent: 'center'}}
            source={require('../assets/button.png')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#FFFFFF',
                alignSelf: 'center',
              }}>
              Login
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131222',
  },
});

export default ConfirmPassword;
