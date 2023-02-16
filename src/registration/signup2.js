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
} from 'react-native';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';

const SignUp = props => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [errorfirstname, seterrorfirstname] = useState('');
  const [errorlastname, seterrorlastname] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [Password1, setPassword1] = useState('');
  const [Password2, setPassword2] = useState('');
  const [errorpassword1, seterrorpassword1] = useState('');
  const [errorpassword2, seterrorpassword2] = useState('');
  const [PasswordBoolean1, setPasswordBoolean1] = useState(true);
  const [PasswordBoolean2, setPasswordBoolean2] = useState(true);
  const [EyeBoolean1, setEyeBoolean1] = useState(
    require('../assets/masked_eye.png'),
  );
  const [EyeBoolean2, setEyeBoolean2] = useState(
    require('../assets/masked_eye.png'),
  );
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setFirstName(props.route.params.f_name);
    setLastName(props.route.params.l_name);
  }, []);

  const onChangeEmail = e => {
    setEmail(e);
  };

  const onChangePassword1 = e => {
    setPassword1(e);
  };

  const onChangePassword2 = e => {
    setPassword2(e);
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

    const pattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$',
    );

    if (Password1 === '' || Password1 === null || Password1 === undefined) {
      seterrorpassword1('Password field can not be empty');
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
      seterrorpassword2('Confirm password field can not be empty');
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
    } else {
      seterrorpassword2('');
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
      setLoader(true);
      let body = {
        first_name: FirstName,
        last_name: LastName,
        email: Email,
        password: Password1,
        password_confirmation: Password2,
      };
      axios
        .post(APP_URLS.SIGN_UP, body, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then(res => {
          setLoader(false);
          const resp = res.data;

          if (resp.success === true) {
            props.navigation.push('Verification', {email: Email});
          } else {
            Toast.show({
              type: 'error',
              text2: resp.message,
            });
          }
        })
        .catch(function (error) {
          const resp = error.response;

          setLoader(false);
          if (resp) {
            let error_message = '';
            if (resp.data.errors !== undefined) {
              {
                Object.keys(resp.data.errors).map(
                  (error, index) =>
                    (error_message = resp.data.errors[error][0]),
                );
              }
            } else if (resp.data.data.error !== undefined) {
              error_message = resp.data.data.error;
            } else {
              error_message = resp.data.error;
            }
            Toast.show({
              type: 'error',
              text2: error_message,
            });
          }
        });
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#131222',
          height: responsiveScreenHeight(7),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
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
            Sign up account
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
            <TextInput
              style={[styles.input, {marginTop: '9%'}]}
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
                bottom: '11%',
                alignSelf: 'flex-end',
                marginRight: '8%',
              }}
              source={require('../assets/email.png')}
            />
            <Text style={{color: '#B1003F', bottom: '5%', left: '5%'}}>
              {erroremail}
            </Text>

            <TextInput
              style={[styles.input, {bottom: '10%'}]}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={onChangePassword1}
              value={Password1}
              secureTextEntry={PasswordBoolean1}
            />
            <TouchableOpacity onPress={onChangePasswordBoolean1}>
              <Image
                style={{
                  height: 13,
                  width: 21.8,
                  bottom: 80,
                  alignSelf: 'flex-end',
                  marginRight: '8%',
                }}
                source={EyeBoolean1}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#B1003F',
                bottom: '15%',
                left: '5%',
                width: '90%',
              }}>
              {errorpassword1}
            </Text>

            <TextInput
              style={[styles.input, {bottom: '20%'}]}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              onChangeText={onChangePassword2}
              value={Password2}
              secureTextEntry={PasswordBoolean2}
            />
            <TouchableOpacity onPress={onChangePasswordBoolean2}>
              <Image
                style={{
                  height: 13,
                  width: 21.8,
                  bottom: 120,
                  alignSelf: 'flex-end',
                  marginRight: '8%',
                }}
                source={EyeBoolean2}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#B1003F',
                bottom: '25%',
                left: '5%',
                width: '90%',
              }}>
              {errorpassword2}
            </Text>

            <TouchableOpacity
              style={{bottom: '12%', alignSelf: 'center'}}
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
                  Sign up
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
    backgroundColor: '#A7E8FF',
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default SignUp;
