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
  Switch,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const Settings = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [secret_key, setsecret_key] = useState('');

  const [language, setlanguage] = useState([{label: 'No data', value: ''}]);
  const [qr_code, setqr_code] = useState('');
  const [code, setcode] = useState('');
  const [setUp, setsetUp] = useState(false);
  const [Remove, Remove_] = useState(false);

  const ref = React.useRef();

  useEffect(() => {
    getData();
  }, []);

  const toggleSwitch = () => {
    if (isEnabled == false) {
      setIsEnabled(true);
      googleAuth();
    } else {
      setIsEnabled(false);
      googleAuth();
      // setModal2Visible(!modal2Visible);
    }
  };

  const activate_ = () => {
    setModal2Visible(!modal2Visible);
  };

  const getData = () => {
    API.get(APP_URLS.SETTINGS_PAGE)
      .then(function (response) {
        setsecret_key(response.data.data.google2fa_secret);
        if (response.data.data.qrcode) {
          setqr_code(response.data.data.qrcode);
          setsetUp(false);
          Remove_(false);
        } else {
          setsetUp(true);
          Remove_(true);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const G2Verification = () => {
    let formData = {
      code: code,
    };
    API.post(APP_URLS.VERIFY_APP, formData)
      .then(function (response) {
        // setLoader(false)
        if (response.data.success == true) {
          setModalVisible(false);
          Alert.alert('Success', response.data.message);
        } else {
          Alert.alert('Error', response.data.message);
        }
        setcode('');
        setsetUp(true);
        Remove_(true);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const onSubmit = () => {
    let formData = {
      google2fa_secret: secret_key,
      code: code,
      remove: 0,
    };

    API.post(APP_URLS.SECRET_SAVE, formData)
      .then(function (response) {
        // setLoader(false)
        G2Verification();
        setcode('');
        if (response.data.success === true) {
          setModalVisible(false);
          setModal2Visible(false);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };
  const onSecondSubmit = () => {
    let formData = {
      google2fa_secret: secret_key,
      code: code,
      remove: 1,
    };

    API.post(APP_URLS.SECRET_SAVE, formData)
      .then(function (response) {
        if (response.data.success === true) {
          setModalVisible(false);
          setModal2Visible(false);
        }
        setcode('');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const googleAuth = () => {
    API.post(APP_URLS.googleAuthenticationEnableDisable)
      .then(function (response) {
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={[styles.modalView]}>
            <ScrollView style={{width: '100%'}}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{height: 25, width: 25, alignSelf: 'flex-end'}}
                  source={require('../assets/cross.png')}
                />
              </TouchableOpacity>

              <Text
                style={[
                  {
                    color: '#F8F8F8',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 16,
                  },
                ]}>
                Google Authentication
              </Text>

              <Image
                style={{
                  height: 124,
                  width: 120,
                  alignSelf: 'center',
                  marginTop: '10%',
                }}
                source={{
                  uri: qr_code,
                }}
              />
              <Text
                style={[
                  {
                    color: '#808080',
                    fontWeight: '500',
                    textAlign: 'center',
                    fontSize: 14,
                    marginTop: '5%',
                  },
                ]}>
                Open your Google Authenticator app, and scan Your secret code
                and enter the 6-digit code from the app into the input field
              </Text>

              <View style={{width: '100%', marginTop: '8%'}}>
                <View style={{bottom: '2%'}}>
                  <Text
                    style={[
                      {
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 12,
                        left: '1%',
                      },
                    ]}>
                    6 digit code
                  </Text>
                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        width: '99%',
                        bottom: '4%',
                      },
                    ]}
                    onChangeText={setcode}
                    // value={code}
                    placeholder="Your Code"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                </View>

                <TouchableOpacity style={{marginTop: '10%'}} onPress={onSubmit}>
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
                      Verify
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal2Visible(!modal2Visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <LinearGradient
            colors={['#222441', '#050506']}
            style={[styles.modalView2]}>
            <ScrollView style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => setModal2Visible(!modal2Visible)}>
                <Image
                  style={{height: 25, width: 25, alignSelf: 'flex-end'}}
                  source={require('../assets/cross.png')}
                />
              </TouchableOpacity>

              <Text
                style={[
                  {
                    color: '#F8F8F8',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 16,
                  },
                ]}>
                Google Authentication
              </Text>

              <Text
                style={[
                  {
                    color: '#808080',
                    fontWeight: '500',
                    textAlign: 'center',
                    fontSize: 14,
                    marginTop: '5%',
                  },
                ]}>
                Open your Google Authenticator app, and scan Your secret code
                and enter the 6-digit code from the app into the input field
              </Text>

              <View style={{width: '100%', marginTop: '8%'}}>
                <View style={{bottom: '2%'}}>
                  <Text
                    style={[
                      {
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 12,
                        left: '1%',
                      },
                    ]}>
                    6 digit code
                  </Text>
                  <TextInput
                    style={[
                      {
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: '#191B2E',
                        color: '#F8F8F8',
                        width: '99%',
                        bottom: '4%',
                      },
                    ]}
                    onChangeText={setcode}
                    // value={code}
                    placeholder="Your Code"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                  />
                </View>

                <TouchableOpacity
                  style={{marginTop: '10%'}}
                  onPress={onSecondSubmit}>
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
                      Verify
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
          backgroundColor: '#131222',
          // height: '52%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingBottom: 15,
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
              Settings
            </Text>
          </View>
          <Text> </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              style={{height: 115, width: 115}}
              source={require('../assets/google_auth_icon.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#FFFFFF',
              marginTop: '2%',
            }}>
            Use 2-step verification
          </Text>
          <TouchableOpacity
            // onPress={onSubmitForm}
            disabled={setUp}
            style={{marginTop: '4%'}}
            onPress={() => setModalVisible(true)}>
            {setUp == true ? (
              <ImageBackground
                style={{
                  height: 60,
                  width: 155,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                source={require('../assets/grey_button.png')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  Set Up
                </Text>
              </ImageBackground>
            ) : (
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
                  Set Up
                </Text>
              </ImageBackground>
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: '#808080',
              marginTop: '5%',
              textAlign: 'center',
              width: 300,
            }}>
            Please on this option to enable two factor authentication at log in
          </Text>
        </View>
      </View>
      <ImageBackground
        style={{width: '100%'}}
        source={require('../assets/tansparent_lines.png')}>
        <View
          style={{
            height: '50%',
            backgroundColor: '#15172C',
            width: '90%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            {isEnabled == true ? (
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  color: '#326BFF',
                  // borderBottomWidth: 1,
                  borderColor: '#326BFF',
                }}>
                Enabled
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  color: '#326BFF',
                  // borderBottomWidth: 1,
                  borderColor: '#326BFF',
                }}>
                Disabled
              </Text>
            )}

            <Switch
              disabled={setUp == true ? false : true}
              trackColor={{false: '#fff', true: '#326BFF'}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {setUp == true && Remove == true ? (
            <TouchableOpacity
              onPress={activate_}
              style={{alignItems: 'center', marginTop: '20%'}}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  color: '#326BFF',
                  borderBottomWidth: 1,
                  borderColor: '#326BFF',
                }}>
                Remove google secret key
              </Text>
            </TouchableOpacity>
          ) : (
            <Text>
              {'       '}
              {'       '}
            </Text>
          )}
          {/* <TouchableOpacity style={{marginTop: '12%'}}>
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
                Update
              </Text>
            </ImageBackground>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 12,
    margin: 8,
    width: '90%',
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
  },
  dropdown: {
    margin: 16,
    height: 35,
    width: Dimensions.get('screen').width * 0.9,
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
    color: '#FFFFFF',
  },
  selectedTextStyle: {
    fontSize: 16,
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
  modalView: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '75%',
    width: '90%',
    bottom: '10%',
    marginTop: '18%',
  },
  modalView2: {
    borderWidth: 1,
    borderColor: '#403E62',
    margin: 20,
    backgroundColor: '#403E62',
    borderRadius: 26,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '50%',
    width: '90%',
    bottom: '10%',
    marginTop: '18%',
  },
});

export default Settings;
