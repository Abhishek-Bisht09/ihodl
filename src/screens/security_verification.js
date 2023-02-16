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
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {urls} from '../utils/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const SecurityVerification = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [code, setcode] = useState('');
  const [phone, setphone] = useState('');
  const [singleFile, setSingleFile] = useState([]);
  const [singleFile1, setSingleFile1] = useState([]);
  const [singleFile_2, setSingleFile_2] = useState([]);
  const [singleFile1_2, setSingleFile1_2] = useState([]);
  const [singleFile_3, setSingleFile_3] = useState([]);
  const [singleFile1_3, setSingleFile1_3] = useState([]);
  const [idCard, idCard_] = useState('');
  const [Passport, Passport_] = useState('');
  const [DL, DL_] = useState('');

  useEffect(() => {
    getProfile();
    getVerification();
  }, []);

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        setSingleFile('No File Chosen');
        alert('Canceled');
        setModalVisible(!modalVisible)
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const selectFile1 = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile1(res);
    } catch (err) {
      setSingleFile1(null);
      if (DocumentPicker.isCancel(err)) {
        setSingleFile1('No File Chosen');
        alert('Canceled');
        setModalVisible(!modalVisible);
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectFilePassport = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile_2(res);
    } catch (err) {
      setSingleFile_2(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
       setModalVisible2(!modalVisible2)
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectFilePassport2 = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile1_2(res);
    } catch (err) {
      setSingleFile1_2(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
        setModalVisible2(!modalVisible2);
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectFileDL = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile_3(res);
    } catch (err) {
      setSingleFile_3(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
        setModalVisible3(!modalVisible3)
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectFileDL2 = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile1_3(res);
    } catch (err) {
      setSingleFile1_3(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
        setModalVisible3(!modalVisible3);
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const getProfile = () => {
    API.get(APP_URLS.PROFILE_VIEW)
      .then(function (response) {
        setphone(response.data.data.user.phone);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };
  const getVerification = () => {
    API.get(APP_URLS.idVERIFICATION)
      .then(function (response) {
        if (response.data.success == true) {
          idCard_(response.data.data.nid.status);
          Passport_(response.data.data.passport.status);
          DL_(response.data.data.driving_license.status);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const onSendRequest = () => {
    API.get(APP_URLS.PHONE_VERIFICATION)
      .then(function (response) {
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

  const onSubmitForm = async () => {
    let formData = {
      code: code,
    };
    API.post(APP_URLS.SEND_PHONE_VERIFICATION_CODE, formData)
      .then(function (response) {
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
          setcode('');
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

  const onSubmitNID = async () => {
    const value = await AsyncStorage.getItem('@access_token');
    const fileToUpload = singleFile[0];
    const fileToUpload1 = singleFile1[0];

    var formdata = new FormData();
    formdata.append('front_image', fileToUpload);
    formdata.append('back_image', fileToUpload1);

    axios
      .post(urls.BASE_URL + 'submit-nid-photo', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Accept: 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
      .then(function (response) {
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
          setModalVisible(!modalVisible);
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

  const onSubmitPassportPhoto = async () => {
    const value = await AsyncStorage.getItem('@access_token');
    const fileToUpload = singleFile_2[0];
    const fileToUpload1 = singleFile1_2[0];

    var formdata = new FormData();
    formdata.append('front_image', fileToUpload);
    formdata.append('back_image', fileToUpload1);

    axios
      .post(urls.BASE_URL + 'submit-passport-photo', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Accept: 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
      .then(function (response) {
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
          setModalVisible2(!modalVisible2);
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

  const onSubmitDLPhoto = async () => {
    const value = await AsyncStorage.getItem('@access_token');
    const fileToUpload = singleFile_3[0];
    const fileToUpload1 = singleFile1_3[0];

    var formdata = new FormData();
    formdata.append('front_image', fileToUpload);
    formdata.append('back_image', fileToUpload1);

    axios
      .post(urls.BASE_URL + 'submit-driving-license-photo', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Accept: 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
      .then(function (response) {
        if (response.data.success == true) {
          Alert.alert('Success', response.data.message);
          setModalVisible3(!modalVisible3)
        } else {
          Alert.alert('Error responseeeeeee', response.data.message);
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
    <>
      <View
        style={{
          height: responsiveScreenHeight(7),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 5,
          backgroundColor: '#131222',
        }}>
        <View>
          <TouchableOpacity
            style={{top: 6, left: 18}}
            onPress={() => props.navigation.goBack()}>
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
            Security Verification
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={[
            styles.container,
            {flexDirection: 'column', justifyContent: 'space-between'},
          ]}>
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
                <View style={{alignItems: 'center', width: '100%'}}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      bottom: '4%',
                      width: '20%',
                      left: '10%',
                      height: '8%',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        bottom: '4%',
                        right: '8%',
                      }}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../assets/cross.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      {
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: 25,
                        bottom: '2%',
                      },
                    ]}>
                    Upload Document
                  </Text>

                  <Image
                    style={{height: 46, width: 41, marginTop: '3%'}}
                    source={require('../assets/upload_doc.png')}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      top: '6%',
                      marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                        width: '55%',
                      }}>
                      1 Front page
                    </Text>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      2 Back page
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '8%',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={selectFile}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile && singleFile[0] != null
                            ? singleFile[0].name
                              ? singleFile[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={selectFile1}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            textAlign: 'center',
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile1 && singleFile1[0] != null
                            ? singleFile1[0].name
                              ? singleFile1[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      {
                        bottom: '5%',
                        color: '#808080',
                        fontWeight: '400',
                        fontSize: 11.5,
                        textAlign: 'center',
                        lineHeight: 17,
                      },
                    ]}>
                    Please upload a copy if your valid identification in PNG,
                    JPEG or JPG format, no longer than 3mb in size
                  </Text>

                  <TouchableOpacity
                    style={{marginTop: '2%'}}
                    onPress={onSubmitNID}>
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
                        Upload
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Modal>

          {/* modal2 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible2(!modalVisible2);
            }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={styles.modalView}>
                <View style={{alignItems: 'center', width: '100%'}}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      bottom: '4%',
                      width: '20%',
                      left: '10%',
                      height: '8%',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        bottom: '4%',
                        right: '8%',
                      }}
                      onPress={() => setModalVisible2(!modalVisible2)}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../assets/cross.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      {
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: 25,
                        bottom: '2%',
                      },
                    ]}>
                    Upload Document
                  </Text>

                  <Image
                    style={{height: 46, width: 41, marginTop: '3%'}}
                    source={require('../assets/upload_doc.png')}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      top: '6%',
                      marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                        width: '55%',
                      }}>
                      1 Front page
                    </Text>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      2 Back page
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '8%',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={selectFilePassport}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile_2 && singleFile_2[0] != null
                            ? singleFile_2[0].name
                              ? singleFile_2[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={selectFilePassport2}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            textAlign: 'center',
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile1_2 && singleFile1_2[0] != null
                            ? singleFile1_2[0].name
                              ? singleFile1_2[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      {
                        bottom: '5%',
                        color: '#808080',
                        fontWeight: '400',
                        fontSize: 11.5,
                        textAlign: 'center',
                        lineHeight: 17,
                      },
                    ]}>
                    Please upload a copy if your valid identification in PNG,
                    JPEG or JPG format, no longer than 3mb in size
                  </Text>

                  <TouchableOpacity
                    style={{marginTop: '2%'}}
                    onPress={onSubmitPassportPhoto}>
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
                        Upload
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Modal>
          {/* modal 2 end */}

          {/* modal 3 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible3}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible3(!modalVisible3);
            }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={styles.modalView}>
                <View style={{alignItems: 'center', width: '100%'}}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      bottom: '4%',
                      width: '20%',
                      left: '10%',
                      height: '8%',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        bottom: '4%',
                        right: '8%',
                      }}
                      onPress={() => setModalVisible3(!modalVisible3)}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../assets/cross.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      {
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: 25,
                        bottom: '2%',
                      },
                    ]}>
                    Upload Document
                  </Text>

                  <Image
                    style={{height: 46, width: 41, marginTop: '3%'}}
                    source={require('../assets/upload_doc.png')}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      top: '6%',
                      marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                        width: '55%',
                      }}>
                      1 Front page
                    </Text>
                    <Text
                      style={{
                        color: '#4FAEFD',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      2 Back page
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '8%',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={selectFileDL}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile_3 && singleFile_3[0] != null
                            ? singleFile_3[0].name
                              ? singleFile_3[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={selectFileDL2}
                      style={{
                        borderWidth: 2,
                        height: '70%',
                        width: '45%',
                        borderColor: '#403E62',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#FFFFFF',
                            height: 22,
                            width: 80,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 12,
                            textAlign: 'center',
                            color: '#1B1C33',
                          }}>
                          Choose File
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            fontWeight: '400',
                            fontSize: 8,
                            marginTop: '6%',
                            textAlign: 'center',
                          }}>
                          File Name:{' '}
                          {singleFile1_3&&singleFile1_3[0] != null
                            ? singleFile1_3[0].name
                              ? singleFile1_3[0].name
                              : ''
                            : 'No File Chosen'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      {
                        bottom: '5%',
                        color: '#808080',
                        fontWeight: '400',
                        fontSize: 11.5,
                        textAlign: 'center',
                        lineHeight: 17,
                      },
                    ]}>
                    Please upload a copy if your valid identification in PNG,
                    JPEG or JPG format, no longer than 3mb in size
                  </Text>

                  <TouchableOpacity
                    style={{marginTop: '2%'}}
                    onPress={onSubmitDLPhoto}>
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
                        Upload
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Modal>

          {/* modal 3 end */}

          <View
            style={{
              backgroundColor: '#131222',
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{marginLeft: '5%'}}>
                <TouchableOpacity>
                  <Image
                    style={{height: 40, width: 39}}
                    source={require('../assets/call_icon.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: '4%'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    fontWeight: '500',
                    fontSize: 12,
                    marginTop: '2%',
                  }}>
                  {phone}
                </Text>
                <Text
                  style={{
                    color: '#808080',
                    fontWeight: '500',
                    fontSize: 10,
                    bottom: '3%',
                  }}>
                  Keep your primary phone number up-to-date
                </Text>
              </View>
            </View>
            <View style={{height: 70, marginTop: 15}}>
              <LinearGradient
                colors={['#222441', '#050506']}
                style={{
                  borderRadius: 10,
                  width: '90%',
                  alignSelf: 'center',
                  height: 42,
                }}>
                <TextInput
                  style={{padding: 8, color: '#FFFFFF', fontSize: 12}}
                  onChangeText={setcode}
                  value={code}
                  placeholder="Enter OTP"
                  placeholderTextColor="#C3C3C3"
                />
              </LinearGradient>
              <TouchableOpacity
                style={{
                  height: 22,
                  marginTop: '2%',
                  alignItems: 'center',
                  width: '35%',
                  alignSelf: 'flex-end',
                  marginRight: '2%',
                }}
                onPress={onSendRequest}>
                <Text
                  style={{
                    color: '#4FAEFD',
                    fontWeight: '500',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                  }}>
                  Send SMS With code
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomColor: '#808080',
                borderBottomWidth: StyleSheet.hairlineWidth,
                width: '90%',
                alignSelf: 'center',
                borderStyle: 'dotted',
              }}
            />
            <TouchableOpacity onPress={onSubmitForm}>
              <Text
                style={{
                  color: '#3AB54A',
                  height: 60,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: '600',
                  fontSize: 17,
                }}>
                Verify
              </Text>
            </TouchableOpacity>
          </View>
          <ImageBackground
            style={{width: '100%', top: 40}}
            source={require('../assets/tansparent_lines.png')}>
            <View style={{bottom: '2%', height: 460}}>
              <View style={{bottom: '5%'}}>
                <Text
                  style={{
                    color: '#F8F8F8',
                    height: 60,
                    textAlignVertical: 'center',
                    fontWeight: '500',
                    fontSize: 15,
                    marginLeft: '6%',
                  }}>
                  Select Identity Type
                </Text>
                <View style={{height: '18%'}}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    disabled={idCard === 'Approved' ? true : false}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{height: 43.16, width: 44, marginLeft: '5%'}}
                        source={require('../assets/national_id.png')}
                      />
                      <View style={{width: '75%'}}>
                        <Text
                          style={{
                            color: '#F8F8F8',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '600',
                            fontSize: 14,
                            marginLeft: '6%',
                            marginTop: '2%',
                          }}>
                          National ID Card
                        </Text>
                        <Text
                          style={{
                            color:
                              idCard == 'Approved'
                                ? '#3AB54A'
                                : idCard == 'Not Submitted'
                                ? '#FFC107'
                                : idCard == 'Pending'
                                ? '#4FAEFD'
                                : idCard == 'Rejected'
                                ? 'red'
                                : '#fff',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 10,
                            marginLeft: '6%',
                            // bottom: '12%',
                          }}>
                          {idCard}
                        </Text>
                      </View>
                      {idCard === 'Approved' ? (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                          }}
                          source={require('../assets/Verified.png')}
                        />
                      ) : (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                            tintColor:
                              idCard == 'Not Submitted'
                                ? '#FFC107'
                                : idCard == 'Pending'
                                ? '#4FAEFD'
                                : idCard == 'Rejected'
                                ? 'red'
                                : '#fff',
                          }}
                          source={require('../assets/national_id_arrow.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomColor: '#191B2E',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '3%',
                    }}
                  />
                </View>

                <View style={{marginTop: '3%', height: '18%'}}>
                  <TouchableOpacity
                    onPress={() => setModalVisible2(!modalVisible2)}
                    disabled={Passport === 'Approved' ? true : false}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{height: 43.16, width: 44, marginLeft: '5%'}}
                        source={require('../assets/passport_ic.png')}
                      />
                      <View style={{width: '75%'}}>
                        <Text
                          style={{
                            color: '#F8F8F8',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '600',
                            fontSize: 14,
                            marginLeft: '6%',
                            marginTop: '2%',
                          }}>
                          Passport
                        </Text>
                        <Text
                          style={{
                            color:
                              Passport == 'Approved'
                                ? '#3AB54A'
                                : Passport == 'Not Submitted'
                                ? '#FFC107'
                                : Passport == 'Pending'
                                ? '#4FAEFD'
                                : Passport == 'Rejected'
                                ? 'red'
                                : '#fff',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 10,
                            marginLeft: '6%',
                            // bottom: '12%',
                          }}>
                          {Passport}
                        </Text>
                      </View>

                      {Passport === 'Approved' ? (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                          }}
                          source={require('../assets/Verified.png')}
                        />
                      ) : (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                            tintColor:
                              Passport == 'Not Submitted'
                                ? '#FFC107'
                                : Passport == 'Pending'
                                ? '#4FAEFD'
                                : Passport == 'Rejected'
                                ? 'red'
                                : '#fff',
                          }}
                          source={require('../assets/passport_arrow.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      borderBottomColor: '#191B2E',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '3%',
                    }}
                  />
                </View>

                <View style={{marginTop: '5%', height: '18%'}}>
                  <TouchableOpacity
                    onPress={() => setModalVisible3(!modalVisible3)}
                    disabled={DL == 'Approved' ? true : false}>
                    <View style={{flexDirection: 'row', bottom: '2%'}}>
                      <Image
                        style={{height: 43.16, width: 44, marginLeft: '5%'}}
                        source={require('../assets/dl.png')}
                      />
                      <View style={{width: '75%'}}>
                        <Text
                          style={{
                            color: '#F8F8F8',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '600',
                            fontSize: 14,
                            marginLeft: '6%',
                            marginTop: '2%',
                          }}>
                          Driving Licence
                        </Text>
                        <Text
                          style={{
                            color:
                              DL == 'Approved'
                                ? '#3AB54A'
                                : DL == 'Not Submitted'
                                ? '#FFC107'
                                : DL == 'Pending'
                                ? '#4FAEFD'
                                : DL == 'Rejected'
                                ? 'red'
                                : '#fff',
                            height: 20,
                            textAlignVertical: 'center',
                            fontWeight: '400',
                            fontSize: 10,
                            marginLeft: '6%',
                            // bottom: '12%',
                          }}>
                          {DL}
                        </Text>
                      </View>

                      {DL === 'Approved' ? (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                          }}
                          source={require('../assets/Verified.png')}
                        />
                      ) : (
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginTop: '4%',
                            right: '40%',
                            tintColor:
                              DL == 'Not Submitted'
                                ? '#FFC107'
                                : DL == 'Pending'
                                ? '#4FAEFD'
                                : DL == 'Rejected'
                                ? 'red'
                                : '#fff',
                          }}
                          source={require('../assets/dl_arrow.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomColor: '#191B2E',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '3%',
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15172C',
  },
  input: {
    width: '85%',
    borderBottomWidth: 1,
    padding: 4,
    borderColor: '#F0F0F0',
    color: '#F8F8F8',
  },
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
    width: '90%',
    bottom: '10%',
    marginTop: '30%',
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 8,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default SecurityVerification;
