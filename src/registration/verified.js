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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';

const Verified = props => {
  return (
    <>
      <View style={[styles.container, {flexDirection: 'column'}]}>
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
            <Text> </Text>
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
              Log into your account{'   '}
            </Text>
          </View>
          <Text> </Text>
        </View>
        <Image
          style={{
            height: 195,
            width: 195,
            alignSelf: 'center',
            marginTop: '5%',
            marginBottom: '8%',
          }}
          source={require('../assets/logo_cover.png')}
        />

        <View
          style={{
            backgroundColor: '#15172C',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 372, width: 356, bottom: '12%'}}
            source={require('../assets/success.png')}
          />

          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: 16,
              bottom: '36%',
              width: 300,
              textAlign: 'center',
            }}>
            Your account has been verified successfully!
          </Text>
          <TouchableOpacity
            style={{bottom: '28%'}}
            onPress={() => props.navigation.navigate('Login')}>
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
                Done
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
  input: {
    height: 50,
    margin: 12,
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

export default Verified;
