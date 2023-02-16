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
  ScrollView,
} from 'react-native';

const IdVerification = props => {
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
        <View style={{width: '100%', flexDirection: 'row', marginBottom: '8%'}}>
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
              marginLeft: '25%',
              color: '#FFFFFF',
            }}>
            Id Verification
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

      <View style={{backgroundColor: '#15172C'}}>
        <View style={{marginTop: '5%'}}>
          <ScrollView style={styles.scrollView}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 15,
                color: '#F8F8F8',
                marginLeft: '2%',
              }}>
              National id Card{' '}
              <Text style={{color: '#5A64FB'}}>(Accepted)</Text>
            </Text>

            <Image
              style={{
                borderRadius: 10,
                width: '100%',
                alignSelf: 'center',
                marginTop: '2%',
                height: 165,
              }}
              source={require('../assets/id_card.png')}
            />

            <Text
              style={{
                fontWeight: '400',
                fontSize: 15,
                color: '#F8F8F8',
                marginLeft: '2%',
                marginTop: '5%',
              }}>
              Passport <Text style={{color: '#5A64FB'}}>(Accepted)</Text>
            </Text>

            <Image
              style={{
                borderRadius: 10,
                width: '100%',
                alignSelf: 'center',
                marginTop: '2%',
                height: 165,
              }}
              source={require('../assets/passport.png')}
            />

            <Text
              style={{
                fontWeight: '400',
                fontSize: 15,
                color: '#F8F8F8',
                marginLeft: '2%',
                marginTop: '5%',
              }}>
              Driving Licence <Text style={{color: '#5A64FB'}}>(Accepted)</Text>
            </Text>

            <Image
              style={{
                borderRadius: 10,
                width: '100%',
                alignSelf: 'center',
                marginTop: '2%',
                height: 165,
              }}
              source={require('../assets/id_card.png')}
            />
          </ScrollView>
        </View>
        <Image
          style={{bottom: '80%'}}
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
  scrollView: {
    marginHorizontal: 20,
  },
});

export default IdVerification;
