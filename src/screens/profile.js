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
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';

const Profile = props => {
  const [first_name, setfirst_name] = useState('');
  const [emailStored, emailStored_] = useState('');
  let Data = useSelector(state => state.userReducer);

  useEffect(() => {
    func();
  }, []);

   const func = async () => {
     emailStored_(Data.user.user_info.email);
     setfirst_name(Data.user.user_info.first_name);
   };

  return (
    <View style={{flex: 1, backgroundColor: '#15172C'}}>
      <View
        style={{
          backgroundColor: '#131222',
          height: 300,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View
          style={{
            height: responsiveScreenHeight(7),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 5,
            //   backgroundColor:'red'
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
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                top: 5,
                //   left: '8%',
              }}>
              Profile{' '}
            </Text>
          </View>
          <Text> </Text>
          {/* <View
              style={{
                // left: 10,
                flexDirection: 'row',
                width: '10%',
                justifyContent: 'space-between',
              }}>
              <Image
                style={{height: 19, width: 17, top: 6}}
                source={require('../assets/notification.png')}
              />
            </View> */}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //   bottom: '16%',
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
              <Image
                style={{height: 31, width: 27}}
                source={require('../assets/ed_prof.png')}
              />
            </ImageBackground>
          <Text
            style={{
              color: '#F8F8F8',
              fontWeight: '500',
              fontSize: 22,
              marginTop: '4%',
            }}>
            Welcome {first_name} !
          </Text>
          <Text style={{color: '#808080', fontWeight: '500', fontSize: 15}}>
            {emailStored}
          </Text>
        </View>
      </View>

      <View style={{height: '75%', backgroundColor: '#15172C'}}>
        <ImageBackground
          style={{width: '100%', alignItems: 'center'}}
          source={require('../assets/tansparent_lines.png')}>
          <View
            style={{
              flexDirection: 'row',
              height: '40%',
              width: '90%',
              justifyContent: 'space-between',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                height: '70%',
                width: '45%',
                borderColor: '#403E62',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => props.navigation.push('EditProfile')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{height: 40.2, width: 41}}
                  source={require('../assets/ed_profile.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 12,
                    width: 90,
                    textAlign: 'center',
                    marginTop: '10%',
                  }}>
                  Profile Information
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.push('SecurityVerification')}
              style={{
                borderWidth: 2,
                height: '70%',
                width: '45%',
                borderColor: '#403E62',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{height: 40.2, width: 41}}
                  source={require('../assets/security_verf.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 12,
                    width: 90,
                    textAlign: 'center',
                    marginTop: '10%',
                  }}>
                  Security Verification
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: '40%',
              width: '90%',
              justifyContent: 'space-between',
              bottom: '10%',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.push('ChangePassword')}
              style={{
                borderWidth: 2,
                height: '70%',
                width: '45%',
                borderColor: '#403E62',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{height: 40.2, width: 41}}
                  source={require('../assets/change_pass.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 12,
                    width: 90,
                    textAlign: 'center',
                    marginTop: '10%',
                  }}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.push('SignInActivity')}
              style={{
                borderWidth: 2,
                height: '70%',
                width: '45%',
                borderColor: '#403E62',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{height: 40.2, width: 41}}
                  source={require('../assets/signin_act.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 12,
                    width: 75,
                    textAlign: 'center',
                    marginTop: '10%',
                  }}>
                  Signin Activity
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    marginLeft: '4%',
    marginTop: '3%',
    color: '#FFFFFF',
  },
  view: {
    backgroundColor: '#1F213E',
    width: '85%',
    height: '8%',
    borderRadius: 9,
    marginTop: '2%',
    flexDirection: 'row',
  },
});

export default Profile;
