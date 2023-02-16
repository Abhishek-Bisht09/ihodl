import React, {Component, useState, useEffect, useRef} from 'react';
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
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';

const ConfirmPassword = props => {
  const [Password1, setPassword1] = useState('');
  const [errorpassword1, seterrorpassword1] = useState('');
  const [Password2, setPassword2] = useState('');
  const [errorpassword2, seterrorpassword2] = useState('');
  const [Email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [errorOTP, seterrorOTP] = useState('');
  const [PasswordBoolean1, setPasswordBoolean1] = useState(true);
  const [PasswordBoolean2, setPasswordBoolean2] = useState(true);
  const [EyeBoolean1, setEyeBoolean1] = useState(
    require('../assets/masked_eye.png'),
  );
  const [EyeBoolean2, setEyeBoolean2] = useState(
    require('../assets/masked_eye.png'),
  );

  const onChangePassword1 = e => {
    setPassword1(e);
  };

  const onChangePassword2 = e => {
    setPassword2(e);
  };

  const onChangeOTP = e => {
    setOTP(e);
  };

  const onChangePasswordBoolean1 = () => {
    if (PasswordBoolean1 == true) {
      setPasswordBoolean1(false);
      setEyeBoolean1(require('../assets/eye.png'));
    } else {
      setPasswordBoolean1(true);
      setEyeBoolean1(require('../assets/masked_eye.png'));
    }
  };

  const onChangePasswordBoolean2 = () => {
    if (PasswordBoolean2 == true) {
      setPasswordBoolean2(false);
      setEyeBoolean2(require('../assets/eye.png'));
    } else {
      setPasswordBoolean2(true);
      setEyeBoolean2(require('../assets/masked_eye.png'));
    }
  };

  const validate = () => {
    let flag = false;
    const pattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$',
    );
    if (Password1 === '' || Password1 === null || Password1 === undefined) {
      seterrorpassword1("Password can't be empty");
      flag = true;
    } else if (
      Password1 !== '' ||
      Password1 !== null ||
      Password1 !== undefined
    ) {
      if (Password1.length < 7) {
        seterrorpassword1(
          'Password must be consist of one uppercase, one lowercase, one number and minimum length at least 8 characters.',
        );
        flag = true;
      } else if (!pattern.test(Password1)) {
        seterrorpassword1(
          'Password must be consist of one uppercase, one lowercase, one number and minimum length at least 8 characters.',
        );
        flag = true;
      } else {
        seterrorpassword1('');
      }
    }

    if (Password2 === '' || Password2 === null || Password2 === undefined) {
      seterrorpassword2("Confirm password can't be empty");
      flag = true;
    } else if (
      Password2 !== '' ||
      Password2 !== null ||
      Password2 !== undefined
    ) {
      if (Password1 != Password2) {
        seterrorpassword2('Password must match');
        flag = true;
      } else {
        seterrorpassword2('');
      }
    }

    if (OTP === '' || OTP === null || OTP === undefined) {
      seterrorOTP("Verification code can't be empty");
      flag = true;
    } else if (OTP !== '' || OTP !== null || OTP !== undefined) {
      seterrorOTP('');
    }

    return flag;
  };

  const onSubmitForm = () => {
    if (!validate()) {
      axios
        .post(APP_URLS.RESET_PASSWORD, {
          code: OTP,
          email: props.route.params.email,
          password: Password1,
          password_confirmation: Password2,
        })
        .then(function (response) {
          if (response.data.success == true) {
            props.navigation.push('Verified');
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
            text2: error,
          });
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
            Reset Password
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View style={[styles.container]}>
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
            <TextInput
              style={[styles.input, {marginTop: '9%'}]}
              placeholder="Enter Code"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              maxLength={6}
              onChangeText={onChangeOTP}
            />
            <Text style={{color: '#B1003F', bottom: 10, marginLeft: '5%'}}>
              {errorOTP}
            </Text>

            <TextInput
              style={[styles.input, {bottom: '8%'}]}
              onChangeText={onChangePassword1}
              value={Password1}
              placeholder="New Password"
              placeholderTextColor="#808080"
              secureTextEntry={PasswordBoolean1}
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
              onPress={onChangePasswordBoolean1}>
              <Image style={{height: 13, width: 21.8}} source={EyeBoolean1} />
            </TouchableOpacity>
            <Text style={{color: '#B1003F', bottom: 67, marginLeft: '5%'}}>
              {errorpassword1}
            </Text>
            <TextInput
              style={[styles.input, {bottom: '20%'}]}
              onChangeText={onChangePassword2}
              value={Password2}
              placeholder="Confirm Password"
              placeholderTextColor="#808080"
              secureTextEntry={PasswordBoolean2}
            />
            <TouchableOpacity
              style={{
                bottom: 140,
                alignSelf: 'flex-end',
                marginRight: '7%',
                //  backgroundColor:'red',
                height: 20,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onChangePasswordBoolean2}>
              <Image style={{height: 13, width: 21.8}} source={EyeBoolean2} />
            </TouchableOpacity>
            <Text style={{color: '#B1003F', bottom: '27%', marginLeft: '5%'}}>
              {errorpassword2}
            </Text>

            <Text
              style={{
                color: '#808080',
                fontWeight: '400',
                fontSize: 10,
                width: '45%',
                alignSelf: 'flex-end',
                textAlign: 'right',
                marginRight: '3%',
                bottom: '22%',
              }}>
              At least 8 characters, with uppercase and lowercase letters.
            </Text>

            <TouchableOpacity
              style={{alignSelf: 'center', bottom: '15%'}}
              onPress={onSubmitForm}>
              <ImageBackground
                style={{height: 65, width: 170, justifyContent: 'center'}}
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
});

export default ConfirmPassword;
