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
import {urls} from '../utils/api';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const SignUp = props => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [errorfirstname, seterrorfirstname] = useState('');
  const [errorlastname, seterrorlastname] = useState('');

  const [Loader, setLoader] = useState(false);

  const onChangeFirstName = e => {
    setFirstName(e);
  };

  const onChangeLastName = e => {
    setLastName(e);
  };
  const validate = () => {
    let flag = false;

    if (FirstName === '' || FirstName === null || FirstName === undefined) {
      seterrorfirstname('First name can not be empty');
      flag = true;
    } else if (FirstName.length > 20) {
      seterrorfirstname(
        'The First Name field may not be greater than 20 characters',
      );
      flag = true;
    } else {
      seterrorfirstname('');
    }
    if (LastName === '' || LastName === null || LastName === undefined) {
      seterrorlastname('Last name can not be empty');
      flag = true;
    } else if (LastName.length > 20) {
      seterrorlastname(
        'The Last Name field may not be greater than 20 characters',
      );
      flag = true;
    } else {
      seterrorlastname('');
    }

    return flag;
  };

  const onSubmitForm = () => {
    if (!validate()) {
      props.navigation.push('SignUp2', {f_name: FirstName, l_name: LastName});
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
          // backgroundColor:'red'
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
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={[
            styles.container,
            {flexDirection: 'column', justifyContent: 'space-between'},
          ]}>
          {/* <Spinner
          visible={Loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> */}

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
              onChangeText={onChangeFirstName}
              value={FirstName}
              placeholder="First Name"
              placeholderTextColor="white"
            />
            <Image
              style={{
                height: 13,
                width: 13,
                bottom: '15%',
                alignSelf: 'flex-end',
                marginRight: '8%',
              }}
              source={require('../assets/user.png')}
            />
            <Text style={{color: '#B1003F', bottom: '7%', left: '5%'}}>
              {errorfirstname}
            </Text>

            <TextInput
              style={[styles.input, {bottom: '14%'}]}
              onChangeText={onChangeLastName}
              value={LastName}
              placeholder="Last Name"
              placeholderTextColor="white"
            />
            <Image
              style={{
                height: 13,
                width: 13,
                bottom: '29%',
                alignSelf: 'flex-end',
                marginRight: '8%',
              }}
              source={require('../assets/user.png')}
            />
            <Text style={{color: '#B1003F', bottom: '21%', left: '5%'}}>
              {errorlastname}
            </Text>

            <TouchableOpacity
              style={{alignSelf: 'center'}}
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
