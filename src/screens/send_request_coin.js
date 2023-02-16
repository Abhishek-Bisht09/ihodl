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
import RadioForm from 'react-native-simple-radio-button';
import {urls} from '../utils/api';
import Toast from 'react-native-toast-message';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const SendRequestCoin = props => {
  const data = [
    {
      label: 'Coin Payment       ',
      value: 1,
    },
    {
      label: 'Bank Deposit',
      value: 4,
    },
  ];

  const [BuycoinHistory, setBuycoinHistory] = useState(false);
  const [BuycoinHistoryButton, setBuycoinHistoryButton] = useState(false);
  const [BuycoinButton, setBuycoinButton] = useState(true);

  const [payment_type, setpayment_type] = useState('');
  const [coin, setcoin] = useState('');
  const [payment_coin_type, setpayment_coin_type] = useState('');
  const [phase_id, setphase_id] = useState('');

  const onChange = e => {
    setpayment_type(e);
  };

  const onClickBuyCoin = e => {
    setBuycoinHistory(false);
    setBuycoinButton(true);
    setBuycoinHistoryButton(false);
  };

  const onClickBuyCoinHistory = e => {
    setBuycoinHistory(true);
    setBuycoinButton(false);
    setBuycoinHistoryButton(true);
  };

  const onSubmitForm = () => {
    // if (!validate()) {
    //   setLoader(true)
    let body = {
      payment_type: payment_type,
      coin: coin,
      payment_coin_type: 'BTC',
      phase_id: 5,
    };

    API.post(APP_URLS.BUY_COIN_THROUGH_APP, body)
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          props.navigation.push('DrawerNavigator');
        } else {
          Toast.show({
            type: 'error',
            text2: 'error',
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: 'error',
        });
      });
    // }
  };

  return (
    <View style={{height: '100%', backgroundColor: '#131222'}}>
      <View
        style={{
          // height: '22%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '100%', flexDirection: 'row', marginTop: '10%'}}>
          <TouchableOpacity
            style={{marginLeft: '4%', marginTop: '1%'}}
            onPress={() => props.navigation.goBack()}>
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
            {' '}
            Send/Request Coin
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            marginTop: '5%',
            justifyContent: 'center',
          }}>
          <View style={{width: '50%'}}>
            {BuycoinButton ? (
              <TouchableOpacity onPress={onClickBuyCoin}>
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
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#FFFFFF',
                    }}>
                    Coin Request
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 73,
                }}
                onPress={onClickBuyCoin}>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF'}}>
                  Coin Request
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{width: '50%'}}>
            {BuycoinHistoryButton ? (
              <TouchableOpacity onPress={onClickBuyCoinHistory}>
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
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#FFFFFF',
                    }}>
                    Send Coin
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 73,
                }}
                onPress={onClickBuyCoinHistory}>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF'}}>
                  Send Coin
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={{ width:'50%', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{ color: '#FFFFFF' , fontWeight:'600', fontSize:16}}>Buy Coin History</Text>
                    </View> */}
        </View>
      </View>

      {BuycoinHistory ? (
        //   buy coin history
        <ScrollView>
          <View style={{height: '78%'}}>
            <View
              style={{
                height: '40%',
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <View style={{bottom: '5%'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Address : N/A
                </Text>
                <Text style={styles.input}>Coin Amount : 1.0000000000</Text>
                <Text style={styles.input}>Coin Name : NFT</Text>
                <Text style={styles.input}>Payment Type : NFT</Text>
                <Text style={styles.input}>Status : Rejected</Text>
                <Text style={styles.input}>
                  Created At : 16 September 2022 | 06 : 00 AM
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '40%',
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <View style={{bottom: '5%'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Address : N/A
                </Text>
                <Text style={styles.input}>Coin Amount : 1.0000000000</Text>
                <Text style={styles.input}>Coin Name : NFT</Text>
                <Text style={styles.input}>Payment Type : NFT</Text>
                <Text style={styles.input}>Status : Rejected</Text>
                <Text style={styles.input}>
                  Created At : 16 September 2022 | 06 : 00 AM
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '40%',
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <View style={{bottom: '5%'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Address : N/A
                </Text>
                <Text style={styles.input}>Coin Amount : 1.0000000000</Text>
                <Text style={styles.input}>Coin Name : NFT</Text>
                <Text style={styles.input}>Payment Type : NFT</Text>
                <Text style={styles.input}>Status : Rejected</Text>
                <Text style={styles.input}>
                  Created At : 16 September 2022 | 06 : 00 AM
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        //   buy coin history
        <View style={{height: '56%'}}>
          <View
            style={{
              height: '30%',
              backgroundColor: '#15172C',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginTop: '14%',
            }}>
            <Text
              style={{
                color: '#F8F8F8',
                fontWeight: '500',
                fontSize: 16,
                width: '90%',
                alignSelf: 'center',
                marginTop: '8%',
              }}>
              Send Coin Request To User Using Email Address
            </Text>

            <TextInput
              style={[styles.input2, {marginTop: '5%'}]}
              // onChangeText={onChangeEmail}
              // value={Email}
              placeholder="User Email"
              autoCapitalize="none"
              placeholderTextColor="white"
            />
          </View>
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '400',
              fontSize: 12,
              width: '90%',
              alignSelf: 'center',
              marginTop: '4%',
              lineHeight: 15,
            }}>
            Note : Input user email where you want to send request for coin.
          </Text>

          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '500',
              fontSize: 18,
              width: '90%',
              alignSelf: 'center',
              marginTop: '3%',
            }}>
            Coin Amount
          </Text>
          <TextInput
            style={[
              styles.input,
              {borderWidth: 1, padding: 10, borderColor: '#FFFFFF'},
            ]}
            onChangeText={setcoin}
            value={coin}
            placeholder="Coin"
            placeholderTextColor="white"
          />

          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '400',
              fontSize: 12,
              width: '90%',
              alignSelf: 'center',
              marginTop: '4%',
              lineHeight: 15,
            }}>
            Note : Input user email where you want to send request for coin.
          </Text>

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
              source={require('../assets/button.png')}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF'}}>
                Send Request
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#F8F8F8',
    fontWeight: '500',
    fontSize: 14,
    width: '90%',
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: 10,
  },
  input2: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
  },
});

export default SendRequestCoin;
