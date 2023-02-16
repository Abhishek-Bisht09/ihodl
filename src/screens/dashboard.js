import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Button,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {urls} from '../utils/api';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MarqueeText from 'react-native-marquee';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import API from '../api/services';

const Dashboard = props => {
  const [DepositList, SetDepositList] = useState(true);
  const [WithdrawList, SetWithdrawList] = useState(false);

  const onCLickDepositList = e => {
    SetWithdrawList(false);
    SetDepositList(true);
  };
  const onClickWithdrawList = e => {
    SetWithdrawList(true);
    SetDepositList(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(79,174,253, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {fontSize: 5},
    propsForDots: {
      // r: '6',
      strokeWidth: '2',
      stroke: '#fff',
    },
  };

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [3, 6, 9, 12, 3, 6, 9, 12, 6, 9, 12, 3],
        color: (opacity = 1) => `rgba(79,174,253, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Deposit'], // optional
  };

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [wallet_name, setwallet_name] = useState('');
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

  const onSubmitForm = () => {
    let formData = new FormData();
    formData.append('type', value);
    formData.append('wallet_name', wallet_name);
    formData.append('coin_type', value2);
    API.post(urls.BASE_URL + 'create-wallet', formData)
      .then(function (response) {
        setModalVisible(false);
        setModal2Visible(false);
        // setLoader(false)
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
        } else {
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
    <View style={{backgroundColor: '#15172C', height: '100%'}}>
      <View
        style={{
          height: responsiveScreenHeight(7),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#131222',
          paddingBottom: 5,
        }}>
        <View>
          <TouchableOpacity
            style={{top: 6, left: 14}}
            onPress={() => props.navigation.openDrawer()}>
            <Image
              style={{height: 23, width: 23}}
              source={require('../assets/top_menu.png')}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 20,
            color: '#FFFFFF',
            top: '2%',
          }}>
          Dashboard
        </Text>
        <View
          style={{
            right: 5,
            flexDirection: 'row',
            // width: '10%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{top: 6, right: 5}}
            onPress={() => props.navigation.push('Login')}>
            <Image
              style={{height: 18, width: 17}}
              source={require('../assets/switch.png')}
            />
          </TouchableOpacity>
          {/* <Image
            style={{height: 19, width: 17, top: 6}}
            source={require('../assets/notification.png')}
          /> */}
        </View>
      </View>
      <ScrollView>
        {/* <MarqueeText
        style={{fontSize: 24, color: 'white'}}
        speed={1}
        marqueeOnStart={true}
        loop={true}
        delay={1000}>
        Trending Headline, Trending Headline, Trending Headline, Trending
        Headline
      </MarqueeText> */}

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#15172C',
            // height: 35,
            width: '95%',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              // backgroundColor:'#1F213E',
              backgroundColor: '#272b5c',
              height: 150,
              borderRadius: 9,
              width: '30%',
              padding: '2%',
              alignSelf: 'center',
              marginTop: '2%',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <View>
              <Image
                style={{height: 22, width: 22, top: 10, tintColor: '#fff'}}
                source={require('../assets/money.png')}
              />
              <Text
                style={{
                  color: '#6F97FF',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 15,
                  textAlign: 'left',
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: 12,
                  marginTop: 10,
                  color: '#808080',
                  // top: 10,
                  textAlign: 'left',
                }}>
                Available Coin
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  marginTop: 10,
                  color: '#FFFFFF',
                  // top: 10,
                  textAlign: 'left',
                }}>
                8907005.9968786
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              // backgroundColor:'#1F213E',
              backgroundColor: '#272b5c',
              height: 150,

              borderRadius: 9,
              width: '30%',
              // height: 125,
              padding: '2%',
              alignSelf: 'center',
              marginTop: '2%',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <View>
              <Image
                style={{height: 22, width: 22, top: 10, tintColor: '#fff'}}
                source={require('../assets/currencyNotes.png')}
              />
              <Text
                style={{
                  color: '#6F97FF',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 15,
                  textAlign: 'left',
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontWeight: '300',

                  fontSize: 12,
                  marginTop: 10,
                  color: '#808080', // top: 10,
                  textAlign: 'left',
                }}>
                Available Coin
              </Text>
              <Text
                style={{
                  fontWeight: '600',

                  fontSize: 14,
                  marginTop: 10,
                  color: '#FFFFFF',
                  // top: 10,
                  textAlign: 'left',
                }}>
                8907005.9968786
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              backgroundColor: '#272b5c',
              height: 150,
              borderRadius: 9,
              width: '30%',
              padding: '2%',
              alignSelf: 'center',
              marginTop: '2%',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <View>
              <Image
                style={{height: 22, width: 22, top: 10, tintColor: '#fff'}}
                source={require('../assets/money.png')}
              />
              <Text
                style={{
                  color: '#6F97FF',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 15,
                  textAlign: 'left',
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: 12,
                  marginTop: 10,
                  color: '#808080', // top: 10,
                  textAlign: 'left',
                }}>
                Available Coin
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  marginTop: 10,
                  color: '#FFFFFF',
                  textAlign: 'left',
                }}>
                8907005.9968786
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={{marginTop: 15, marginHorizontal: 10}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Deposit & Withdraw
          </Text>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              backgroundColor: '#272b5c',
              borderRadius: 20,
              marginTop: '2%',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <LineChart
              data={data}
              width={Dimensions.get('screen').width * 0.9}
              height={220}
              chartConfig={chartConfig}
            />
          </LinearGradient>
        </View>

        <View style={{marginTop: 15, marginHorizontal: 10}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Buy Coin Report
          </Text>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={{
              backgroundColor: '#272b5c',
              borderRadius: 20,
              marginTop: '2%',
              borderWidth: 1,
              borderColor: '#403F62',
            }}>
            <LineChart
              data={{
                labels: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('screen').width * 0.9} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#222441',
                backgroundGradientFrom: '#222441',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#050506',
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(79,174,253, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  // r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
              }}
              bezier
              style={{
                // marginVertical: 8,
                borderRadius: 16,
                padding: 5,
              }}
            />
          </LinearGradient>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            marginLeft: 15,
          }}>
          {DepositList ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={onCLickDepositList}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 15,
                  }}>
                  Deposit List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickWithdrawList}>
                <Text
                  style={{
                    color: '#808080',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 15,
                  }}>
                  Withdraw List
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}
          {WithdrawList ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={onCLickDepositList}>
                <Text
                  style={{
                    color: '#808080',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 15,
                  }}>
                  Deposit List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickWithdrawList}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 15,
                  }}>
                  Withdraw List
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}
          <TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                marginRight: 20,
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        {DepositList ? (
          <View style={{marginTop: 15}}>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
          </View>
        ) : (
          ''
        )}
        {WithdrawList ? (
          <View style={{marginTop: 15}}>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                marginTop: '5%',
                paddingVertical: 1,
                borderWidth: 1,
                borderColor: '#403F62',
              }}>
              <View style={{bottom: '5%'}}>
                <Text style={styles.input}>
                  Address :
                  <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5...</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Amount :<Text style={{color: '#fff'}}> 3.00 USDT</Text>
                </Text>
                <Text style={styles.input}>
                  Transaction :
                  <Text style={{color: '#fff'}}> mU7A1ZJ2Ti7X9i6i...</Text>
                </Text>
                <Text style={styles.input}>
                  Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
                </Text>
                <Text style={styles.input}>
                  Created At :
                  <Text style={{color: '#fff'}}> 16 September 2022 </Text>|{' '}
                  <Text style={{color: '#4FAEFD'}}>06 : 00 AM</Text>
                </Text>
              </View>
            </LinearGradient>
          </View>
        ) : (
          ''
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    width: '106%',
    bottom: '10%',
    marginTop: '18%',
  },
  modalView1: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    width: '106%',
    bottom: '10%',
    marginTop: '18%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#6F97FF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdown: {
    margin: 16,
    height: 35,
    width: '98%',
    alignSelf: 'center',
    borderColor: '#808080',
    borderBottomWidth: 1,
    // padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    // elevation: 2,
    bottom: '7%',
  },
  dropdown2: {
    margin: 16,
    height: 35,
    width: '98%',
    alignSelf: 'center',
    borderColor: '#808080',
    borderBottomWidth: 1,
    // padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    // elevation: 2,
    bottom: '24%',
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
    fontSize: 12,
    color: '#FFFFFF',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 14,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderColor: '#191B2E',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default Dashboard;
