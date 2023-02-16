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
  ScrollView,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';
import API from '../api/services';
import {all} from 'react-native-axios';

const OfferDetails = props => {
  const data = [
    {label: '10', value: '1'},
    {label: '20', value: '2'},
    {label: '50', value: '3'},
    {label: '100', value: '4'},
    {label: '110', value: '5'},
    {label: '120', value: '6'},
    {label: '130', value: '7'},
    {label: '140', value: '8'},
  ];

  useEffect(() => {
    getData();
  });

  const [offer_details, setoffer_details] = useState({});

  const getData = () => {
    API.get(APP_URLS.OFFERS)
      .then(function (response) {
        let final_list = [];
        let newArr = response.data.data;
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].id == props.route.params.offer_id) {
            final_list.push(newArr[i]);
          }
        }

        setoffer_details(final_list[0]);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  return (
    <>
      <View style={{height: '100%', backgroundColor: '#15172C'}}>
        <View
          style={{
            height: responsiveScreenHeight(7),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#131222',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 5,
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

          <Text
            style={{
              color: '#fff',
              // textAlign: 'center',
              fontSize: 20,
              fontWeight: '700',
              top: 5,
            }}>
            Offers
          </Text>

          <Text> </Text>
        </View>
        <ImageBackground
          style={{
            height: Dimensions.get('screen').height,
            width: '100%',
            flex: 1,
            backgroundColor: '#15172C',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // paddingBottom: 5,
            padding: 5,
            // borderWidth: 2,
            // borderColor: 'green',
          }}
          tintColor="#fff"
          resizeMode="contain"
          source={require('../assets/Lines-PNG-Transparent-Image.png')}>
          <ScrollView>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={require('../assets/testImage.jpg')}
                style={{
                  height: 300,
                  width: '100%',
                  borderRadius: 20,
                  // borderTopLeftRadius: 20,
                  // borderTopRightRadius: 20,
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                alignItems: 'center',
                borderRadius: 20,
                //   backgroundColor: '#22313F',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginTop: 15,
                  fontWeight: '600',
                }}>
                {offer_details.title}
              </Text>
              <Text
                style={{
                  color: '#54555C',
                  fontSize: 14,
                  marginTop: 10,
                  fontWeight: '400',
                  textAlign: 'center',
                  paddingHorizontal: 5,
                }}>
                {offer_details.description}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'center', marginTop: 15, marginBottom: 10}}
                onPress={() => {
                  Linking.openURL(offer_details.url).catch(err => {
                    console.error('Failed opening page because: ', err);
                    alert('Failed to open page');
                  });
                }}>
                <ImageBackground
                  style={{
                    height: 60,
                    width: 155,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../assets/button.png')}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#FFFFFF',
                    }}>
                    Go To Offer
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
      <Toast />
    </>
  );
};

export default OfferDetails;
