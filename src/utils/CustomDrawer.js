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
  useWindowDimensions,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const CustomDrawer = props => {
  const [selectedOption, setselectedOption] = useState(1);
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  let Data = useSelector(state => state.userReducer);

  useEffect(() => {
    func();
  }, []);

  const func = async () => {
    setfirst_name(Data.user.user_info.first_name);
    setlast_name(Data.user.user_info.last_name);
  };

  const onPress1 = e => {
    setselectedOption(1);
    props.navigation.navigate('iHodlWallet');
  };

  const onPress2 = e => {
    setselectedOption(2);
    props.navigation.navigate('SwapCoins');
  };

  const onPress3 = e => {
    setselectedOption(3);
    props.navigation.navigate('Transaction');
  };

  const onPress4 = e => {
    setselectedOption(4);
    props.navigation.navigate('Profile');
  };

  const onPress5 = e => {
    setselectedOption(5);
    props.navigation.navigate('Activity');
  };

  const onPress6 = e => {
    setselectedOption(6);
    props.navigation.navigate('ChangePassword');
  };

  const onPress7 = e => {
    setselectedOption(7);
    props.navigation.navigate('AddressBook');
  };

  const onPress8 = e => {
    setselectedOption(8);
    props.navigation.navigate('Settings');
  };

  const onPress9 = e => {
    setselectedOption(9);
    props.navigation.navigate('Schedule Transaction');
  };
  const onPress10 = e => {
    setselectedOption(10);
    props.navigation.navigate('FAQs');
  };
  const onPress11 = e => {
    setselectedOption(11);
    props.navigation.navigate('Offers');
  };

  const onPress12 = e => {
    setselectedOption(12);
    props.navigation.navigate('Send/Receive');
  };

  const onPress13 = e => {
    setselectedOption(13);
    props.navigation.navigate('BuyCoins');
  };

  const onPress14 = e => {
    setselectedOption(14);
    props.navigation.navigate('Dashboard');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131222',
      }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          {
            // backgroundColor:'red',
          }
        }>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#131222',
            // bottom: 25,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 21,
              color: '#FFFFFF',
              // bottom: '10%',
              textAlign: 'center',
            }}>
            Profile
          </Text>
          <ImageBackground
            source={require('../assets/round_icon.png')}
            style={{
              height: 90,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/ed_prof.png')}
              style={{height: 40, width: 34}}
            />
          </ImageBackground>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '500',
              fontSize: 22,
              // marginTop: '5%',
            }}>
            Welcome {first_name} !
          </Text>
          <View
            style={{
              borderBottomColor: '#808080',
              borderBottomWidth: 1,
              width: '100%',
              alignSelf: 'center',
              // bottom: '6%',
              borderStyle: 'dashed',
              marginTop: 15,
            }}
          />
        </View>

        <View style={{marginTop: 2}}>
          {selectedOption == 14 ? (
            <TouchableOpacity onPress={onPress14} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/buycoin.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Dashboard
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress14} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/buycoin.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Dashboard
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 13 ? (
            <TouchableOpacity onPress={onPress13} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/buycoin.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Buy Coins
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress13} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/buycoin.png')}
                />

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Buy Coins
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 12 ? (
            <TouchableOpacity onPress={onPress12} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/SendReceive.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Send/Receive
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress12} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/SendReceive.png')}
                />

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Send/Receive
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 9 ? (
            <TouchableOpacity onPress={onPress9} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/schedule_icon.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Schedule Transaction
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress9} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/schedule_icon.png')}
                />

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Schedule Transaction
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 1 ? (
            <TouchableOpacity onPress={onPress1} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/wallet.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  iHodl Wallet
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress1} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/wallet.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  iHodl Wallet
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {selectedOption == 2 ? (
            <TouchableOpacity onPress={onPress2} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/dashboard_swap.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Swap Coin
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress2} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/dashboard_swap.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Swap Coin
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {selectedOption == 3 ? (
            <TouchableOpacity onPress={onPress3} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/transaction_hist.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Transaction History
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress3} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/transaction_hist.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Transaction History
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {selectedOption == 7 ? (
            <TouchableOpacity onPress={onPress7} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/address_book.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Address Book
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress7} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/address_book.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Address Book
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 11 ? (
            <TouchableOpacity onPress={onPress11} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/offer.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Offers
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress11} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/offer.png')}
                />

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Offers
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 10 ? (
            <TouchableOpacity onPress={onPress10} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/faq.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  FAQs
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress10} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/faq.png')}
                />

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  FAQs
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedOption == 8 ? (
            <TouchableOpacity onPress={onPress8} style={{marginBottom: 10}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '15%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/settings_icon.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '7%',
                    textAlignVertical: 'center',
                  }}>
                  Settings
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress8} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    left: '62%',
                    tintColor: '#7C57FD',
                  }}
                  source={require('../assets/settings_icon.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 17,
                    height: 30,
                    marginLeft: '11%',
                    textAlignVertical: 'center',
                  }}>
                  Settings
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 15,
          color: '#589BFC',
          marginLeft: '10%',
          marginBottom: '4%',
        }}>
        Last Visit
      </Text>

      <Text
        style={{
          fontWeight: '500',
          fontSize: 13,
          color: '#808080',
          marginLeft: '10%',
          marginBottom: '4%',
        }}>
        November 21, 2022, <Text style={{color: '#F8F8F8'}}>7:30 am</Text>
      </Text>

      <View
        style={{
          borderBottomColor: '#808080',
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: '80%',
          alignSelf: 'center',
          marginBottom: '8%',
        }}
      />
      {selectedOption == 4 ? (
        <TouchableOpacity onPress={onPress4}>
          <View style={{flexDirection: 'row', height: 70}}>
            <ImageBackground
              source={require('../assets/round_icon.png')}
              style={{
                height: 48,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '7%',
              }}>
              <Image
                source={require('../assets/ed_prof.png')}
                style={{height: 20, width: 17}}
              />
            </ImageBackground>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 18,
                color: '#F8F8F8',
                marginTop: '3.5%',
                left: '10%',
              }}>
              {first_name} {last_name}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress4}>
          <View style={{flexDirection: 'row'}}>
            <ImageBackground
              source={require('../assets/round_icon.png')}
              style={{
                height: 48,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '7%',
                bottom: '4%',
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: '7%',
                  tintColor: '#fff',
                }}
                source={require('../assets/ed_prof.png')}
              />
            </ImageBackground>

            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: '#F8F8F8',
                // marginTop: '3.5%',
                left: '10%',
              }}>
              {first_name} {last_name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomDrawer;
