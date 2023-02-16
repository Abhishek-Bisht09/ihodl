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
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';

const Verification = props => {
  const [Otp1, setOtp1] = useState('');
  const [Otp2, setOtp2] = useState('');
  const [Otp3, setOtp3] = useState('');
  const [Otp4, setOtp4] = useState('');
  const [Otp5, setOtp5] = useState('');
  const [Otp6, setOtp6] = useState('');

  const otp1Ref = useRef();
  const otp2Ref = useRef();
  const otp3Ref = useRef();
  const otp4Ref = useRef();
  const otp5Ref = useRef();
  const otp6Ref = useRef();

  const onChangeOtp1 = e => {
    setOtp1(e);
  };

  const onChangeOtp2 = e => {
    setOtp2(e);
  };

  const onChangeOtp3 = e => {
    setOtp3(e);
  };

  const onChangeOtp4 = e => {
    setOtp4(e);
  };

  const onChangeOtp5 = e => {
    setOtp5(e);
  };

  const onSubmitForm = () => {
    let code_str = Otp1 + Otp2 + Otp3 + Otp4 + Otp5 + Otp6;

    axios
      .post(APP_URLS.VERIFICATION, {
        email: props.route.params.email,
        access_code: code_str,
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
        const resp = error.response;
        if (resp) {
          let error_message = '';
          if (resp.data.errors !== undefined) {
            {
              Object.keys(resp.data.errors).map(
                (error, index) => (error_message = resp.data.errors[error][0]),
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
            Verification Code
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{backgroundColor: '#15172C'}}>
        <View style={[styles.container, {flexDirection: 'column'}]}>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                alignSelf: 'center',
                marginTop: '15%',
              }}>
              <TextInput
                style={styles.Otp}
                ref={otp1Ref}
                onChangeText={value => {
                  onChangeOtp1(value);
                  if (value !== '') {
                    otp2Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    // otp1Ref.current.focus();
                  } else {
                    otp2Ref.current.focus();
                  }
                }}
                // value={number}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />
              <TextInput
                ref={otp2Ref}
                style={styles.Otp}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    otp1Ref.current.focus();
                    // setOtp1("");
                    return;
                  } else {
                    otp3Ref.current.focus();
                  }
                }}
                onChangeText={value => {
                  onChangeOtp2(value);
                  if (value !== '') {
                    otp3Ref.current.focus();
                  }
                }}
                // value={number}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />
              <TextInput
                ref={otp3Ref}
                style={styles.Otp}
                onChangeText={value => {
                  onChangeOtp3(value);
                  if (value !== '') {
                    otp4Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    otp2Ref.current.focus();
                    //setOtp2("");
                    return;
                  } else {
                    otp4Ref.current.focus();
                  }
                }}
                // value={number}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />
              <TextInput
                ref={otp4Ref}
                style={styles.Otp}
                onChangeText={value => {
                  onChangeOtp4(value);
                  if (value !== '') {
                    otp5Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    otp3Ref.current.focus();
                    //setOtp2("");
                    return;
                  } else {
                    otp5Ref.current.focus();
                  }
                }}
                // value={number}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />
              <TextInput
                ref={otp5Ref}
                style={styles.Otp}
                onChangeText={value => {
                  onChangeOtp5(value);
                  if (value !== '') {
                    otp6Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    otp4Ref.current.focus();
                    //setOtp2("");
                    return;
                  } else {
                    otp6Ref.current.focus();
                  }
                }}
                // value={number}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />

              <TextInput
                style={styles.Otp}
                ref={otp6Ref}
                onChangeText={value => {
                  setOtp6(value);
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key == 'Backspace') {
                    otp5Ref.current.focus();
                    // setOtp5("");
                    return;
                  } else {
                  }
                }}
                keyboardType="numeric"
                maxLength={1}
                textAlign={'center'}
              />
            </View>

            {/* <Text style={{ color: "#B1003F", marginTop:'5%', alignSelf:'center' }}>{Error}</Text> */}
            {/* <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontSize: 16, fontWeight: '700', marginTop: '7%' }}>Resend code in </Text>
       
          <CountDown
        size={15}
        until={30}
        onFinish={() => alert('Try again!')}
        digitStyle={{backgroundColor: '#15172C'}}
        digitTxtStyle={{color: '#FFFFFF'}}
        separatorStyle={{color: '#FFFFFF'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      /> */}
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginTop: '20%',
                marginBottom: '10%',
              }}
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
                  Verify
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
  Otp: {
    backgroundColor: '#FFFFFF',
    height: 44,
    width: 40,
    margin: 8,
    padding: 12,
    borderRadius: 5,
    color: '#4A4D58',
  },
});

export default Verification;
