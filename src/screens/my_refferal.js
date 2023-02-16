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

const MyRefferal = props => {
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
    API.post(urls.BASE_URL + 'buy-coin-through-app', body)
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
        style={{height: '12%', justifyContent: 'center', alignItems: 'center'}}>
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
              marginLeft: '25%',
              color: '#FFFFFF',
            }}>
            My Referral
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={{height: '78%'}}>
          <View
            style={{
              height: '50%',
              backgroundColor: '#15172C',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <View style={{bottom: '5%'}}>
              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 14,
                  width: '90%',
                  alignSelf: 'center',
                }}>
                Invite your Contact
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: '#F8F8F8',
                  fontWeight: '500',
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '2%',
                }}>
                Share this like to your contact
              </Text>
              <View
                style={{
                  backgroundColor: '#403E62',
                  width: '90%',
                  height: 40,
                  alignSelf: 'center',
                  borderRadius: 7,
                  marginTop: '4%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    alignSelf: 'center',
                    width: '20%',
                    textAlign: 'center',
                  }}>
                  Copy
                </Text>
                <Text
                  style={{
                    lineHeight: 15,
                    fontSize: 10,
                    width: '80%',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  https://ihodl.lusites.xyz/buy-coins/sdfeilgshrtg;
                  https://ihodl.lusites.xyz/buy-coinsfbdbfvcxc{' '}
                </Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  marginTop: '4%',
                }}>
                Or
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  marginTop: '2%',
                }}>
                Share your code on
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '4%',
                }}>
                <TouchableOpacity
                  style={{
                    height: 37,
                    width: 113,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1877F2',
                    borderRadius: 6,
                  }}
                  onPress={onClickBuyCoin}>
                  <ImageBackground
                    style={{height: 17, width: 17, right: 30}}
                    source={require('../assets/fb.png')}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        left: 25,
                        width: '300%',
                        marginTop: '7%',
                      }}>
                      Facebook
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 37,
                    width: 113,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1DA1F2',
                    borderRadius: 6,
                  }}
                  onPress={onClickBuyCoin}>
                  <ImageBackground
                    style={{height: 17, width: 17, right: 25}}
                    source={require('../assets/tweet.png')}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        left: 25,
                        width: '300%',
                        marginTop: '7%',
                      }}>
                      Twitter
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              height: '35%',
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
                }}>
                Invite Your Contact
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Level 1
                </Text>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Level 2
                </Text>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  Level 3
                </Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  15
                </Text>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  2
                </Text>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  0
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: '30%',
              width: '90%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: '2%',
            }}>
            <View style={{bottom: '5%'}}>
              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 16,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '7%',
                }}>
                My References
              </Text>
              <Text style={[styles.input, {marginTop: '4%'}]}>
                Full Name : user@email.com
              </Text>
              <Text style={styles.input}>Email : Platinum</Text>
              <Text style={styles.input}>Level : Level 1</Text>
            </View>
          </View>

          <View
            style={{
              height: '30%',
              width: '90%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: '2%',
            }}>
            <View style={{bottom: '5%'}}>
              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 16,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '5%',
                }}>
                Full Name
              </Text>
              <Text style={[styles.input, {marginTop: '4%'}]}>
                Full Name : user@email.com
              </Text>
              <Text style={styles.input}>Email : Platinum</Text>
              <Text style={styles.input}>Level : Level 1</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    left: '2%',
  },
});

export default MyRefferal;
