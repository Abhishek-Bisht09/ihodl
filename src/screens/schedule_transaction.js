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
  Button,
  Dimensions,
} from 'react-native';
import {urls} from '../utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const ScheduleTransaction = props => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#15172C'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <LinearGradient
              colors={['#222441', '#050506']}
              style={{
                backgroundColor: '#15172C',
                height: '62%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                flexDirection: 'column',
                // marginTop: '2%',
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: '#191B2E',
                // height: '70%'
              }}>
              {/* <View style={styles.modalView}> */}
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  right: '2%',
                  // top:'2%'
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../assets/cross.png')}
                />
              </TouchableOpacity>
              <ScrollView>
                <Text style={[styles.textStyle]}>Schedule New Transaction</Text>
                <Text
                  style={[
                    {
                      marginTop: '2%',
                      color: 'red',
                      fontWeight: '600',
                      fontSize: 10,
                      paddingHorizontal: 5,
                      textAlign: 'center',
                    },
                  ]}>
                  Note: Since February has 28 days, If you select recurring
                  payment on 29,30, It will be made on 28 February.
                </Text>
                <View
                  style={{
                    marginTop: '4%',
                    width: '90%',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 11,
                      color: '#808080',
                      marginLeft: 18,
                    }}>
                    Select Your Crypto Coins Wallet
                  </Text>

                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      width: '90%',
                      alignSelf: 'center',
                      height: 40,
                      // marginTop: '2%'
                    }}
                    placeholder="Enter Wallet"
                    placeholderTextColor={'#fff'}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 11,
                      color: '#808080',
                      marginLeft: 18,
                      marginTop: '1%',
                    }}>
                    Coin Amount Per User
                  </Text>

                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      width: '90%',
                      alignSelf: 'center',
                      height: 40,
                    }}
                    placeholder="Enter Wallet"
                    placeholderTextColor={'#fff'}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 11,
                      color: '#808080',
                      marginLeft: 18,
                      marginTop: '1%',
                    }}>
                    Date *
                  </Text>

                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      width: '90%',
                      alignSelf: 'center',
                      height: 40,
                    }}
                    placeholder="Enter Wallet"
                    placeholderTextColor={'#fff'}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 11,
                      color: '#808080',
                      marginLeft: 18,
                      marginTop: '1%',
                    }}>
                    User Group Address
                  </Text>

                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      width: '90%',
                      alignSelf: 'center',
                      height: 40,
                    }}
                    placeholder="Enter Wallet"
                    placeholderTextColor={'#fff'}
                  />
                  <TouchableOpacity
                    style={{marginTop: 25, padding: 5}}
                    // onPress={onSubmitForm}
                  >
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
                        Schedule
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        </Modal>
        <View
          style={{
            // height: '21%',
            // borderColor: 'red',
            // borderWidth: 2,
            backgroundColor: '#131222',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: '#131222',
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
                Schedule Transaction
              </Text>
            </View>
            <Text> </Text>
          </View>

          <TouchableOpacity
            style={{alignSelf: 'center', paddingVertical: 10}}
            onPress={() => setModalVisible(true)}>
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
                Schedule
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <ImageBackground
          style={{
            height: Dimensions.get('screen').height,
            // width: '100%',
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
            <View style={{height: '90%'}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  // backgroundColor: '#15172C',
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 20,
                  flexDirection: 'column',
                  marginTop: '2%',
                  paddingVertical: 2,
                  borderWidth: 1,
                  borderColor: '#403F62',
                }}>
                <View style={{bottom: '5%'}}>
                  <Text style={styles.input}>
                    Address :
                    <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5... </Text>
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
                  marginTop: '2%',
                  paddingVertical: 2,
                  borderWidth: 1,
                  borderColor: '#403F62',
                }}>
                <View style={{bottom: '5%'}}>
                  <Text style={styles.input}>
                    Address :
                    <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5... </Text>
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
                  marginTop: '2%',
                  paddingVertical: 2,
                  borderWidth: 1,
                  borderColor: '#403F62',
                }}>
                <View style={{bottom: '5%'}}>
                  <Text style={styles.input}>
                    Address :
                    <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5... </Text>
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
                  marginTop: '2%',
                  paddingVertical: 2,
                  borderWidth: 1,
                  borderColor: '#403F62',
                }}>
                <View style={{bottom: '5%'}}>
                  <Text style={styles.input}>
                    Address :
                    <Text style={{color: '#fff'}}> 3FXFTDdSpkpnLD7s5... </Text>
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
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#54555C',
    fontWeight: '500',
    fontSize: 14,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderColor: '#191B2E',
  },
  centeredView: {
    flex: 1,
    // top: '2.9%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
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
    height: '55%',
    width: '94%',
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
    color: '#F8F8F8',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ScheduleTransaction;
