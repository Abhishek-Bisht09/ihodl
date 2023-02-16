import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CountryPicker} from 'react-native-country-codes-picker';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {urls} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const EditProfile = props => {
  const [show, setShow] = useState(false);
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [countryCode, setCountryCode] = useState('Country Code');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [errorphone, seterrorphone] = useState('');
  const [photo, setphoto] = useState('');
  const [photo_new, set_new_photo] = useState('');

  const [first_newName, setfirst_newName] = useState('');
  const [last_newName, setlast_newName] = useState('');
  useEffect(() => {
    getProfile();
  }, []);

  const onChangeFirstname = e => {
    // setfirst_name(e);
    setfirst_newName(e);
  };

  const onChangeLastname = e => {
    // setlast_name(e);
    setlast_newName(e);
  };

  const onChangeEmail = e => {
    setemail(e);
  };

  const onChangePhone = e => {
    setphone(e);
  };

  const validate = () => {
    let flag = false;

    if (phone === '' || phone === null || phone === undefined) {
      seterrorphone('Phone is Required');
      flag = true;
    } else {
      seterrorphone('');
    }

    return flag;
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      set_new_photo(response.assets[0]);
    });
  };
  const getProfile = async () => {
    API.get(APP_URLS.PROFILE_VIEW)
      .then(function (response) {
        setfirst_name(response.data.data.user.first_name);
        setfirst_newName(response.data.data.user.first_name);
        setlast_name(response.data.data.user.last_name);
        setphoto(response.data.data.user.photo);
        // set_new_photo(response.data.data.user.photo);
        setlast_newName(response.data.data.user.last_name);
        setemail(response.data.data.user.email);
        setCountryCode(response.data.data.user.country_code);
        setphone(response.data.data.user.phone);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const onSubmitForm = async () => {
    if (!validate()) {
      let formData = {
        first_name: first_newName,
        last_name: last_newName,
        email: email,
        country_code: countryCode,
        phone: phone,
        // photo: photo_new ? JSON.stringify(photo_new.assets[0]) : '',
        // photo: photo_new
      };

      API.post(APP_URLS.SAVE_PROFILE, formData)
        .then(function (response) {
          if (response.data.success == true) {
            Alert.alert('Success', response.data.message);
            setfirst_name(response.data.data.first_name);
            setlast_name(response.data.data.last_name);
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
    }
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
            Edit Profile
          </Text>
        </View>
        <Text> </Text>
      </View>
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#15172C'}}>
        <View
          style={{
            backgroundColor: '#131222',
            height: 300,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              style={{
                height: 102,
                width: 104,
                marginTop: '3%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/round_icon.png')}>
              {photo == '' ? (
                <Image
                  style={{height: 31, width: 27}}
                  source={require('../assets/ed_prof.png')}
                />
              ) : (
                <Image
                  style={{height: 100, width: 100, borderRadius: 50}}
                  source={{uri: photo}}
                />
              )}
            </ImageBackground>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', bottom: '19%', right: '38%'}}
              onPress={handleChoosePhoto}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/upload_pic.png')}
              />
            </TouchableOpacity>

            <Text style={{color: '#F8F8F8', fontWeight: '500', fontSize: 25}}>
              Welcome, {first_name} !
            </Text>
            <Text style={{color: '#808080', fontWeight: '500', fontSize: 15}}>
              {email}
            </Text>
          </View>
        </View>

        <ImageBackground
          style={{width: '100%', top: 30}}
          source={require('../assets/tansparent_lines.png')}>
          <View style={{bottom: '2%', height: 460}}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={[styles.input]}
              onChangeText={onChangeFirstname}
              value={first_newName}
              // editable={false}
              // placeholder={first_name}
              placeholderTextColor="white"
            />

            <Text style={styles.text}>Last Name</Text>

            <TextInput
              style={[styles.input]}
              onChangeText={onChangeLastname}
              value={last_newName}
              // editable={false}
              // placeholder={last_name}
              placeholderTextColor="white"
            />

            <Text style={styles.text}>Email Address</Text>

            <TextInput
              style={[styles.input]}
              onChangeText={onChangeEmail}
              value={email}
              editable={false}
              // placeholder={email}
              placeholderTextColor="white"
            />

            <Text style={styles.text}>Country</Text>
            <TouchableOpacity
              // disabled={true}
              onPress={() => setShow(true)}
              style={{
                width: '85%',
                height: 30,
                borderColor: '#191B2E',
                borderBottomWidth: 1,
                padding: 2,
                alignSelf: 'center',
                marginTop: '2%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                }}>
                {countryCode ? countryCode : 'None'}
              </Text>
              <Image
                style={{
                  height: 5,
                  width: 9,
                  bottom: '42%',
                  alignSelf: 'flex-end',
                }}
                source={require('../assets/cone_down.png')}
              />
            </TouchableOpacity>
            <CountryPicker
              style={{
                // Styles for whole modal [View]
                modal: {
                  height: 350,
                  backgroundColor: '#15172C',
                },
                // Styles for input [TextInput]
                textInput: {
                  height: 40,
                  borderRadius: 10,
                  color: '#F8F8F8',
                  backgroundColor: '#15172C',
                },
                // Styles for country button [TouchableOpacity]
                countryButtonStyles: {
                  height: 40,
                  backgroundColor: '#15172C',
                },
                // Styles for search message [Text]
                searchMessageText: {
                  color: 'red',
                },
                // Dial code styles [Text]
                dialCode: {
                  color: '#F8F8F8',
                },
                // Country name styles [Text]
                countryName: {
                  color: '#F8F8F8',
                },
                countryMessageContainer: {
                  color: 'red',
                },
              }}
              onBackdropPress={() => setShow(false)}
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item.name.en);
                setShow(false);
              }}
            />
            <Text style={styles.text}>Phone</Text>

            <TextInput
              style={[styles.input]}
              onChangeText={onChangePhone}
              value={phone}
              placeholder={phone ? phone : 'None'}
              placeholderTextColor="white"
            />

            <Text style={{color: '#B1003F', marginLeft: '8%'}}>
              {errorphone}
            </Text>

            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: '6%', marginBottom: '4%'}}
              onPress={onSubmitForm}>
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
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '85%',
    borderBottomWidth: 1,
    padding: 4,
    borderColor: '#191B2E',
    color: '#F8F8F8',
    alignSelf: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 12,
    color: '#808080',
    marginLeft: '8%',
    marginTop: '2%',
  },
});

export default EditProfile;
