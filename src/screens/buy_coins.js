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
import {urls} from '../utils/api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import * as Progress from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import TabColumn from '../Components/TabColumn';
import {Row, Box, FlatList} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import API from '../api/services';
import {APP_URLS} from '../api/urls';
import axios from 'axios';
import queryString from 'query-string';

const coin_type = [
  {label: 'USDT', value: 'USDT'},
  {label: 'Shiba', value: 'SHIB'},
];

const bank_name = [
  {label: 'State Bank of India', value: 1},
  {label: 'Bank of India', value: 2},
  {label: 'BENDIGO BANK LIMITED', value: 3},
];

const BuyCoins = props => {
  const TabNames = {BuyCoins_: 1, BuyCoinsHistory: 2};
  const [activeTab, _activeTab] = useState(TabNames.BuyCoins_);

  return (
    <View style={{height: '100%', backgroundColor: '#15172C'}}>
      <View
        style={{
          // height:'20%',
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
              Coins {'   '}
            </Text>
          </View>
          <Text> </Text>
        </View>
        <Row marginHorizontal={5}>
          <TabColumn
            heading={'Buy Coins'}
            isActive={activeTab === TabNames.BuyCoins_}
            onPress={() => _activeTab(TabNames.BuyCoins_)}
          />
          <TabColumn
            heading={'Buy History'}
            isActive={activeTab === TabNames.BuyCoinsHistory}
            onPress={() => _activeTab(TabNames.BuyCoinsHistory)}
          />
        </Row>
      </View>

      <Box>
        {activeTab === TabNames.BuyCoins_ && <BuyCoins_ items={BuyCoins_} />}
        {activeTab === TabNames.BuyCoinsHistory && (
          <BuyCoinsHistory items={BuyCoinsHistory} />
        )}
      </Box>
    </View>
  );
};

const BuyCoins_ = props => {
  const data = [
    {
      label: 'Coin Payment   ',
      value: 1,
    },
    {
      label: 'Bank Deposit   ',
      value: 4,
    },
    {
      label: 'Credit Card',
      value: 5,
    },
  ];

  const [BuycoinHistory, setBuycoinHistory] = useState(false);
  const [BuycoinHistoryButton, setBuycoinHistoryButton] = useState(false);
  const [BuycoinButton, setBuycoinButton] = useState(true);

  const [payable, setpayable] = useState('');
  const [payment_type, setpayment_type] = useState(1);
  const [coin, setcoin] = useState('');
  const [payment_coin_type, setpayment_coin_type] = useState('');
  const [access_token, setaccess_token] = useState('');

  const [name_on_card, setname_on_card] = useState('');
  const [card_number, setcard_number] = useState('');
  const [cvc, setcvc] = useState('');
  const [expiration_month, setexpiration_month] = useState('');
  const [expiration_year, setexpiration_year] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [isFocus2, setIsFocus2] = useState(false);
  const [bank_id, setbank_id] = useState('');

  const [photo, setphoto] = useState('');
  const [icoPhase, setIcoPhase] = useState(false);

  const [Icodata, setIcodata] = useState('');
  const [token, settoken] = useState('');
  const TabNames = {BuyCoins_: 1, BuyCoinsHistory: 2};
  const [activeTab, _activeTab] = useState(TabNames.BuyCoins_);

  const [endDate, setEndDate] = useState('YYYY-MM-DD');
  const [startDate, setStartDate] = useState('YYYY-MM-DD');

  const [raisedAmount, setRaisedAmount] = useState(
    parseFloat(Icodata?.data?.activePhase?.pahse_info?.raised_amount),
  );
  const [amount, setAmount] = useState(
    parseInt(Icodata?.data?.activePhase?.pahse_info?.amount),
  );
  const [percentage, setPercentage] = useState(0);

  const setDates = () => {
    let endDate = Icodata?.data?.activePhase?.pahse_info?.end_date;
    if (endDate) {
      let end_date =
        Icodata?.data?.activePhase?.pahse_info.end_date.split(' ')[0];
      setEndDate(end_date);
      let start_date =
        Icodata.data.activePhase.pahse_info.start_date.split(' ')[0];
      setStartDate(start_date);
    }
  };
  const getPercentage = () => {
    let namount = parseInt(amount);
    let nramount = parseInt(raisedAmount);
    let value = (nramount / namount) * 100;
    setPercentage(parseInt(value));
  };

  //Sale Counter
  const [saleDays, setSaleDay] = useState(0);
  const [saleHours, setSaleHours] = useState(0);
  const [saleMinutes, setSaleMinutes] = useState(0);
  const [saleSeconds, setSaleSeconds] = useState(0);

  const saleCountdown = endDate => {
    let count_Down_Date = endDate;
    if (count_Down_Date) {
      let countDownDate = new Date(endDate).getTime();
      let x = setInterval(function () {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Setting state for counter
        setSaleDay(days < 10 ? `0${days}` : days);
        setSaleHours(hours < 10 ? `0${hours}` : hours);
        setSaleMinutes(minutes < 10 ? `0${minutes}` : minutes);
        setSaleSeconds(seconds < 10 ? `0${seconds}` : seconds);

        // If the count down is finished, exiting counter
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
    getPercentage();
  }, []);

  useEffect(() => {
    getCoins();

    setDates();
  }, [Icodata]);

  useEffect(() => {
    if (access_token) {
      getIcoPhase();
    }
  }, [access_token]);

  const [coin_list, setcoin_list] = useState([]);

  const getCoins = () => {
    API.get(APP_URLS.GET_COINS)
      .then(function (response) {
        let final_list = [];
        let newArr = response.data.coins.data;
        for (let i = 0; i < newArr.length; i++) {
          final_list.push({label: newArr[i].name, value: newArr[i].id});
        }
        setcoin_list(final_list);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@access_token');
      if (value !== null) {
        // value previously stored
        setaccess_token(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const onChange = e => {
    setpayment_type(e);
  };

  const onClickBuyCoin = () => {
    setBuycoinHistory(false);
    setBuycoinButton(true);
    setBuycoinHistoryButton(false);
  };

  const onClickBuyCoinHistory = () => {
    setBuycoinHistory(true);
    setBuycoinButton(false);
    setBuycoinHistoryButton(true);
  };

  const CreditCardPayment = token => {
    let form3 = {
      payment_type: payment_type,
      coin: coin,
      stripeToken: token,
      payment_coin_type: payment_coin_type,
      // phase_id: 0,
    };

    API.post(urls.BASE_URL + 'buy-coin-through-app', form3)
      .then(function (response) {
        if (response.data.success == true) {
          setcoin('');
          Alert.alert(response.data.message);

          // Toast.show({
          //   type: 'success',
          //   text2: response.data.message,
          // });
        } else {
          console.log('error', response.data.message);
          Alert.alert(response.data.message);
          //         Toast.show({
          //   type: 'error',
          //   text2: response.data.message,
          // });
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
          Alert.alert(error_message);

          // Toast.show({
          //   type: 'error',
          //   text2: error_message,
          // });
        }
      });
  };

  const onSubmitForm = () => {
    if (payment_type == 1) {
      // coin payment

      let form = {
        payment_type: payment_coin_type,
        amount: coin,
        pay_type: '1',
      };
      API.post(urls.BASE_URL + 'buy-coin-rate-app', form)
        .then(function (response) {
          // setLoader(false)
          if (response.data.success == true) {
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: error,
          });
        });
    } else if (payment_type == 4) {
      let form2 = {
        payment_type: '4',
        coin: coin,
        sleep: photo.assets[0],
        bank_id: bank_id,
      };

      API.post(urls.BASE_URL + 'buy-coin-through-app', form2)
        .then(function (response) {
          if (response.data.success == true) {
            setcoin('');
            Toast.show({
              type: 'success',
              text2: response,
            });
          } else {
            Toast.show({
              type: 'error',
              text2: 'error',
            });
          }
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    } else if (payment_type == 5) {
      // credit card

      const card = {
        number: card_number,
        exp_month: expiration_month,
        exp_year: expiration_year,
        cvc: cvc,
        name: name_on_card,
      };

      axios
        .post(
          'https://api.stripe.com/v1/tokens',
          queryString.stringify({
            'card[number]': card.number,
            'card[exp_month]': card.exp_month,
            'card[exp_year]': card.exp_year,
            'card[cvc]': card.cvc,
            'card[name]': card.name,
          }),
          // queryString.stringify({
          //   'card[number]': '4242424242424242',
          //   'card[exp_month]': '12',
          //   'card[exp_year]': '2025',
          //   'card[cvc]': '123',
          //   'card[name]': 'Test',
          // }),
          {
            headers: {
              Authorization:
                'Bearer pk_test_51KonKHFOBJa70AkTDnnOaYp5CR7ZEG554X9nAwpKLIDgJbzEGWLr8d1Xj9ENivJrwfraD6OtHTLmlhzxzOv4vUjT00CNXGpDpa',
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then(function (response) {
          settoken(response.data.id);
          CreditCardPayment(response.data.id);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text2: error,
          });
        });
    }
  };

  const getIcoPhase = () => {
    API.get(urls.BASE_URL + 'get-buy-coin-and-phase-information')
      .then(function (response) {
        if (response.data.success == true) {
          setIcodata(response.data);
          setIcoPhase(response.data.data.activePhase.status);
          if (response.data.data.activePhase.status) {
            saleCountdown(response.data.data.activePhase.pahse_info.end_date);
          }
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: 'error',
        });
      });
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      setphoto(response);
      // handleFileInputChange(response.assets[0])

      if (response.uri) {
        setphoto(response);
      }
    });
  };

  return (
    <ImageBackground
      style={{
        // height: Dimensions.get('screen').height,
        width: '100%',
        // flex: 1,
        backgroundColor: '#15172C',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5,
      }}
      tintColor="#fff"
      resizeMode="contain"
      source={require('../assets/Lines-PNG-Transparent-Image.png')}>
      <ScrollView>
        {/* <View style={{height: '100%'}}> */}
        {icoPhase ? (
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              // height: '28%',
              backgroundColor: '#15172C',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              flexDirection: 'column',
              marginTop: '5%',
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <Text
              style={{
                color: '#F8F8F8',
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'center',
                marginTop: '3%',
              }}>
              SALE ENDS IN
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: Dimensions.get('screen').width * 0.9,
              }}>
              <View>
                <Text style={{color: 'white', fontSize: 30}}>
                  {' '}
                  {saleDays} :{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 30}}>
                  {' '}
                  {saleHours} :{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 30}}>
                  {' '}
                  {saleMinutes} :{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 30}}>
                  {' '}
                  {saleSeconds}{' '}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                marginTop: '5%',
              }}>
              <Text style={{color: '#F8F8F8', fontWeight: '500', fontSize: 12}}>
                STARTS AT
              </Text>
              <Text style={{color: '#F8F8F8', fontWeight: '500', fontSize: 12}}>
                ENDS AT
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                marginTop: '2%',
              }}>
              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#4FAEFD',
                }}>
                2022-05-09
              </Text>
              <Text
                style={{
                  color: '#F8F8F8',
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#4FAEFD',
                }}>
                2022-12-30
              </Text>
            </View>
            <Text
              style={{
                color: '#3BA3FF',
                fontWeight: '400',
                fontSize: 8,
                width: '85%',
                alignSelf: 'center',
                marginTop: '4%',
              }}>
              298961.25 HDL
            </Text>
            <Progress.Bar
              progress={0.3}
              width={Dimensions.get('screen').width * 0.8}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={{
                color: '#808080',
                fontWeight: '400',
                fontSize: 8,
                width: '25%',
                alignSelf: 'flex-end',
                marginTop: '1%',
              }}>
              10000000.00 HDL
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '6%',
                marginBottom: '2%',
                left: '35%',
              }}>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{height: 18, width: 18, tintColor: '#3BA3FF'}}
                  source={require('../assets/raised.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '400',
                    fontSize: 8,
                    marginRight: '5%',
                    marginLeft: '2%',
                    top: '2%',
                  }}>
                  Raised Amount
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 18,
                    width: 18,
                    marginLeft: '5%',
                    tintColor: '#808080',
                  }}
                  source={require('../assets/target.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '400',
                    fontSize: 8,
                    marginLeft: '2%',
                    top: '2%',
                  }}>
                  Target Amount
                </Text>
              </View>
            </View>
          </LinearGradient>
        ) : (
          ''
        )}

        <LinearGradient
          colors={['#222441', '#050506']}
          style={{
            // height: '28%',
            backgroundColor: '#15172C',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            flexDirection: 'column',
            marginTop: '5%',
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: '#403F62',
          }}>
          <View>
            <Text
              style={{
                color: '#F8F8F8',
                fontWeight: '400',
                fontSize: 14,
                width: '90%',
                alignSelf: 'center',
                marginTop: '4%',
              }}>
              Buy Tokens Here By Card Or Crypto
            </Text>
            {Icodata ? (
              icoPhase ? (
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#20C373',
                    height: 34,
                    borderRadius: 8,
                    alignSelf: 'center',
                    marginTop: '2%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#057023',
                      width: '12%',
                      height: 34,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}>
                    <ImageBackground
                      style={{
                        height: 18,
                        width: 23,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      resizeMode="contain"
                      source={require('../assets/megaphone_1.png')}></ImageBackground>
                  </View>

                  <View style={{width: '88%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        marginLeft: '5%',
                        fontWeight: '400',
                        fontSize: 11,
                        color: '#FFFFFF',
                      }}>
                      New ICO Phase are available now. Now you can get some
                      extra facility when buy coin.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#FF6464',
                    height: 34,
                    borderRadius: 8,
                    alignSelf: 'center',
                    marginTop: '2%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#7D2B30',
                      width: '12%',
                      height: 34,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}>
                    <ImageBackground
                      style={{
                        height: 18,
                        width: 23,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      resizeMode="contain"
                      source={require('../assets/warning.png')}>
                      <Text style={{color: '#8F353B'}}>!</Text>
                    </ImageBackground>
                  </View>

                  <View style={{width: '88%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        marginLeft: '5%',
                        fontWeight: '400',
                        fontSize: 11,
                        color: '#FFFFFF',
                      }}>
                      New ICO Phase Will Be Announced Here.
                    </Text>
                  </View>
                </View>
              )
            ) : (
              ''
            )}
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
              data={coin_type}
              labelField="label"
              valueField="value"
              placeholder={'Select a coin'}
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
                setpayment_coin_type(item.value);
                setIsFocus(false);
              }}
            />
            <Text
              style={{
                color: '#F8F8F8',
                fontWeight: '500',
                fontSize: 11,
                width: '90%',
                alignSelf: 'center',
                // marginTop: '3%',
              }}>
              Coin Amount <Text style={{color: 'red'}}>*</Text>{' '}
              <Text style={{color: '#808080'}}>(Bonus = 0 HDL)</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: '#191B2E',
                },
              ]}
              keyboardType="numeric"
              onChangeText={setcoin}
              value={coin}
              placeholder="Your Amount"
              placeholderTextColor="white"
            />
            <Text
              style={{
                color: '#808080',
                fontWeight: '500',
                fontSize: 10,
                width: '90%',
                alignSelf: 'center',
                marginBottom: 5,
              }}>
              (2.5X0 = 0.00 USD) ($0.00 USD = 0.00000000 BTC)
            </Text>
          </View>
        </LinearGradient>
        <View style={{height: 530, marginTop: '5%'}}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              // height: '28%',
              backgroundColor: '#15172C',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
              flexDirection: 'column',
              marginTop: '5%',
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <Text
              style={{
                color: '#F8F8F8',
                fontWeight: '500',
                fontSize: 14,
                width: '90%',
                marginTop: '5%',
                marginLeft: '5%',
              }}>
              Payment Type
            </Text>

            <RadioForm
              style={{
                marginTop: '3%',
                justifyContent: 'space-around',
                marginHorizontal: 5,
              }}
              radio_props={data}
              selectedButtonColor="#716AFC"
              buttonColor="#716AFC"
              formHorizontal={true}
              labelHorizontal={true}
              inital={null}
              buttonStyle={{marginRight: 20}}
              buttonSize={10}
              buttonOuterSize={20}
              labelStyle={{fontSize: 10, color: '#F8F8F8'}}
              onPress={onChange}
            />

            {payment_type == 1 ? (
              <View>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Payable
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: '#191B2E',
                    },
                  ]}
                  keyboardType="numeric"
                  value={payable}
                  placeholder="0.00000000"
                  placeholderTextColor="#808080"
                  editable={false}
                />

                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Select
                </Text>
                {/* {coin_type.map((item)=>{
                    return <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: 12,
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: '2%',
                      }}>
                      {item.value}
                    </Text>;
                  })} */}
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
                  data={coin_list}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select a coin'}
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
                    setpayment_coin_type(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            ) : payment_type == 4 ? (
              <View>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Select Bank
                </Text>

                <Dropdown
                  style={[styles.dropdown, isFocus2 && {borderColor: 'white'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={bank_name}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Bank'}
                  itemTextStyle={{color: 'white'}}
                  containerStyle={{
                    backgroundColor: '#222441',
                    borderRadius: 12,
                  }}
                  activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                  value={value}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                    setbank_id(item.value);
                    setIsFocus2(false);
                  }}
                />

                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Attach Payment Recipt
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 40,
                    width: 200,
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 27,
                      borderWidth: 1,
                      width: 88,
                      backgroundColor: '#15172C',
                      borderRadius: 3,
                      color: 'white',
                      borderColor: '#515151',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // alignSelf: 'center',
                      marginTop: '4%',
                    }}
                    onPress={handleChoosePhoto}>
                    <Text style={{color: 'white'}}>Choose File</Text>
                  </TouchableOpacity>

                  {photo == '' ? (
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '6%',
                        width: 100,
                        marginLeft: '2%',
                      }}>
                      No file chosen
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '6%',
                        width: 100,
                        marginLeft: '2%',
                      }}>
                      {photo.assets[0].uri}
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Name on Card
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: '#FFFFFF',
                    },
                  ]}
                  onChangeText={setname_on_card}
                  value={name_on_card}
                  placeholder="Name"
                  placeholderTextColor="white"
                />
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '2%',
                  }}>
                  Card Number
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: '#FFFFFF',
                    },
                  ]}
                  keyboardType="numeric"
                  onChangeText={setcard_number}
                  value={card_number}
                  placeholder="Card Number"
                  placeholderTextColor="white"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <View style={{width: '34%'}}>
                    <Text
                      style={{
                        color: '#F8F8F8',
                        fontWeight: '500',
                        fontSize: 12,
                        marginLeft: '12%',
                      }}>
                      CVC
                    </Text>
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          borderColor: '#FFFFFF',
                        },
                      ]}
                      keyboardType="numeric"
                      onChangeText={setcvc}
                      value={cvc}
                      placeholder="CVC"
                      placeholderTextColor="white"
                    />
                  </View>

                  <View style={{width: '35%'}}>
                    <Text
                      style={{
                        color: '#F8F8F8',
                        fontWeight: '500',
                        fontSize: 12,
                      }}>
                      Expiration month
                    </Text>
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          borderColor: '#FFFFFF',
                        },
                      ]}
                      keyboardType="numeric"
                      onChangeText={setexpiration_month}
                      value={expiration_month}
                      placeholder="Month"
                      placeholderTextColor="white"
                    />
                  </View>

                  <View style={{width: '34%'}}>
                    <Text
                      style={{
                        color: '#F8F8F8',
                        fontWeight: '500',
                        fontSize: 12,
                      }}>
                      Expiration Year
                    </Text>
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          borderColor: '#FFFFFF',
                        },
                      ]}
                      keyboardType="numeric"
                      onChangeText={setexpiration_year}
                      value={expiration_year}
                      placeholder="Year"
                      placeholderTextColor="white"
                    />
                  </View>
                </View>
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
                  data={coin_type}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select a coin'}
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
                    setpayment_coin_type(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            )}
          </LinearGradient>

          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 10}}
            onPress={onSubmitForm}>
            <ImageBackground
              style={{
                height: 60,
                width: 155,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/button.png')}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#FFFFFF'}}>
                Buy Now
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {/* // payment type ends here */}
        {/* </View> */}
      </ScrollView>
    </ImageBackground>
  );
};

const BuyCoinsHistory = props => {
  const [access_token, setaccess_token] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@access_token');
      if (value !== null) {
        // value previously stored
        setaccess_token(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    getHistory();
  }, []);

  const getHistory = () => {
    API.get(urls.BASE_URL + 'buy-coin-history-app?limit=10&search=100&page=1')
      .then(function (response) {
        if (response.data.success == true) {
          setBuycoinHistoryData(response.data.data.data);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };
  const [BuycoinHistoryData, setBuycoinHistoryData] = useState([]);

  const wait = timeout => {
    // Defined the timeout function for testing purpose
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getHistory();
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  const renderItem = (item, index) => {
    return (
      <LinearGradient
        colors={['#222441', '#050506']}
        style={{
          // height: '28%',
          backgroundColor: '#15172C',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          flexDirection: 'column',
          marginTop: '3%',
          borderWidth: 1,
          borderColor: '#403F62',
        }}>
        <View style={{}}>
          <Text style={styles.input}>
            Address : <Text style={{color: '#fff'}}>{item.item.address}</Text>
          </Text>
          <Text style={styles.input}>
            Coin Amount : <Text style={{color: '#fff'}}> {item.item.coin}</Text>
          </Text>
          <Text style={styles.input}>
            Coin Name :{' '}
            <Text style={{color: '#fff'}}> {item.item.coin_type}</Text>
          </Text>
          <Text style={styles.input}>
            Payment Type :{' '}
            <Text style={{color: '#fff'}}> {item.item.coin_type}</Text>
          </Text>
          <Text style={styles.input}>
            Status : <Text style={{color: '#fff'}}> {item.item.status}</Text>
          </Text>
          <Text style={styles.input}>
            Created At :{' '}
            <Text style={{color: '#fff'}}> {item.item.created_at}</Text>
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{height: '90%'}}>
      <ImageBackground
        style={{
          // height: '100%',
          backgroundColor: '#15172C',
          paddingBottom: 2,
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../assets/Lines-PNG-Transparent-Image.png')}>
        {BuycoinHistoryData.length > 0 ? (
          <FlatList
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={renderItem}
            data={BuycoinHistoryData}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          ''
        )}
      </ImageBackground>
    </View>
  );
};

export default BuyCoins;

const styles = StyleSheet.create({
  input: {
    // height: 50,
    // margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#191B2E',
    color: '#808080',
    width: '90%',
    alignSelf: 'center',
    fontSize: 13,
  },
  input2: {
    height: 30,
    width: '60%',
    marginTop: 10,
    borderBottomWidth: 1,
    padding: 6,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
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
});

// export default BuyCoins;
