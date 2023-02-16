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
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {urls} from '../utils/api';
import API from '../api/services';
import {APP_URLS} from '../api/urls';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';

const ChangePassword = props => {
  const [first_name, setfirst_name] = useState('');
  const [emailStored, emailStored_] = useState('');

  const [password, setpassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');
  const [new_password, setnew_password] = useState('');
  const [showError, showError_] = useState(false);
  const [PasswordBoolean1, setPasswordBoolean1] = useState(true);
  const [PasswordBoolean2, setPasswordBoolean2] = useState(true);
  const [PasswordBoolean3, setPasswordBoolean3] = useState(true);
  const [errorpassword, seterrorpassword] = useState('');
  const [errorpassword_confirmation, seterrorpassword_confirmation] =
    useState('');
  const [errornew_password, seterrornew_password] = useState('');
  let Data = useSelector(state => state.userReducer);

  const setNewPassword = e => {
    if (e.length >= 1) {
      showError_(true);
      seterrornew_password(
        'Password must be consist of one uppercase, one lowercase, one number and minimum length at least 8 characters.',
      );
    } else {
      seterrornew_password('');
    }
    setnew_password(e);
  };

  const [EyeBoolean1, setEyeBoolean1] = useState(
    require('../assets/masked_eye.png'),
  );
  const [EyeBoolean2, setEyeBoolean2] = useState(
    require('../assets/masked_eye.png'),
  );
  const [EyeBoolean3, setEyeBoolean3] = useState(
    require('../assets/masked_eye.png'),
  );
  useEffect(() => {
    func();
  }, []);

  const func = async () => {
    emailStored_(Data.user.user_info.email);
    setfirst_name(Data.user.user_info.first_name);
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

  const onChangePasswordBoolean3 = () => {
    if (PasswordBoolean3 == true) {
      setPasswordBoolean3(false);
      setEyeBoolean3(require('../assets/eye.png'));
    } else {
      setPasswordBoolean3(true);
      setEyeBoolean3(require('../assets/masked_eye.png'));
    }
  };

  const validate = () => {
    let flag = false;

    if (password === '' || password === null || password === undefined) {
      showError_(true);
      seterrorpassword('Current Password is Required');
      flag = true;
    } else if (password !== '' || password !== null || password !== undefined) {
      if (password.length < 7 || password.length > 11) {
        showError_(true);
        seterrorpassword(
          'Current Password should be min. of 8 digits and maximum of 10 digits.',
        );
        flag = true;
      } else {
        showError_(false);
        seterrorpassword('');
      }
    }
    if (
      password_confirmation === '' ||
      password_confirmation === null ||
      password_confirmation === undefined
    ) {
      showError_(true);
      seterrorpassword_confirmation('Confirm Password is Required');
      flag = true;
    } else if (
      password_confirmation !== '' ||
      password_confirmation !== null ||
      password_confirmation !== undefined
    ) {
      if (
        password_confirmation.length < 7 ||
        password_confirmation.length > 11
      ) {
        showError_(true);
        seterrorpassword_confirmation(
          'Confirm Password should be min. of 8 digits and maximum of 10 digits.',
        );
        flag = true;
      } else {
        showError_(false);
        seterrorpassword_confirmation('');
      }
    }

    if (
      new_password === '' ||
      new_password === null ||
      new_password === undefined
    ) {
      seterrornew_password('New Password is Required');
      flag = true;
    } else if (
      new_password !== '' ||
      new_password !== null ||
      new_password !== undefined
    ) {
      if (new_password.length < 7 || new_password.length > 11) {
        showError_(true);
        seterrornew_password(
          'New Password should be min. of 8 digits and maximum of 10 digits.',
        );
        flag = true;
      } else {
        showError_(false);
        seterrornew_password('');
      }
    }
    if (password_confirmation !== new_password) {
      showError_(true);
      flag = true;
      seterrorpassword_confirmation('Password Must Match.');
    }
    return flag;
  };

  const onSubmitForm = async () => {
    if (!validate()) {
      let formData = {
        password: new_password,
        password_confirmation: password_confirmation,
        current_password: password,
      };

      API.post(APP_URLS.CHANGE_PASSWORD, formData)
        .then(function (response) {
          if (response.data.success == true) {
            Toast.show({
              type: 'success',
              text2: response.data.message,
            });
            // Alert.alert('Success', response.data.message);
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
            Change Password
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={[
            styles.container,
            {flexDirection: 'column', justifyContent: 'space-between'},
          ]}>
          <View
            style={{
              backgroundColor: '#131222',
              height: 250,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // bottom: '14%',
              }}>
              <ImageBackground
                style={{
                  height: 113,
                  width: 115,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../assets/round_icon.png')}>
                <Image
                  style={{height: 31, width: 27}}
                  source={require('../assets/ed_prof.png')}
                />
              </ImageBackground>

              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 25,
                  marginTop: '2%',
                }}>
                Welcome, {first_name} !
              </Text>
              <Text style={{color: '#808080', fontWeight: '500', fontSize: 15}}>
                {emailStored}
              </Text>
            </View>
          </View>
          <ImageBackground
            style={{width: '100%', top: 40}}
            source={require('../assets/tansparent_lines.png')}>
            <View style={{bottom: '2%', height: 460}}>
              <Text style={styles.text}>Current Password</Text>
              <TextInput
                style={[styles.input]}
                onChangeText={setpassword}
                value={password}
                placeholder="Current Password"
                placeholderTextColor="white"
                secureTextEntry={PasswordBoolean1}
              />
              <TouchableOpacity onPress={onChangePasswordBoolean1}>
                <Image
                  style={{
                    height: 13,
                    width: 21.8,
                    bottom: 27,
                    alignSelf: 'flex-end',
                    marginRight: '8%',
                  }}
                  source={EyeBoolean1}
                />
              </TouchableOpacity>
              {showError == true ? (
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 13,
                    color: '#DC143C',
                    // textAlign: 'center',
                    marginLeft: '8%',
                    width: '100%',
                    marginTop: -8,
                  }}>
                  {errorpassword}
                </Text>
              ) : (
                ''
              )}

              <Text style={[styles.text]}>New Password</Text>
              <TextInput
                style={[styles.input]}
                onChangeText={setNewPassword}
                value={new_password}
                placeholder="New Password"
                placeholderTextColor="white"
                secureTextEntry={PasswordBoolean3}
              />
              <TouchableOpacity onPress={onChangePasswordBoolean3}>
                <Image
                  style={{
                    height: 13,
                    width: 21.8,
                    bottom: 28,
                    alignSelf: 'flex-end',
                    marginRight: '8%',
                  }}
                  source={EyeBoolean3}
                />
              </TouchableOpacity>
              {showError == true ? (
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 13,
                    color: '#DC143C',
                    // width:'30%',
                    marginLeft: '8%',
                    width: '91%',
                    marginTop: -8,
                  }}>
                  {errornew_password}
                </Text>
              ) : (
                ''
              )}

              <Text style={styles.text}>Confirm Password</Text>
              <TextInput
                style={[styles.input]}
                onChangeText={setpassword_confirmation}
                value={password_confirmation}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                secureTextEntry={PasswordBoolean2}
              />

              <TouchableOpacity onPress={onChangePasswordBoolean2}>
                <Image
                  style={{
                    height: 13,
                    width: 21.8,
                    bottom: 28,
                    alignSelf: 'flex-end',
                    marginRight: '8%',
                  }}
                  source={EyeBoolean2}
                />
              </TouchableOpacity>
              {showError == true ? (
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 13,
                    color: '#DC143C',
                    // textAlign: 'center',
                    marginLeft: '8%',
                    width: '100%',
                    marginTop: -8,
                  }}>
                  {errorpassword_confirmation}
                </Text>
              ) : (
                ''
              )}

              <TouchableOpacity
                style={{alignSelf: 'center', marginTop: '10%'}}
                onPress={onSubmitForm}>
                <ImageBackground
                  style={{
                    height: 60,
                    width: 155,
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
                    Update
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '85%',
    borderBottomWidth: 1,
    padding: 4,
    borderColor: '#191B2E',
    color: '#F8F8F8',
    alignSelf: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 12,
    color: '#808080',
    marginLeft: '8%',
    marginTop: '2%',
  },
  container: {
    flex: 1,
    backgroundColor: '#15172C',
  },
});

export default ChangePassword;
