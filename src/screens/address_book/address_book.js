import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import {urls} from '../../utils/api';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';
import TabColumn from '../../Components/TabColumn';
import {Row, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import GradientText from '../../utils/gradientTxt';
import Collapsible from 'react-native-collapsible';
import API from '../../api/services';

const AddressBook = props => {
  const TabNames = {AddressBook_: 1, Group: 2};
  const [activeTab, _activeTab] = useState(TabNames.AddressBook_);
  return (
    <View
      style={{
        backgroundColor: '#15172C',
        // borderWidth: 1,
        // borderColor: 'red',
        height: '100%',
      }}>
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
              Address Book {'   '}
            </Text>
          </View>
          <Text> </Text>
        </View>
        <Row marginHorizontal={5}>
          <TabColumn
            heading={'Address Book'}
            isActive={activeTab === TabNames.AddressBook_}
            onPress={() => _activeTab(TabNames.AddressBook_)}
          />
          <TabColumn
            heading={'Group'}
            isActive={activeTab === TabNames.Group}
            onPress={() => _activeTab(TabNames.Group)}
          />
        </Row>
      </View>

      <Box style={{height: '80%'}}>
        {activeTab === TabNames.AddressBook_ && (
          <AddressBook_ items={AddressBook_} />
        )}
        {activeTab === TabNames.Group && <Group items={Group} />}
      </Box>
    </View>
  );
};

const AddressBook_ = props => {
  const SECTIONS = [
    {
      title: 'First',
    },
    {
      title: 'Second',
    },
    {
      title: 'Third',
    },
    {
      title: 'Fourth',
    },
  ];
  const [collapsed, setCollapsed] = useState(true);
  // const [collapsed2, setCollapsed2] = useState(true);
  // const [collapsed3, setCollapsed3] = useState(true);
  const [coin_type, set_coin_type] = useState([]);
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
  ];
  const [payment_type, setpayment_type] = useState('');
  const [coin, setcoin] = useState('');

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  const [value3, setValue3] = useState('');
  const [isFocus3, setIsFocus3] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [full_name, set_full_name] = useState('');
  const [address, set_address] = useState('');
  const [newOne, setnewOne] = useState(false);
  const [newOne2, setnewOne2] = useState(false);
  const [newOne3, setnewOne3] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [coinTypeError, setCoinTypeError] = useState('');
  const [NameError, setNameError] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [address_List, setaddress_List] = useState([]);
  const [titleError, settitleError] = useState('');
  const [title, title_] = useState('');

  const [open, _open] = useState('');
  const addressList = () => {
    API.get(
      urls.BASE_URL +
        'address-book?length=4000&page=1&search=&sort_dir=desc&sort_by=id',
    )
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          setaddress_List(response.data.data.data);
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
  useEffect(() => {
    addressList();
  }, []);
  const onChange = e => {
    setpayment_type(e);
  };
  const [groupCoins, groupCoins_] = useState([]);
  const onSubmitFormGroup = () => {
    // if (!validate()) {
    let body = {
      coin_type: value,
      title: title,
    };
    //   var getToken = localStorage.getItem('access');
    API.post(urls.BASE_URL + 'address-book-category', body)
      .then(function (response) {
        if (response.data.success == true) {
          setModalVisible(!modalVisible);
        } else {
          Toast.show({
            type: 'error',
            text2: 'error',
          });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrorShow(true);
        }
        settitleError(error.response.data.errors.title);
        setCoinTypeError(error.response.data.errors.coin_type);
        // Toast.show({
        //   type: 'error',
        //   text2: error.response.data.message,
        // });
      });
    // }
  };
  const onSubmitForm = () => {
    // if (!validate()) {
    let body = {
      full_name: full_name,
      coin_type: value2,
      address: address,
    };
    //   var getToken = localStorage.getItem('access');
    API.post(urls.BASE_URL + 'address-book', body)
      .then(function (response) {
        if (response.data.success == true) {
          setModal2Visible(!modal2Visible);
          addressList();
        } else {
          Toast.show({
            type: 'error',
            text2: 'error',
          });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrorShow(true);
        }
        setAddressError(error.response.data.errors.address);
        setCoinTypeError(error.response.data.errors.coin_type);
        setNameError(error.response.data.errors.full_name);

        Toast.show({
          type: 'error',
          text2: error.response.data.message,
        });
      });
    // }
  };
  const gettingCoins = () => {
    API.get(urls.BASE_URL + 'get-buy-coin-and-phase-information')
      .then(function (response) {
        if (response.data.success == true) {
          let coins = [];
          response.data.data.coins.forEach(element => {
            coins.push({
              label: element.type,
              value: element.type,
            });
          });
          set_coin_type(coins);
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
  const gettingGroup = () => {
    API.get(urls.BASE_URL + 'get-coin-type-categories' + `/${value2}`)
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          let groups = [];
          Object.keys(response.data.data).forEach(element => {
            groups.push({
              label: response.data.data[element],
              value: response.data.data[element],
            });
          });
          groupCoins_(groups);
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
          text2: error.data.errors.message,
        });
      });
  };
  useEffect(() => {
    gettingGroup();
  }, [value2]);
  const onBack = () => {
    props.navigation.goBack();
    props.navigation.openDrawer();
  };
  const get_full_name = e => {
    set_full_name(e);
  };
  const get_address = e => {
    set_address(e);
  };
  const toggleExpanded = id => {
    if (open === '') {
      _open(id);
    } else {
      _open('');
    }
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
    setnewOne(!newOne);
  };
  const get_title = e => {
    title_(e);
  };

  return (
    <>
      {/* <View style={{height: '100%'}}> */}
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',

          // flex: 1,
          // backgroundColor: 'green',
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../../assets/tansparent_lines.png')}>
        <ScrollView>
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
                      source={require('../../assets/cross.png')}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 26,
                      color: '#F8F8F8',
                      alignSelf: 'center',
                    }}>
                    Add New Group
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 10,
                      color: '#808080',
                      alignSelf: 'center',
                    }}>
                    You can only create a group of a coin type.
                  </Text>

                  <Text
                    style={[
                      {
                        marginTop: '8%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                        // alignSelf: 'flex-start',
                      },
                    ]}>
                    Title
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: '#191B2E',
                      color: '#F8F8F8',
                      // alignSelf: 'flex-start',
                      width: '100%',
                    }}
                    onChangeText={get_title}
                    // value={Email}
                    placeholder="Enter Group Title"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {titleError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '8%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                      },
                    ]}>
                    Coin
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && {
                        borderColor: 'white',
                        backgroundColor: '#191B2E',
                      },
                    ]}
                    search={true}
                    inputSearchStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                      fontSize: 16,
                      color: 'white',
                    }}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={coin_type}
                    // maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select a coin' : 'Select a coin'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {coinTypeError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <TouchableOpacity
                    style={{marginTop: 30}}
                    onPress={onSubmitFormGroup}>
                    <ImageBackground
                      style={{
                        height: 60,
                        width: 155,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('../../assets/button.png')}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#FFFFFF',
                          alignSelf: 'center',
                        }}>
                        Add
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>
          {/* modal 2 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModal2Visible(!modal2Visible);
            }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={[styles.modalView]}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    left: '9%',
                    bottom: '4%',
                  }}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end', bottom: '4%', right: '4%'}}
                    onPress={() => setModal2Visible(!modal2Visible)}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../assets/cross.png')}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 26,
                      color: '#F8F8F8',
                      alignSelf: 'center',
                    }}>
                    Add New Address
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 10,
                      color: '#DC143C',
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    Please verify the wallet address carefully. Funds sent to
                    the wrong address can not be retrieved, and we hold no
                    responsibility for lost transactions.
                  </Text>

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                      },
                    ]}>
                    Name
                  </Text>
                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        alignSelf: 'flex-start',
                        width: '100%',
                      },
                    ]}
                    onChangeText={get_full_name}
                    // value={Email}
                    placeholder="Enter Username"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />

                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {NameError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                      },
                    ]}>
                    Address
                  </Text>

                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        alignSelf: 'flex-start',
                        width: '100%',
                      },
                    ]}
                    onChangeText={get_address}
                    // value={Email}
                    placeholder="Enter Your Address"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {addressError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                      },
                    ]}>
                    Coin
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus2 && {borderColor: '#191B2E'},
                    ]}
                    search={true}
                    inputSearchStyle={{
                      backgroundColor: '#191B2E',
                      fontSize: 16,
                      color: 'white',
                    }}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={coin_type}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Select a Coin' : 'Select a Coin'}
                    value={value2}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                      setValue2(item.value);
                      setValue3('');
                      setIsFocus2(false);
                    }}
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {coinTypeError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                        marginTop: '2%',
                      },
                    ]}>
                    Group
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus3 && {borderColor: '#808080'},
                    ]}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={groupCoins}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      !isFocus3 ? 'Select a Group' : 'Select a Group'
                    }
                    value={value3}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                      setValue3(item.value);
                      setIsFocus3(false);
                    }}
                  />

                  <TouchableOpacity
                    style={{marginTop: 30}}
                    onPress={onSubmitForm}>
                    <ImageBackground
                      style={{
                        height: 60,
                        width: 155,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('../../assets/button.png')}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#FFFFFF',
                          alignSelf: 'center',
                        }}>
                        Add
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>
          {/* modal 2 end */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginTop: '4%',
                  marginLeft: '2%',
                }}
                onPress={() => {
                  setModalVisible(true);
                  gettingCoins();
                }}>
                <GradientText
                  colors={['#50AEFD', '#7F4EFC']}
                  style={{fontSize: 12, marginLeft: 4}}>
                  + Add Group
                </GradientText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: '4%',
                  marginLeft: '2%',
                }}
                onPress={() => {
                  setModal2Visible(true);
                  gettingCoins();
                }}>
                <Text style={{fontSize: 12, color: '#808080', marginLeft: 4}}>
                  + Add Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '4%',
            }}>
            <TextInput
              style={{
                height: 40,
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
              source={require('../../assets/search.png')}
            />
          </View>
          {address_List.length > 0
            ? address_List.map((item, index) => {
                return (
                  <LinearGradient
                    colors={['#222441', '#050506']}
                    style={styles.block}>
                    <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '500',
                            fontSize: 12,
                            height: 25,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: '5%',
                            borderColor: '#191B2E',
                          }}>
                          Name :{' '}
                          <Text style={{color: '#F8F8F8'}}>
                            {item.full_name}
                          </Text>
                        </Text>
                        <Image
                          style={{
                            height: 10,
                            width: 10,
                            alignSelf: 'flex-end',
                            bottom: '40%',
                            right: '5%',
                          }}
                          source={require('../../assets/cone_down.png')}
                        />
                      </View>
                    </TouchableOpacity>
                    {item.id === open ? (
                      <Collapsible collapsed={collapsed} align="center">
                        <View
                          style={{
                            borderTopWidth: 1,
                            borderColor: '#191B2E',
                            width: '90%',
                            alignSelf: 'center',
                            paddingBottom: 10,
                          }}>
                          <Text style={[styles.input, {}]}>
                            Address :{' '}
                            <Text style={{color: '#F8F8F8'}}>
                              {item.address}
                            </Text>
                          </Text>
                          <Text style={styles.input}>
                            Coin Type :{' '}
                            <Text style={{color: '#F8F8F8'}}>
                              {item.coin_type}
                            </Text>
                          </Text>
                          <Text style={styles.input}>
                            Group :{' '}
                            <Text style={{color: '#F8F8F8'}}>LTC Group</Text>
                          </Text>
                          <Text style={styles.input}>
                            Action :{' '}
                            <Text style={{color: '#F8F8F8'}}>Modify |</Text>{' '}
                            <Text style={{fontWeight: '400', color: '#FF6464'}}>
                              Remove
                            </Text>
                          </Text>
                        </View>
                      </Collapsible>
                    ) : (
                      ''
                    )}
                  </LinearGradient>
                );
              })
            : ''}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const Group = props => {
  const SECTIONS = [
    {
      title: 'First',
    },
    {
      title: 'Second',
    },
    {
      title: 'Third',
    },
    {
      title: 'Fourth',
    },
  ];
  const [full_name, set_full_name] = useState('');
  const [address, set_address] = useState('');
  const [addressError, setAddressError] = useState('');
  const [coinTypeError, setCoinTypeError] = useState('');
  const [NameError, setNameError] = useState('');
  const [titleError, settitleError] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [coin_type, set_coin_type] = useState([]);
  const [groupCoins, groupCoins_] = useState([]);
  const onSubmitFormGroup = () => {
    // if (!validate()) {
    let body = {
      coin_type: value,
      title: title,
    };
    //   var getToken = localStorage.getItem('access');
    API.post(urls.BASE_URL + 'address-book-category', body)
      .then(function (response) {
        if (response.data.success == true) {
          setModalVisible(!modalVisible);
          groupList();
        } else {
          Toast.show({
            type: 'error',
            text2: 'error',
          });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrorShow(true);
        }
        settitleError(error.response.data.errors.title);
        setCoinTypeError(error.response.data.errors.coin_type);
        // Toast.show({
        //   type: 'error',
        //   text2: error.response.data.message,
        // });
      });
    // }
  };
  const onSubmitForm = () => {
    // if (!validate()) {
    let body = {
      full_name: full_name,
      coin_type: value2,
      address: address,
    };
    //   var getToken = localStorage.getItem('access');
    API.post(urls.BASE_URL + 'address-book', body)
      .then(function (response) {
        if (response.data.success == true) {
          setModal2Visible(!modal2Visible);
        } else {
          Toast.show({
            type: 'error',
            text2: 'error',
          });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          setErrorShow(true);
        }
        setAddressError(error.response.data.errors.address);
        setCoinTypeError(error.response.data.errors.coin_type);
        setNameError(error.response.data.errors.full_name);

        // Toast.show({
        //   type: 'error',
        //   text2: error.response.data.message,
        // });
      });
    // }
  };
  const gettingCoins = () => {
    API.get(urls.BASE_URL + 'get-buy-coin-and-phase-information')
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          let coins = [];
          response.data.data.coins.forEach(element => {
            coins.push({
              label: element.type,
              value: element.type,
            });
          });
          set_coin_type(coins);
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

  const get_title = e => {
    title_(e);
  };
  const get_full_name = e => {
    set_full_name(e);
  };
  const get_address = e => {
    set_address(e);
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  const [value3, setValue3] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [title, title_] = useState('');
  const [group_List, setgroup_List] = useState('');
  const groupList = () => {
    API.get(
      urls.BASE_URL +
        'address-book-category?length=5000&page=1&search=&sort_dir=desc&sort_by=id',
    )
      .then(function (response) {
        if (response.data.success == true) {
          setgroup_List(response.data.data.data);
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
  useEffect(() => {
    groupList();
  }, []);

  const gettingGroup = () => {
    API.get(urls.BASE_URL + 'get-coin-type-categories' + `/${value2}`)
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          let groups = [];
          Object.keys(response.data.data).forEach(element => {
            groups.push({
              label: response.data.data[element],
              type: response.data.data[element],
            });
          });
          groupCoins_(groups);
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
  };

  useEffect(() => {
    gettingGroup();
  }, [value2]);

  return (
    <>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#15172C',
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../../assets/tansparent_lines.png')}>
        <ScrollView>
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
                      source={require('../../assets/cross.png')}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 26,
                      color: '#F8F8F8',
                      alignSelf: 'center',
                    }}>
                    Add New Group
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 10,
                      color: '#808080',
                      alignSelf: 'center',
                    }}>
                    You can only create a group of a coin type.
                  </Text>

                  <Text
                    style={[
                      {
                        marginTop: '8%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        // alignSelf: 'flex-start',
                        marginLeft: 2,
                      },
                    ]}>
                    Title
                  </Text>
                  <TextInput
                    style={[
                      {
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        width: '100%',
                        height: 40,
                      },
                    ]}
                    onChangeText={get_title}
                    // value={Email}
                    placeholder="Enter Group Title"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {titleError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '8%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                      },
                    ]}>
                    Coin
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && {borderColor: '#191B2E'},
                    ]}
                    search={true}
                    inputSearchStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                      fontSize: 16,
                      color: 'white',
                    }}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={coin_type}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select a coin' : 'Select a coin'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.label);
                      setIsFocus(false);
                    }}
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {coinTypeError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <TouchableOpacity
                    style={{marginTop: 30}}
                    onPress={onSubmitFormGroup}>
                    <ImageBackground
                      style={{
                        height: 60,
                        width: 155,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('../../assets/button.png')}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#FFFFFF',
                          alignSelf: 'center',
                        }}>
                        Add
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>

          {/* modal 2 */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModal2Visible(!modal2Visible);
            }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={[styles.modalView]}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    left: '9%',
                    bottom: '4%',
                  }}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end', bottom: '4%', right: '4%'}}
                    onPress={() => setModal2Visible(!modal2Visible)}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../assets/cross.png')}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 26,
                      color: '#F8F8F8',
                      alignSelf: 'center',
                    }}>
                    Add New Address
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 10,
                      color: '#DC143C',
                      textAlign: 'center',
                      // width: '100%',
                    }}>
                    Please verify the wallet address carefully. Funds sent to
                    the wrong address can not be retrieved, and we hold no
                    responsibility for lost transactions.
                  </Text>

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        // alignSelf: 'flex-start',
                        marginLeft: 2,
                      },
                    ]}>
                    Name
                  </Text>
                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        alignSelf: 'flex-start',
                        width: '100%',
                      },
                    ]}
                    onChangeText={get_full_name}
                    // value={Email}
                    placeholder="Enter Username"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {NameError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        // alignSelf: 'flex-start',
                        marginLeft: 2,
                      },
                    ]}>
                    Address
                  </Text>
                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        alignSelf: 'flex-start',
                        width: '100%',
                      },
                    ]}
                    onChangeText={get_address}
                    // value={Email}
                    placeholder="Enter Your Address"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {addressError}
                    </Text>
                  ) : (
                    ''
                  )}

                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        // alignSelf: 'flex-start',
                        marginLeft: 2,
                      },
                    ]}>
                    Coin
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && {
                        borderColor: 'white',
                        backgroundColor: '#191B2E',
                      },
                    ]}
                    search={true}
                    inputSearchStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                      fontSize: 16,
                      color: 'white',
                    }}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={coin_type}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Select a Coin' : 'Select a Coin'}
                    value={value2}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                      setValue2(item.value);
                      setValue3('');
                      setIsFocus2(false);
                    }}
                  />
                  {errorShow == true ? (
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 10,
                        color: '#DC143C',
                        // textAlign: 'center',
                        width: '100%',
                      }}>
                      {coinTypeError}
                    </Text>
                  ) : (
                    ''
                  )}
                  <Text
                    style={[
                      {
                        marginTop: '2%',
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 11,
                        marginLeft: 2,
                        // alignSelf: 'flex-start',
                        // bottom: '6%',
                      },
                    ]}>
                    Group
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus3 && {borderColor: '#808080'},
                    ]}
                    // iconColor="#4FAEFD"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{
                      backgroundColor: '#191B2E',
                      borderRadius: 12,
                    }}
                    activeColor={{backgroundColor: '#191B2E', borderRadius: 12}}
                    itemTextStyle={{color: '#FFFFFF'}}
                    data={groupCoins}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      !isFocus3 ? 'Select a Group' : 'Select a Group'
                    }
                    value={value3}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                      setValue3(item.value);
                      // setIsFocus3(false);
                    }}
                  />

                  <TouchableOpacity
                    style={{marginTop: 30}}
                    onPress={onSubmitForm}>
                    <ImageBackground
                      style={{
                        height: 60,
                        width: 155,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('../../assets/button.png')}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: '#FFFFFF',
                          alignSelf: 'center',
                        }}>
                        Add
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </Modal>

          {/* modal 2 end */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginTop: '4%',
                  marginLeft: '2%',
                }}
                onPress={() => {
                  gettingCoins();
                  setModalVisible(true);
                }}>
                <GradientText
                  colors={['#50AEFD', '#7F4EFC']}
                  style={{fontSize: 12, marginLeft: 4}}>
                  + Add Group
                </GradientText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: '4%',
                  marginLeft: '2%',
                }}
                onPress={() => {
                  setModal2Visible(true);
                  gettingCoins();
                }}>
                <Text style={{fontSize: 12, color: '#808080', marginLeft: 4}}>
                  + Add Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '4%',
            }}>
            <TextInput
              style={{
                height: 40,
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
              source={require('../../assets/search.png')}
            />
          </View>
          {group_List.length > 0 &&
            group_List.map((rowitem, index) => (
              <LinearGradient
                colors={['#222441', '#050506']}
                style={styles.block2}>
                <Text style={styles.input}>
                  Name : <Text style={{color: '#F8F8F8'}}>{rowitem.title}</Text>
                </Text>
                <Text style={styles.input}>
                  Coin Type :{' '}
                  <Text style={{color: '#F8F8F8'}}>{rowitem.coin_type}</Text>
                </Text>
                <Text style={styles.input}>
                  Action : <Text style={{color: '#F8F8F8'}}>Modify |</Text>{' '}
                  <Text style={{fontWeight: '400', color: '#FF6464'}}>
                    Remove
                  </Text>
                </Text>
              </LinearGradient>
            ))}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AddressBook;

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
  block: {
    // height: '35%',
    // backgroundColor: '#15172C',
    width: '90%',
    marginTop: '2%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#403F62',
    padding: 5,
    marginBottom: 5,
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // marginTop: '5%',
    // padding: 7
  },
  block2: {
    // height: '35%',
    // backgroundColor: '#15172C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#403F62',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    marginTop: '3%',
    marginBottom: 5,
    padding: 7,
  },
  dropdown: {
    marginTop: 6,
    height: 35,
    width: '100%',
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
  // dropdown2: {
  //   margin: 16,
  //   height: 35,
  //   width: '100%',
  //   alignSelf: 'center',
  //   borderColor: '#191B2E',
  //   borderBottomWidth: 1,
  //   // padding: 7,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 1.41,
  //   // elevation: 2,
  //   bottom: '4%',
  // },
  dropdown3: {
    margin: 16,
    height: 35,
    width: '100%',
    alignSelf: 'center',
    borderColor: '#191B2E',
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
    bottom: '10%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
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
    height: '73%',
    width: '90%',
    bottom: '5%',
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
    height: '60%',
    width: '90%',
    bottom: '5%',
    marginTop: '18%',
  },
});

// export default BuyCoins;
