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
import {urls} from '../../utils/api';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../api/services';

const ChangePassword2 = props => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [Password1, setPassword1] = useState('');
  const [Password2, setPassword2] = useState('');
  const [errorpassword1, seterrorpassword1] = useState('');
  const [errorpassword2, seterrorpassword2] = useState('');
  const [PasswordBoolean1, setPasswordBoolean1] = useState(true);
  const [PasswordBoolean2, setPasswordBoolean2] = useState(true);
  const [EyeBoolean1, setEyeBoolean1] = useState(
    require('../../assets/masked_eye.png'),
  );
  const [EyeBoolean2, setEyeBoolean2] = useState(
    require('../../assets/masked_eye.png'),
  );
  const [Loader, setLoader] = useState(false);

  // const onChangeFirstName = (e) => {
  //   setFirstName(e);
  // }

  // const onChangeLastName = (e) => {
  //   setLastName(e);
  // }

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
      setEyeBoolean1(require('../../assets/eye.png'));
    } else {
      setPasswordBoolean1(true);
      setEyeBoolean1(require('../../assets/masked_eye.png'));
    }
  };

  const onChangePasswordBoolean2 = () => {
    if (PasswordBoolean2 == true) {
      setPasswordBoolean2(false);
      setEyeBoolean2(require('../../assets/eye.png'));
    } else {
      setPasswordBoolean2(true);
      setEyeBoolean2(require('../../assets/masked_eye.png'));
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
    if (Password1 === '' || Password1 === null || Password1 === undefined) {
      seterrorpassword1('Password is Required');
      flag = true;
    } else if (
      Password1 !== '' ||
      Password1 !== null ||
      Password1 !== undefined
    ) {
      if (Password1.length < 7 || Password1.length > 11) {
        seterrorpassword1(
          'Password should be min. of 8 digits and maximum of 10 digits.',
        );
        flag = true;
      } else {
        seterrorpassword1('');
      }
    }
    if (Password2 === '' || Password2 === null || Password2 === undefined) {
      seterrorpassword2('Confirm Password is Required');
      flag = true;
    } else if (
      Password2 !== '' ||
      Password2 !== null ||
      Password2 !== undefined
    ) {
      if (Password2.length < 7 || Password2.length > 11) {
        seterrorpassword2(
          'Confirm Password should be min. of 8 digits and maximum of 10 digits.',
        );
        flag = true;
      } else {
        seterrorpassword2('');
      }
    }
    if (Email === '' || Email === null || Email === undefined) {
      seterroremail('Email is Required');
      flag = true;
    } else if (Email !== '' || Email !== null || Email !== undefined) {
      if (!validateEmail(Email)) {
        seterroremail('Please enter valid email id');

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
      API.post(urls.BASE_URL + 'sign-up', body)
        .then(function (response) {
          if (response.data.success == true) {
            props.navigation.push('Verification', {email: Email});
          } else {
            Toast.show({
              type: 'error',
              text2: response.data.message,
            });
          }
          setLoader(false);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: 'Password dont match.',
          });
          setLoader(false);
        });
    }
  };

  return (
    <>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={{
            backgroundColor: '#131222',
            height: 360,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View style={{height: 100, marginTop: '10%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{top: '3%', left: 10, width: '25%'}}
              onPress={() => props.navigation.push('DrawerNavigator')}>
              <Image
                style={{height: 15, width: 15}}
                source={require('../../assets/back_button.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
                width: '75%',
              }}>
              Change password
            </Text>
          </View>

          <Image
            style={{
              height: 194,
              width: 194,
              alignSelf: 'center',
              marginBottom: '12%',
            }}
            source={require('../../assets/logo_cover.png')}
          />
        </View>

        <View style={{backgroundColor: '#15172C'}}>
          <ImageBackground
            style={{width: '100%', alignItems: 'center'}}
            source={require('../../assets/tansparent_lines.png')}>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={styles.modalView}>
              <TextInput
                style={[styles.input]}
                onChangeText={onChangeEmail}
                value={Email}
                placeholder="Current Password"
                autoCapitalize="none"
                placeholderTextColor="white"
              />

              <Text style={{color: '#B1003F', bottom: '5%', left: '5%'}}>
                {erroremail}
              </Text>

              <TextInput
                style={[styles.input, {bottom: '5%'}]}
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
                    bottom: 40,
                    alignSelf: 'flex-end',
                    marginRight: '4%',
                  }}
                  source={EyeBoolean1}
                />
              </TouchableOpacity>
              <Text style={{color: '#B1003F', bottom: '15%', left: '5%'}}>
                {errorpassword1}
              </Text>

              <TextInput
                style={[styles.input, {bottom: '16%'}]}
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
                    bottom: 60,
                    alignSelf: 'flex-end',
                    marginRight: '4%',
                  }}
                  source={EyeBoolean2}
                />
              </TouchableOpacity>
              <Text style={{color: '#B1003F', bottom: '25%', left: '5%'}}>
                {errorpassword2}
              </Text>

              <TouchableOpacity
                style={{marginTop: '10%', alignSelf: 'center'}}
                onPress={onSubmitForm}>
                <ImageBackground
                  style={{height: 60, width: 155, justifyContent: 'center'}}
                  source={require('../../assets/button.png')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: '#FFFFFF',
                      alignSelf: 'center',
                    }}>
                    Set Password
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
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
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#FFFFFF',
    color: '#F8F8F8',
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
  modalView: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '58%',
    // width: '106%',
    bottom: '12%',
    marginTop: '18%',
    width: '90%',
  },
});

export default ChangePassword2;
