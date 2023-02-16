import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {urls} from '../utils/api';
import Toast from 'react-native-toast-message';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Row, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import TabColumn from '../Components/TabColumn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const SendRec = props => {
  const TabNames = {Coin_Request: 1, Send_Coin: 2};
  const [activeTab, _activeTab] = useState(TabNames.Coin_Request);

  return (
    <SafeAreaView style={{backgroundColor: '#15172C', height: '100%'}}>
      <View
        style={{
          // height: '21%',
          backgroundColor: '#131222',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View
          style={{
            height: responsiveScreenHeight(7),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 5,
            // backgroundColor: '#131222',
            // backgroundColor:'red'
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
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                top: 5,
                left: '8%',
              }}>
              Send/Request Coin {'   '}
            </Text>
          </View>
          <View>
            <Text> </Text>
          </View>
          {/* <View
            style={{
              // left: 10,
              flexDirection: 'row',
              width: '10%',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{height: 19, width: 17, top: 6}}
              source={require('../assets/notification.png')}
            />
          </View> */}
        </View>

        <Row marginHorizontal={5}>
          <TabColumn
            heading={'Coin Request'}
            isActive={activeTab === TabNames.Coin_Request}
            onPress={() => _activeTab(TabNames.Coin_Request)}
          />
          <TabColumn
            heading={'Send Coin'}
            isActive={activeTab === TabNames.Send_Coin}
            onPress={() => _activeTab(TabNames.Send_Coin)}
          />
        </Row>
      </View>
      <Box flex={1}>
        {activeTab === TabNames.Coin_Request && (
          <Coin_Request items={Coin_Request} />
        )}
        {activeTab === TabNames.Send_Coin && <Send_Coin items={Send_Coin} />}
      </Box>
    </SafeAreaView>
  );
};

const Coin_Request = props => {
  const [user_email, setuser_email] = useState('');
  const [coin_amount, setcoin_amount] = useState('');

  const onSendRequest = () => {
    let formData = {
      email: user_email,
      amount: coin_amount,
    };
    API.post(APP_URLS.COIN_REQUEST, formData)
      .then(function (response) {
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
        } else {
          Alert.alert('Error', response.data.message);
        }
        setuser_email('');
        setcoin_amount('');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  return (
    <ImageBackground
      style={{
        height: responsiveScreenHeight(100),
        width: responsiveScreenWidth(100),
        // resizeMode: 'contain',
        backgroundColor: '#15172C',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // marginTop: 25
      }}
      tintColor="#fff"
      resizeMode="contain"
      source={require('../assets/Lines-PNG-Transparent-Image.png')}>
      <ScrollView>
        <LinearGradient
          colors={['#222441', '#050506']}
          style={{
            // height: '28%',
            backgroundColor: '#15172C',
            width: responsiveScreenWidth(90),
            alignSelf: 'center',
            borderRadius: 12,
            flexDirection: 'column',
            marginTop: '5%',
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: '#403F62',
          }}>
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '400',
              fontSize: 14,
              //   textAlign: 'left',
              paddingHorizontal: 15,
            }}>
            Send HDL Coin Request To User Using Email Address
          </Text>

          <View
            style={{
              paddingHorizontal: 15,
              marginTop: '3%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 14,
              }}>
              User Email
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="User email"
              style={{
                borderBottomWidth: 1,
                borderColor: '#191B2E',
                width: responsiveScreenWidth(83),
                color: 'white',
                marginBottom: 2,
                padding: 5,
              }}
              placeholderTextColor="#54555C"
              onChangeText={setuser_email}
              value={user_email}
            />
          </View>
        </LinearGradient>
        <Text
          style={{
            color: '#54555C',
            marginTop: 5,
            fontWeight: '400',
            fontSize: 11,
            paddingHorizontal: 25,
          }}>
          Note : Input user email where you want to send request for coin.
        </Text>
        <View style={{alignSelf: 'flex-start', margin: 18}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: '#F8F8F8',
              lineHeight: 26,
              textAlign: 'left',
              paddingHorizontal: 10,
            }}>
            Coin Amount
          </Text>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              // height: '28%',
              backgroundColor: '#15172C',
              width: responsiveScreenWidth(90),
              alignSelf: 'center',
              borderRadius: 12,
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <View style={{alignItems: 'center'}}>
              <TextInput
                value={coin_amount}
                placeholder="Coin"
                style={{
                  //   borderBottomWidth: 1,
                  //   borderColor: '#403E62',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  width: responsiveScreenWidth(84),
                  color: 'white',
                }}
                placeholderTextColor="#6f7178"
                onChangeText={setcoin_amount}
              />
            </View>
          </LinearGradient>
          <Text
            style={{
              color: '#54555C',
              marginTop: 5,
              fontWeight: '400',
              fontSize: 11,
              paddingHorizontal: 5,
            }}>
            Note : Input user email where you want to send request for coin.
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: '10%'}}
          onPress={onSendRequest}>
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
              Send Request
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const Send_Coin = props => {
  useEffect(() => {
    getData();
  }, []);
  const [wallet_type, setwallet_type] = useState([
    {label: 'No data', value: ''},
  ]);

  const [wallet_id, setwallet_id] = useState('');
  const [email, setemail] = useState('');
  const [amount, setamount] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const getData = () => {
    API.get(APP_URLS.WALLET_LIST)
      .then(function (response) {
        let final_list = [];
        let newArr = response.data.data.data;
        for (let i = 0; i < newArr.length; i++) {
          final_list.push({
            label: newArr[i].name,
            value: newArr[i].id,
          });
        }

        setwallet_type(final_list);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const onSendCoin = () => {
    let formData = {
      email: email,
      amount: amount,
      wallet_id: wallet_id,
    };
    API.post(APP_URLS.GIVE_COIN, formData)
      .then(function (response) {
        if (response.data.success == true) {
          setemail('');
          setamount('');
          Alert.alert('Success', response.data.message);
        } else {
          setemail('');
          setamount('');
          Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  return (
    <ImageBackground
      style={{
        height: responsiveScreenHeight(100),
        width: responsiveScreenWidth(100),
        // resizeMode: 'contain',
        backgroundColor: '#15172C',
      }}
      tintColor="#fff"
      resizeMode="contain"
      source={require('../assets/Lines-PNG-Transparent-Image.png')}>
      <ScrollView>
        <LinearGradient
          colors={['#222441', '#050506']}
          style={{
            // height: '28%',
            backgroundColor: '#15172C',
            width: Dimensions.get('screen').width * 0.9,
            alignSelf: 'center',
            borderRadius: 12,
            flexDirection: 'column',
            marginTop: '5%',
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: '#403F62',
          }}>
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '400',
              fontSize: 14,
              //   textAlign: 'left',
              // marginTop: '3%',
              paddingHorizontal: 15,
            }}>
            Send coins to other users wallets by email or crypto wallet address
          </Text>

          <View
            style={{
              paddingHorizontal: 15,
              marginTop: '2%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 14,
              }}>
              User Email / Wallet Address
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="User email / Wallet Address"
              style={{
                borderBottomWidth: 1,
                borderColor: '#191B2E',
                width: Dimensions.get('screen').width * 0.84,
                color: 'white',
                padding: 5,
              }}
              value={email}
              placeholderTextColor="#54555C"
              onChangeText={setemail}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: '2%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '500',
                fontSize: 14,
              }}>
              Coin Amount
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Enter Amount"
              style={{
                borderBottomWidth: 1,
                borderColor: '#191B2E',
                width: Dimensions.get('screen').width * 0.84,
                color: 'white',
                marginBottom: 5,
                padding: 5,
              }}
              placeholderTextColor="#54555C"
              value={amount}
              onChangeText={setamount}
            />
          </View>
        </LinearGradient>
        <Text
          style={{
            color: '#54555C',
            marginTop: 5,
            fontWeight: '400',
            fontSize: 11,
            paddingHorizontal: 25,
          }}>
          Note : Input user email where you want to send request for coin.
        </Text>
        <View style={{alignSelf: 'flex-start', margin: 18}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: '#F8F8F8',
              lineHeight: 26,
              textAlign: 'left',
              paddingHorizontal: 10,
            }}>
            Wallet
          </Text>

          <View style={{alignItems: 'center'}}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: 'white',
                  backgroundColor: '#191B2E',
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={wallet_type}
              labelField="label"
              valueField="value"
              placeholder={'Select Wallet'}
              itemTextStyle={{color: 'white'}}
              containerStyle={{
                backgroundColor: '#191B2E',
                borderRadius: 12,
              }}
              activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setwallet_id(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <Text
            style={{
              color: '#54555C',
              marginTop: 12,
              fontWeight: '400',
              fontSize: 11,
              left: 5,
              // paddingHorizontal: 5,
            }}>
            Note : Input user email where you want to send request for coin.
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: '10%'}}
          onPress={onSendCoin}>
          <ImageBackground
            style={{
              height: 60,
              width: 155,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 3,
            }}
            source={require('../assets/button.png')}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                color: '#FFFFFF',
              }}>
              Send Coin
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131222',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    marginTop: '2%',
    height: 35,
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: '#191B2E',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default SendRec;
