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
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';

const ResetPassword = props => {
  const [Email, setEmail] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [Loader, setLoader] = useState(false);

  const onChangeEmail = e => {
    setEmail(e);
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
      setLoader(true);
      let body = {
        email: Email,
        is_new: 'true',
      };
      axios
        .post(APP_URLS.FORGOT_PASSWORD, body, {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        })
        .then(function (response) {
          props.navigation.push('ConfirmPassword', {email: Email});
          setLoader(false);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: 'This email does not exist',
          });
          setLoader(false);
        });
    }
  };

  return (
    <>
      <View
        style={{
          height: responsiveScreenHeight(7),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 5,
          backgroundColor: '#131222',
        }}>
        <View>
          <TouchableOpacity
            style={{top: 6, left: 18}}
            onPress={() => props.navigation.goBack()}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/back_button.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: '#fff',
              // textAlign: 'center',
              fontSize: 20,
              fontWeight: '700',
              top: 5,
            }}>
            Reset Password{'   '}
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{backgroundColor: '#15172C'}}>
        <View
          style={[
            styles.container,
            {flexDirection: 'column', justifyContent: 'space-between'},
          ]}>
          <Spinner
            visible={Loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

          <Image
            style={{
              height: 194,
              width: 194,
              alignSelf: 'center',
              marginTop: '4%',
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
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '600',
                marginTop: '8%',
                fontSize: 18,
                marginLeft: '4%',
              }}>
              Enter email address
            </Text>

            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '400',
                marginTop: '2%',
                fontSize: 12,
                width: '70%',
                marginLeft: '4%',
              }}>
              Enter the email address with your account and we'll send an email
              with confirmation reset your password.
            </Text>
            <TextInput
              style={[styles.input, {marginTop: '6%'}]}
              onChangeText={onChangeEmail}
              value={Email}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="white"
            />
            <Image
              style={{
                height: 11,
                width: 15,
                bottom: 42,
                alignSelf: 'flex-end',
                marginRight: '8%',
              }}
              source={require('../assets/email.png')}
            />
            <Text style={{color: '#B1003F', bottom: 20, marginLeft: '5%'}}>
              {erroremail}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: '6%',
                height: 65,
                width: 170,
                alignSelf: 'center',
              }}
              onPress={onSubmitForm}>
              <ImageBackground
                style={{height: 60, width: 155, justifyContent: 'center'}}
                source={require('../assets/button.png')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  Continue
                </Text>
              </ImageBackground>
            </TouchableOpacity>
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
  image: {
    flex: 1,
    height: '105%',
  },
  linearGradient: {
    height: 54,
    padding: 10,
    borderRadius: 40,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ResetPassword;
