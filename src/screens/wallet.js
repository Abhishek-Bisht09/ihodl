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
  BackHandler,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {urls} from '../utils/api';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {removeUser} from '../redux/actions/user_actions';
import {APP_URLS} from '../api/urls';
import API from '../api/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = props => {
  const data = [
    {label: 'Personal Wallet', value: '1'},
    {label: 'Multi-Signature Wallet', value: '2'},
  ];
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [wallet_name, setwallet_name] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const dispatch = useDispatch();

  const [wallet_list, setwallet_list] = useState([]);
  const [coin_list, setcoin_list] = useState([]);

  const [errorwallettype, seterrorwallettype] = useState('');
  const [errorwalletname, seterrorwalletname] = useState('');
  const [errorcoin_type, seterrorcoin_type] = useState('');

  useEffect(() => {
    getWallet();
    getCoins();
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (!props.navigation.isFocused()) {
        return false;
      }
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [props.navigation]);

  const getWallet = () => {
    API.get(APP_URLS.WALLET_LIST)
      .then(function (response) {
        setwallet_list(response.data.data.data);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const getCoins = () => {
    API.get(APP_URLS.GET_COINS)
      .then(function (response) {
        let final_list = [];
        let newArr = response.data.coins.data;
        for (let i = 0; i < newArr.length; i++) {
          final_list.push({label: newArr[i].name, value: newArr[i].type});
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

  const onChangeBuy = e => {
    setModalVisible(false);
    props.navigation.navigate('BuyCoins');
  };
  const onChangeSwap = e => {
    setModalVisible(false);
    props.navigation.navigate('SwapCoins');
  };

  const validate = () => {
    let flag = false;

    if (value === '' || value === null || value === undefined) {
      seterrorwallettype('Wallet Type is Required');
      flag = true;
    } else {
      seterrorwallettype('');
    }

    if (
      wallet_name === '' ||
      wallet_name === null ||
      wallet_name === undefined
    ) {
      seterrorwalletname('Wallet Name is Required');
      flag = true;
    } else {
      seterrorwalletname('');
    }

    if (value2 === '' || value2 === null || value2 === undefined) {
      seterrorcoin_type('Coin Type is Required');
      flag = true;
    } else {
      seterrorcoin_type('');
    }

    return flag;
  };

  const onOpenModal2 = () => {
    setModal2Visible(true);
    setValue('');
    setwallet_name('');
    setValue2('');
  };

  const onAddWallet = () => {
    if (!validate()) {
      let formData = {
        type: value,
        wallet_name: wallet_name,
        coin_type: value2,
      };
      console.log('check ---->', formData);
      API.post(urls.BASE_URL + 'create-wallet', formData)
        .then(function (response) {
          setModalVisible(false);
          setModal2Visible(false);
          getWallet();
          // setLoader(false)
          if (response.data.success == true) {
            Alert.alert('Success', response.data.message);
          } else {
            Alert.alert('Error', response.data.message);
          }
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    }
  };

  async function removingItem() {
    // await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.clear();
  }

  const Logout = () => {
    removingItem();
    dispatch(removeUser());
    props.navigation.navigate('Login');
  };

  const Modal2Close = () => {
    setModal2Visible(!modal2Visible);
    seterrorwallettype('');
    seterrorwalletname('');
    seterrorcoin_type('');
  };

  return (
    <View style={{backgroundColor: '#15172C', height: '100%'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={styles.modalView1}>
            <ImageBackground
              style={{width: '110%', right: '6%', top: '5%'}}
              source={require('../assets/tansparent_lines.png')}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  left: '6%',
                  bottom: '5%',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', bottom: '4%', right: '4%'}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../assets/cross.png')}
                  />
                </TouchableOpacity>

                <Image
                  style={{height: 60, width: 60}}
                  source={require('../assets/bte.png')}
                />
                <Text style={[styles.textStyle, {marginTop: '2%'}]}>
                  BTC COINS
                </Text>
                <Text
                  style={[
                    {
                      marginTop: '3%',
                      color: '#FFFFFF',
                      fontWeight: '700',
                      fontSize: 14,
                    },
                  ]}>
                  Total Balance - 7.49 EUR
                </Text>
                <Text
                  style={[
                    {
                      marginTop: '3%',
                      color: '#FFFFFF',
                      fontWeight: '400',
                      fontSize: 12,
                    },
                  ]}>
                  + 0.13% | +0.01
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '7%',
                    width: '58%',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity style={{right: '8%'}}>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={require('../assets/round_icon.png')}>
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../assets/pocket_send.png')}
                      />
                      <Text
                        style={[
                          {
                            marginTop: '2%',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            fontSize: 9,
                          },
                        ]}>
                        Send
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{left: '8%'}}>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={require('../assets/round_icon.png')}>
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../assets/pocket_receive.png')}
                      />
                      <Text
                        style={[
                          {
                            marginTop: '2%',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            fontSize: 9,
                          },
                        ]}>
                        Recieve
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '58%',
                    justifyContent: 'space-between',
                    marginBottom: '2%',
                    marginTop: '3%',
                  }}>
                  <TouchableOpacity
                    style={{right: '8%'}}
                    onPress={onChangeSwap}>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={require('../assets/round_icon.png')}>
                      <Image
                        style={{height: 19, width: 19}}
                        source={require('../assets/pocket_swap.png')}
                      />
                      <Text
                        style={[
                          {
                            marginTop: '2%',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            fontSize: 9,
                          },
                        ]}>
                        Swap
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{left: '8%'}} onPress={onChangeBuy}>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={require('../assets/round_icon.png')}>
                      <Image
                        style={{height: 19, width: 19}}
                        source={require('../assets/pocket_buy.png')}
                      />
                      <Text
                        style={[
                          {
                            marginTop: '2%',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            fontSize: 9,
                          },
                        ]}>
                        Buy
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>
      </Modal>

      {/* modal 2 */}

      <Modal isVisible={modal2Visible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={[styles.modalView]}>
            <TouchableOpacity onPress={Modal2Close}>
              <Image
                style={{height: 25, width: 25, alignSelf: 'flex-end'}}
                source={require('../assets/cross.png')}
              />
            </TouchableOpacity>

            <ScrollView>
              <Text
                style={[
                  {
                    color: '#F8F8F8',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 16,
                    // width: '60%',
                    // marginLeft: '17%',
                  },
                ]}>
                Want To Add New Wallet?
              </Text>

              <View style={{width: '100%', marginTop: '8%'}}>
                <Text
                  style={[
                    {
                      // marginTop: '8%',
                      color: '#808080',
                      fontWeight: '500',
                      fontSize: 12,
                      left: '1%',
                    },
                  ]}>
                  Wallet Type
                </Text>
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
                  containerStyle={{
                    backgroundColor: '#191B2E',
                    borderRadius: 12,
                  }}
                  itemTextStyle={{color: 'white'}}
                  activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !isFocus ? 'Select Wallet Type' : 'Select Wallet Type'
                  }
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                <Text style={{color: '#B1003F', marginLeft: '2%'}}>
                  {errorwallettype}
                </Text>
                <Text
                  style={[
                    {
                      color: '#808080',
                      fontWeight: '500',
                      fontSize: 12,
                      left: '1%',
                      marginTop: '3%',
                    },
                  ]}>
                  Wallet Name
                </Text>
                <TextInput
                  style={[
                    {
                      height: 37,
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      color: '#F8F8F8',
                      width: '99%',
                      // bottom: '18%',
                    },
                  ]}
                  onChangeText={setwallet_name}
                  // value={Email}
                  placeholder="Your Wallet Name"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                />
                <Text style={{color: '#B1003F', marginLeft: '2%'}}>
                  {errorwalletname}
                </Text>
                <View>
                  <Text
                    style={[
                      {
                        marginTop: '3%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        left: '1%',
                      },
                    ]}>
                    Coin Type
                  </Text>
                  <Dropdown
                    search={true}
                    searchPlaceholder={'Search .....'}
                    style={[
                      styles.dropdown,
                      isFocus && {
                        borderColor: 'white',
                        backgroundColor: '#191B2E',
                      },
                    ]}
                    inputSearchStyle={{color: '#fff'}}
                    placeholderStyle={styles.placeholderStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={coin_list}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select a coin'}
                    itemTextStyle={{color: 'white'}}
                    value={value2}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue2(item.value);
                      setIsFocus(false);
                    }}
                  />
                  <Text style={{color: '#B1003F', marginLeft: '2%'}}>
                    {errorcoin_type}
                  </Text>
                </View>

                <TouchableOpacity style={{marginTop: 30}} onPress={onAddWallet}>
                  <ImageBackground
                    style={{
                      height: 60,
                      width: 155,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('../assets/button.png')}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#FFFFFF',
                        alignSelf: 'center',
                      }}>
                      Add Wallet
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* modal 2 end */}
      <View
        style={{
          // height: '21%',
          // borderColor: 'red',
          // borderWidth: 2,
          backgroundColor: '#131222',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingBottom: 15,
        }}>
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
            iHODL Wallet
          </Text>
          <View
            style={{
              right: 15,
              flexDirection: 'row',
              // width: '10%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={{top: 6}} onPress={Logout}>
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

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity style={{}} onPress={onOpenModal2}>
            <ImageBackground
              style={{
                height: 60,
                width: 155,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/button.png')}>
              <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '600'}}>
                Add wallet
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: '#15172C',
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          paddingBottom: 5,
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../assets/Lines-PNG-Transparent-Image.png')}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#15172C',
            height: 35,
            marginTop: '3%',
          }}>
          <View style={{justifyContent: 'center', width: '53%'}}>
            <Text style={{color: '#F8F8F8', fontWeight: '500', left: '14%'}}>
              Name
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: '#F8F8F8', fontWeight: '500'}}>Balance</Text>
          </View>
        </View>
        <ScrollView>
          {wallet_list.map((rowitem, index) => (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <LinearGradient
                colors={['#1F213E', '#050506']}
                style={{
                  // backgroundColor:'#1F213E',
                  flexDirection: 'row',
                  backgroundColor: '#272b5c',
                  height: 40,
                  borderRadius: 9,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '2%',
                }}>
                <View style={{width: '50%', alignItems: 'flex-start'}}>
                  {/* {rowitem.coin ? (
                  <Image
                    style={{height: 22, width: 22, top: 10, marginLeft: '5%'}}
                    source={{
                      uri: rowitem.coin,
                    }}
                  />
                ) : (
                  <Image
                    style={{height: 22, width: 22, top: 10, marginLeft: '5%'}}
                    source={require('../assets/error_icon.png')}
                  />
                )} */}
                  <Text
                    style={{
                      marginLeft: '10%',
                      // bottom: 10,
                      top: 10,
                      color: '#6F97FF',
                      fontSize: 12,
                      fontWeight: '600',
                      // alignSelf:'center'
                    }}>
                    {rowitem.coin_type}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 12,
                    marginTop: '3%',
                    color: '#FFFFFFCC',
                  }}>
                  {rowitem.balance}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
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
    marginTop: '2%',
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
  input: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
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

export default Home;
