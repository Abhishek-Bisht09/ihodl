import React, { Component, useState, useEffect } from 'react';
import {
    Image, StyleSheet, SafeAreaView, TextInput, ImageBackground,
    View, Text, TouchableOpacity, TouchableHighlight, Modal, Pressable,
} from 'react-native';

const PhoneVerification = (props) => {

    return (
      <View style={{height: '100%', backgroundColor: '#15172C'}}>
        <View
          style={{
            backgroundColor: '#131222',
            height: '40%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{width: '100%', flexDirection: 'row', marginBottom: '8%'}}>
            <TouchableOpacity
              style={{marginLeft: '4%', marginTop: '1%'}}
              onPress={() => props.navigation.openDrawer()}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../assets/back_button.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 25,
                marginLeft: '15%',
                color: '#FFFFFF',
              }}>
              Phone Verification
            </Text>
          </View>

          <TouchableOpacity>
            <ImageBackground
              style={{
                height: 113,
                width: 115,
                marginTop: '3%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/round_icon.png')}>
              <Image
                style={{height: 40, width: 39}}
                source={require('../assets/user_profile.png')}
              />
            </ImageBackground>
          </TouchableOpacity>

          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '500',
              fontSize: 25,
              marginTop: '9%',
            }}>
            Welcome Mr User !
          </Text>
        </View>

        <View style={{height: '60%', backgroundColor: '#15172C'}}>
          <View style={{marginTop: '8%'}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                color: '#F8F8F8',
                marginLeft: '5%',
              }}>
              Phone Number
            </Text>
            <TextInput
              style={[styles.input, {alignSelf: 'center'}]}
              // onChangeText={onChangeEmail}
              // value={Email}
              placeholder="Number"
              placeholderTextColor="white"
            />

            <TouchableOpacity
            // onPress={onSubmitForm}
            >
              <ImageBackground
                style={{
                  height: 60,
                  width: 155,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: '10%',
                }}
                source={require('../assets/button.png')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  Send SMS
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Image
            style={{bottom: '30%'}}
            source={require('../assets/tansparent_lines.png')}
          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({

    input: {
        height: 12,
        margin: 8,
        width: '90%',
        borderBottomWidth: 1,
        padding: 10,
        borderColor: '#F0F0F0',
        color: '#F8F8F8',
    },
});



export default PhoneVerification;