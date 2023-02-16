import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
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

const Offers = props => {
  useEffect(() => {
    getData();
  }, []);

  const [offers, setoffers] = useState([]);

  const getData = () => {
    API.get(APP_URLS.OFFERS)
      .then(function (response) {
        setoffers(response.data.data);
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
          }}>
          <View>
            <TouchableOpacity
              style={{top: 6, left: 18}}
              onPress={() => props.navigation.push('DrawerNavigator')}>
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
          <View style={{height: '100%', width: '100%'}}>
            {offers.map((rowitem, index) => (
              <View
                style={{
                  width: '50%',
                  height: 240,
                  paddingHorizontal: 2,
                  marginTop: 5,
                }}>
                <View
                  style={{
                    borderColor: '#191B2E',
                    borderWidth: 1,
                    width: '100%',
                    height: 225,
                    borderRadius: 20,
                    backgroundColor: '#22313F',
                  }}>
                  <View
                    style={{
                      //   borderWidth: 1,
                      //   borderColor: 'red',
                      height: '60%',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                      borderRadius: 20,
                    }}>
                    <Image
                      source={{
                        uri: rowitem.image_url,
                      }}
                      style={{
                        height: '80%',
                        width: '100%',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      // borderColor: 'blue',
                      height: '65%',
                      alignItems: 'center',
                      borderRadius: 20,
                      position: 'relative',
                      bottom: '19%',
                      backgroundColor: '#131222',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        marginTop: 2,
                        fontWeight: '500',
                      }}>
                      {rowitem.title}
                    </Text>
                    <Text
                      style={{
                        color: '#54555C',
                        fontSize: 12,
                        marginTop: 2,
                        fontWeight: '500',
                        textAlign: 'center',
                        paddingHorizontal: 15,
                        // overflow: 'hidden',
                      }}
                      numberOfLines={4}>
                      {rowitem.description}
                    </Text>
                    <TouchableOpacity
                      style={{alignSelf: 'center', top: '1.5%'}}
                      onPress={() =>
                        props.navigation.push('OfferDetails', {
                          offer_id: rowitem.id,
                        })
                      }>
                      <ImageBackground
                        style={{
                          height: 40,
                          width: 103,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={require('../assets/button.png')}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: '#FFFFFF',
                          }}>
                          Open
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
      <Toast />
    </>
  );
};

export default Offers;
