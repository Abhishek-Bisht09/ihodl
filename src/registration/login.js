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
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientText from '../utils/gradientTxt';
import {useSelector, useDispatch} from 'react-redux';
import {addUser} from '../redux/actions/user_actions';
import API from '../api/services';
import {err} from 'react-native-svg/lib/typescript/xml';
import {APP_URLS} from '../api/urls';

const Login = props => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorpassword, seterrorpassword] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [PasswordBoolean, setPasswordBoolean] = useState(true);
  const [EyeBoolean, setEyeBoolean] = useState(
    require('../assets/masked_eye.png'),
  );
  // const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const onChangeEmail = e => {
    setEmail(e);
  };

  const onChangePassword = e => {
    setPassword(e);
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@access_token', value.access_token);
      await AsyncStorage.setItem('@first_name', value.user_info.first_name);
      await AsyncStorage.setItem('@last_name', value.user_info.last_name);
      await AsyncStorage.setItem('@email', value.user_info.email);
    } catch (e) {
      // saving error
    }
  };

  const onChangePasswordBoolean = () => {
    if (PasswordBoolean == true) {
      setPasswordBoolean(false);
      setEyeBoolean(require('../assets/eye.png'));
    } else {
      setPasswordBoolean(true);
      setEyeBoolean(require('../assets/masked_eye.png'));
    }
  };

  const validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };

  const validate = () => {
    let flag = false;

    if (Password === '' || Password === null || Password === undefined) {
      seterrorpassword('Password field can not be empty');
      flag = true;
    } else {
      seterrorpassword('');
    }

    if (Email === '' || Email === null || Email === undefined) {
      seterroremail('Email field can not be empty');
      flag = true;
    } else if (Email !== '' || Email !== null || Email !== undefined) {
      if (!validateEmail(Email)) {
        seterroremail('Invalid email address');

        flag = true;
      } else {
        seterroremail('');
      }
    }
    return flag;
  };

  const onSubmitForm = () => {
    if (!validate()) {
      // setLoader(true);

      API.post(APP_URLS.LOGIN, {
        email: Email,
        password: Password,
      })
        .then(function (response) {
          // setLoader(false);
          let obj = response.data.data;
          if (response.data.success == true) {
            storeData(response.data.data);
            props.navigation.push('DrawerNavigator');
            dispatch(addUser(obj));
          } else {
            Toast.show({
              type: 'error',
              text2: response.data.message,
            });
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: 'Please enter correct credentials.',
          });
        });
    }
  };

  return (
    <>
      <View style={{backgroundColor: '#131222'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
            fontWeight: '600',
            marginTop: '3%',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Log into your account
        </Text>
      </View>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={[
            styles.container,
            {flexDirection: 'column', justifyContent: 'space-between'},
          ]}>
          <Image
            style={{
              height: 195,
              width: 195,
              alignSelf: 'center',
              marginTop: '22%',
              marginBottom: '8%',
            }}
            source={require('../assets/logo_cover.png')}
          />

          <View
            style={{
              backgroundColor: '#15172C',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <TextInput
              style={[styles.input, {marginTop: '10%'}]}
              onChangeText={onChangeEmail}
              value={Email}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="white"
            />
            <Image
              style={{
                height: 12,
                width: 17,
                bottom: 42,
                alignSelf: 'flex-end',
                marginRight: '7.5%',
              }}
              source={require('../assets/email.png')}
            />
            <Text style={{color: '#B1003F', bottom: 20, marginLeft: '5%'}}>
              {erroremail}
            </Text>

            <TextInput
              style={[styles.input, {bottom: 40}]}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={onChangePassword}
              value={Password}
              secureTextEntry={PasswordBoolean}
            />
            <TouchableOpacity
              style={{
                bottom: 84,
                alignSelf: 'flex-end',
                marginRight: '7%',
                //  backgroundColor:'red',
                height: 20,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onChangePasswordBoolean}>
              <Image style={{height: 13, width: 21.8}} source={EyeBoolean} />
            </TouchableOpacity>
            <Text style={{color: '#B1003F', bottom: 67, marginLeft: '5%'}}>
              {errorpassword}
            </Text>

            <TouchableOpacity
              style={{alignSelf: 'flex-end', bottom: 85, marginRight: '5%'}}
              onPress={() => props.navigation.push('ResetPassword')}>
              <GradientText colors={['#50AEFD', '#7F4EFC']}>
                Forget Password?
              </GradientText>
            </TouchableOpacity>

            <View style={{bottom: '5%'}}>
              <TouchableOpacity
                onPress={onSubmitForm}
                style={{height: 55, width: 160, alignSelf: 'center'}}>
                <ImageBackground
                  style={{
                    height: 63,
                    width: 160,
                    alignSelf: 'center',
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
                    Sign in
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={{alignSelf: 'center', marginTop: '6%'}}
                onPress={() => props.navigation.navigate('SignUp')}>
                <GradientText
                  colors={['#50AEFD', '#7F4EFC']}
                  style={styles.text}>
                  Create new account !
                </GradientText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Toast />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131222',
  },
  input: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#191B2E',
    color: '#F8F8F8',
    width: '85%',
  },
  button: {
    height: 54,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 40,
    width: '90%',
  },
  image: {
    // flex: 1,
    height: '105%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
  },
});

export default Login;
