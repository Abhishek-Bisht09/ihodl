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
  TouchableHighlight,
  Modal,
  Pressable,
  ScrollView,
  Button,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {APP_URLS} from '../api/urls';
import API from '../api/services';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {urls} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TransactionHistory = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  let dd = date.getDate();
  let mm = date.getUTCMonth() + 1;
  let yy = date.getFullYear();
  let new_date = `${dd}-${mm}-${yy}`;

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');

  const gettingToken = async () => {
    const tok = await AsyncStorage.getItem('@access_token');
    setToken(tok);
  };

  useEffect(() => {
    gettingToken();
  }, [token]);

  const [date2, setDate2] = useState(new Date());
  let dd2 = date2.getDate();
  let mm2 = date2.getUTCMonth() + 1;
  let yy2 = date2.getFullYear();
  let new_date2 = `${dd2}-${mm2}-${yy2}`;

  const [open2, setOpen2] = useState(false);
  const data = [
    {label: 'pdf', value: '1'},
    {label: 'csv', value: '2'},
  ];
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const [transactionHistory, transactionHistory_] = useState([]);
  const [error, error_] = useState('');
  const [errorFrom, errorFrom_] = useState('');
  const [errorTo, errorTo_] = useState('');
  const [errorShow, errorShow_] = useState(false);
  const [errorShowFrom, errorShowFrom_] = useState(false);
  const [errorShowTo, errorShowTo_] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    API.get(APP_URLS.TRANSACTION_HISTORY)

      .then(function (response) {
        if (response.data.success == true) {
          transactionHistory_(response.data.data.data);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'Error',
          text1: error.message,

        });
      });
  };
  const [isRefreshing, setIsRefreshing] = useState(false);
   const wait = timeout => {
     // Defined the timeout function for testing purpose
     return new Promise(resolve => setTimeout(resolve, timeout));
   };
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getData();
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  const renderItem = (item, index) => {
    let date = item.item.created_at;
    let timming = date.slice(11);
    let date_new = date.slice(0, 11);

    return (
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
            <Text style={{color: '#fff'}}>
              {' '}
              {item.item.address ? item.item.address : 'N/A'}
            </Text>
          </Text>
          <Text style={styles.input}>
            Coin Amount :
            <Text style={{color: '#fff'}}>
              {' '}
              {item.item.amount} {item.item.coin_type}
            </Text>
          </Text>
          <Text style={styles.input}>
            Transaction :
            <Text style={{color: '#fff'}}>
              {' '}
              {item.item.transaction_id ? item.item.transaction_id : 'N/A'}
            </Text>
          </Text>
          <Text style={styles.input}>
            Status : <Text style={{color: '#4FAEFD'}}>Accepted</Text>
          </Text>
          <Text style={styles.input}>
            Created At :<Text style={{color: '#fff'}}> {date_new} </Text>|{' '}
            <Text style={{color: '#4FAEFD'}}>{timming}</Text>
          </Text>
        </View>
      </LinearGradient>
    );
  };

  const validate = () => {
    let flag = false;
    if (date > date2) {
      errorShowFrom_(true);
      flag = true;
      errorFrom_('Start Date should be smaller than end date');
    } else {
      errorShowFrom_(false);
      errorFrom_('');
    }
    if (date2 > new Date()) {
      errorShowTo_(true);
      errorTo_("End Date can't be greater than current date");
      flag = true;
    } else {
      errorShowTo_(false);
      errorTo_('');
    }
    if (label === '') {
      errorShow_(true);
      error_('Choose a File type');
      flag = true;
    } else {
      errorShow_(false);
      error_('');
    }
    return flag;
  };

  const [file_url, setfile_url] = useState('');

  const downloadFile = fileLink => {
    const formData = {
      end_date: new_date2,
      file_type: label,
      start_date: new_date,
    };

    API.post(fileLink, formData)
      .then(res => {
        setfile_url(res.data.data.file_url);
      })
      .catch(err => {
        console.log(err, 'errrrrr');
      });

    let date = new Date();
    let FILE_URL = file_url;
    console.log(FILE_URL);
    let file_ext = getFileExtention(FILE_URL);
    file_ext = '.' + file_ext[0];

    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    var fPath =
      RootDir +
      '/file_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      file_ext;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: fPath,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL, {
        Authorization: 'Bearer ' + token,
      })
      .then(res => {
         RNFetchBlob.android.actionViewIntent(
           res.path(),
           'application',
         );
        alert('File Downloaded Successfully.');
      });
  };
  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const requestStoragepermission = async () => {
    if (!validate()) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission',
            message: '',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile(urls.BASE_URL + 'download-transactions-pdf');
        } else {
          downloadFile(urls.BASE_URL + 'download-transactions-pdf');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <View style={{height: '100%', backgroundColor: '#15172C'}}>
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
            style={styles.modalView}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', bottom: '4%', left: '5%'}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../assets/cross.png')}
              />
            </TouchableOpacity>
            <ScrollView style={{width: Dimensions.get('screen').width * 0.8}}>
              <Text style={[styles.textStyle]}>
                Export Your Transaction History into PDF or CSV
              </Text>
              <Text
                style={[
                  {
                    marginTop: '4%',
                    color: '#54555C',
                    fontWeight: '500',
                    fontSize: 14,
                    textAlign: 'center',
                  },
                ]}>
                if you want to download complete transactions, just click on
                download button.
              </Text>
              <View
                style={{
                  marginTop: '2%',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: 12, color: '#54555C'}}>
                  From
                </Text>
                <TouchableOpacity
                  style={{
                    height: 35,
                    width: '100%',
                    color: '#FFFFFF',
                    justifyContent: 'space-between',
                    borderBottomWidth: 2,
                    borderBottomColor: '#191B2E',
                    flexDirection: 'row',
                    marginTop: '2%',
                  }}
                  onPress={() => setOpen(true)}>
                  <Text style={{color: '#FFFFFF'}}>{new_date}</Text>
                  <Image
                    style={{height: 11, width: 10}}
                    source={require('../assets/calender.png')}
                  />
                </TouchableOpacity>
                {errorShowFrom == true ? (
                  <Text style={{color: 'red'}}>{errorFrom}</Text>
                ) : (
                  ''
                )}
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    marginTop: '3%',
                    color: '#54555C',
                  }}>
                  To
                </Text>
                <TouchableOpacity
                  style={{
                    height: 35,
                    width: '100%',
                    color: '#FFFFFF',
                    justifyContent: 'space-between',
                    borderBottomWidth: 2,
                    borderBottomColor: '#191B2E',
                    flexDirection: 'row',
                    marginTop: '2%',
                  }}
                  onPress={() => setOpen2(true)}>
                  <Text style={{color: '#FFFFFF'}}>{new_date2}</Text>
                  <Image
                    style={{height: 11, width: 10}}
                    source={require('../assets/calender.png')}
                  />
                </TouchableOpacity>
                {errorShowTo == true ? (
                  <Text style={{color: 'red'}}>{errorTo}</Text>
                ) : (
                  ''
                )}
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    marginTop: '3%',
                    color: '#54555C',
                  }}>
                  {' '}
                  File Type{' '}
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
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={'Choose a type'}
                  itemTextStyle={{color: 'white'}}
                  activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                  containerStyle={{
                    backgroundColor: '#191B2E',
                    borderRadius: 12,
                  }}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(item);
                    setLabel(item.label);
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                {errorShow == true ? (
                  <Text style={{color: 'red'}}>{error}</Text>
                ) : (
                  ''
                )}
                <TouchableOpacity
                  style={{marginTop: 20}}
                  onPress={requestStoragepermission}>
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
                      Download
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>

              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setDate(date);
                  setOpen(false);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <DatePicker
                modal
                mode="date"
                open={open2}
                date={date2}
                onConfirm={date2 => {
                  setDate2(date2);
                  setOpen2(false);
                }}
                onCancel={() => {
                  setOpen2(false);
                }}
              />
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      <View
        style={{
          // height: '20%',
          // borderColor: 'red',
          // borderWidth: 2,
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
              Transaction History
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../assets/button.png')}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#FFFFFF'}}>
              Export History
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
          {/* <View
              style={{
                height: '100%',
                backgroundColor: '#15172C',
              }}> */}
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 15,
                  color: '#FFFFFF',
                  marginLeft: 22,
                  marginTop: '2%',
                }}>
                Coins Swap History
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                marginTop: '2%',
                paddingBottom: '2%',
              }}>
              <TextInput
                style={{
                  height: 37,
                  alignSelf: 'center',
                  width: '100%',
                  borderWidth: 1,
                  // padding: 10,
                  borderColor: '#191B2E',
                  color: '#808080',
                  borderRadius: 10,
                }}
                placeholder="Search..."
                placeholderTextColor="#808080"></TextInput>
              <Image
                style={{
                  top: '3%',
                  right: 28,
                  height: 18,
                  width: 18,
                  tintColor: '#808080',
                }}
                source={require('../assets/search.png')}
              />
            </View>
          </View>
          {transactionHistory.length > 0 ? (
            <FlatList
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              renderItem={renderItem}
              data={transactionHistory}
              keyExtractor={(item, index) => String(index)}
            />
          ) : (
            ''
          )}
        </ScrollView>
      </ImageBackground>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    // top: '2.9%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input2: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
  },
  dropdown: {
    margin: 16,
    height: 35,
    width: '90%',
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  textItem: {
    flex: 1,
    top: '2.9%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
  },
  modalView: {
    // width: Dimensions.get('screen').width * 0.7 ,
    borderWidth: 1,
    borderColor: '#403F62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 35,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '65%',
    width: '90%',
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
  bodyContent: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '30%',
    width: '90%',
    bottom: '3%',
  },
});

export default TransactionHistory;
