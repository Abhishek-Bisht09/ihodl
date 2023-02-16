import React, {Component, useState, useEffect, useCallback} from 'react';
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
  Alert,
  Dimensions,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';
import {urls} from '../../utils/api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import * as Progress from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import {Row, Box, FlatList} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TabColumn from '../../Components/TabColumn';
import API from '../../api/services';
import {APP_URLS} from '../../api/urls';

const SwapCoins = props => {
  const TabNames = {SwapCoins_: 1, SwapCoinsHistory: 2};
  const [activeTab, _activeTab] = useState(TabNames.SwapCoins_);

  return (
    <View style={{height: '100%', backgroundColor: '#15172C'}}>
      <View
        style={{
          // height:'21%',
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
            // backgroundColor:'red'
          }}>
          <View>
            <TouchableOpacity
              style={{top: 6, left: 18}}
              onPress={() => props.navigation.push('DrawerNavigator')}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../../assets/back_button.png')}
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
              Swap Coins {'   '}
            </Text>
          </View>
          <Text> </Text>
        </View>
        <Row marginHorizontal={5}>
          <TabColumn
            heading={'Swap Coins'}
            isActive={activeTab === TabNames.SwapCoins_}
            onPress={() => _activeTab(TabNames.SwapCoins_)}
          />
          <TabColumn
            heading={'Swap History'}
            isActive={activeTab === TabNames.SwapCoinsHistory}
            onPress={() => _activeTab(TabNames.SwapCoinsHistory)}
          />
        </Row>
      </View>

      <Box>
        {activeTab === TabNames.SwapCoins_ && <SwapCoins_ items={SwapCoins_} />}
        {activeTab === TabNames.SwapCoinsHistory && (
          <SwapCoinsHistory items={SwapCoinsHistory} />
        )}
      </Box>
    </View>
  );
};

const SwapCoins_ = props => {
  const [payment_type, setpayment_type] = useState('');
  const [coin, setcoin] = useState('');
  const [from, setfrom] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [to, setto] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  const onChange = e => {
    setpayment_type(e);
  };

  useEffect(() => {
    getData();
  }, []);

  const [wallet_list, setwallet_list] = useState([]);

  const getData = () => {
    API.get(APP_URLS.COIN_SWAP_WALLET_LIST)
      .then(function (response) {
        let final_list = [];
        let newArr = response.data.data;
        for (let i = 0; i < newArr.length; i++) {
          final_list.push({
            label: newArr[i].name,
            value: newArr[i].id,
          });
        }

        setwallet_list(final_list);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const onSubmitForm = () => {
    // if (!validate()) {
    //   setLoader(true)
    let body = {
      from_coin_id: from,
      amount: coin,
      to_coin_id: to,
    };

    API.post(APP_URLS.SWAP_COIN, body)
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          props.navigation.push('DrawerNavigator');
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
    // }
  };
  return (
    <ImageBackground
      style={{width: '100%'}}
      source={require('../../assets/tansparent_lines.png')}>
      <View style={{height: '80%', bottom: '4%'}}>
        <LinearGradient
          colors={['#1F213E', '#050506']}
          style={{
            // backgroundColor:'#1F213E',
            height: 270,
            backgroundColor: '#15172C',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginTop: '14%',
            borderWidth: 1,
            borderColor: '#403F62',
          }}>
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '600',
              fontSize: 16,
              width: '90%',
              alignSelf: 'center',
              marginTop: '4%',
            }}>
            Select From Coin Wallet
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#191B2E'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{
              backgroundColor: '#191B2E',
              borderRadius: 12,
            }}
            activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
            itemTextStyle={{color: '#fff'}}
            data={wallet_list}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Coin' : '...'}
            value={from}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setfrom(item.value);
              setIsFocus(false);
            }}
          />

          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '600',
              fontSize: 16,
              width: '90%',
              alignSelf: 'center',
            }}>
            Select To Wallet
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus2 && {borderColor: 'white'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{
              backgroundColor: '#191B2E',
              borderRadius: 12,
            }}
            activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
            data={wallet_list}
            itemTextStyle={{color: '#fff'}}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus2 ? 'Select Coin' : '...'}
            value={to}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setto(item.value);
              setIsFocus2(false);
            }}
          />
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '600',
              fontSize: 16,
              width: '90%',
              alignSelf: 'center',
            }}>
            Amount
          </Text>
          <TextInput
            style={[styles.dropdown, {padding: 7}]}
            onChangeText={setcoin}
            value={coin}
            placeholder="Amount"
            placeholderTextColor="#FFFFFF"></TextInput>
        </LinearGradient>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginBottom: '15%',
            marginTop: '10%',
          }}
          onPress={onSubmitForm}>
          <ImageBackground
            style={{
              height: 60,
              width: 155,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../assets/button.png')}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF'}}>
              Swap Coins
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const SwapCoinsHistory = props => {
  const [swapHistory, swapHistory_] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);
  const wait = timeout => {
    // Defined the timeout function for testing purpose
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const getHistory = () => {
    API.get(APP_URLS.SWAP_COIN_HISTORY)
      .then(function (response) {
        if (response.data.success == true) {
          swapHistory_(response.data.data.data);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'Error',
          text1: error.message,
        });
      });
  };

  const renderItem = item => {
    return (
      <LinearGradient
        colors={['#222441', '#050506']}
        style={{
          backgroundColor: '#15172C',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          flexDirection: 'column',
          paddingBottom: 4,
          borderWidth: 1,
          borderColor: '#403F62',
          marginBottom: 15,
          marginTop: 5,
        }}>
        <View>
          <Text style={styles.input}>
            From Wallet :{' '}
            <Text style={{color: '#F8F8F8'}}>{item.item.from_wallet.name}</Text>
          </Text>
          <Text style={styles.input}>
            To Wallet :{' '}
            <Text style={{color: '#F8F8F8'}}>{item.item.to_wallet.name}</Text>
          </Text>
          <Text style={styles.input}>
            Requested Amount :{' '}
            <Text style={{color: '#F8F8F8'}}>
              {item.item.requested_amount_string}
            </Text>
          </Text>
          <Text style={styles.input}>
            Converted Amount :{' '}
            <Text style={{color: '#F8F8F8'}}>
              {item.item.converted_amount_string}
            </Text>
          </Text>
          <Text style={styles.input}>
            Created At :{' '}
            <Text style={{color: '#F8F8F8'}}>{item.item.created_at}</Text>
          </Text>
          <Text style={styles.input}>
            Rate : <Text style={{color: '#F8F8F8'}}>{item.item.rate}</Text>
          </Text>
        </View>
      </LinearGradient>
    );
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getHistory();
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  return (
    <View style={{height: '90%'}}>
      <ImageBackground
        style={{
          height: '100%',
          backgroundColor: '#15172C',
          paddingBottom: 2,
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../../assets/Lines-PNG-Transparent-Image.png')}>
        {swapHistory.length > 0 ? (
          <FlatList
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={renderItem}
            data={swapHistory}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          ''
        )}
      </ImageBackground>
    </View>
  );
};

export default SwapCoins;

const styles = StyleSheet.create({
  input: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: '4%',
    borderBottomWidth: 1,
    borderColor: '#191B2E',
  },
  dropdown: {
    margin: 16,
    height: 35,
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    backgroundColor: '#191B2E',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    color: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  block: {
    // height: '35%',
    backgroundColor: '#15172C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '4%',
    padding: 7,
    borderWidth: 1,
    borderColor: '#403F62',
  },
});
