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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {urls} from '../utils/api';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Autocomplete from 'react-native-autocomplete-input';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const SignInActivity = props => {
  const [Activity, setActivity] = useState([]);
  const [filteredActivity, setFilteredActivity] = useState([]);
  const [limit, _limit] = useState(1000);

  useEffect(() => {
    getData();
  }, [limit]);

  const getData = async () => {
    API.get(APP_URLS.ACTIVITY_LIST + `?page=1&limit=${limit}`)
      .then(function (response) {
        setFilteredActivity(response.data.data.data);
        setActivity(response.data.data.data);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text2: error,
        });
      });
  };

  const findFilm = query => {
    let newData = [...Activity];
    if (query !== '' && query.length > 2) {
      let val = newData.filter(o => o.ip_address.includes(query));
      setFilteredActivity(val);
    } else {
      setFilteredActivity(Activity);
    }
  };

  const [activityIndicator,activityIndicator_] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      activityIndicator_(false);
    }, 5000);
  },[activityIndicator])

  return (
    <View style={{flex: 1, backgroundColor: '#15172C'}}>
      <View
        style={{
          height: responsiveScreenHeight(7),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#131222',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingBottom: 5,
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
            SignIn Activity
          </Text>
        </View>
        <Text> </Text>
      </View>
      <ImageBackground
        style={{
          // height: Dimensions.get('screen').height,
          // width: '100%',
          flex: 1,
          backgroundColor: '#15172C',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          // paddingBottom: 5,
          // padding: 5,
          // borderWidth: 2,
          // borderColor: 'green',
        }}
        tintColor="#fff"
        resizeMode="contain"
        source={require('../assets/Lines-PNG-Transparent-Image.png')}>
        <View style={{height: 85}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 18,
                color: '#FFFFFF',
                marginLeft: '6%',
                marginTop: '2%',
              }}>
              Activity
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
              onChangeText={text => findFilm(text)}
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
        {activityIndicator === true ? (
          <ActivityIndicator
            size={'large'}
            animating={activityIndicator}
            color={'#403F62'}
          />
        ) : (
          ''
        )}

        <ScrollView>
          <View style={{height: '90%'}}>
            {filteredActivity.map((rowitem, index) => (
              <LinearGradient
                colors={['#222441', '#050506']}
                style={styles.block}>
                <View style={{bottom: '5%'}}>
                  <Text style={styles.input}>
                    Action :{' '}
                    <Text style={{color: '#F8F8F8'}}>{rowitem.action}</Text>
                  </Text>
                  <Text style={styles.input}>
                    Source :{' '}
                    <Text style={{color: '#F8F8F8'}}>{rowitem.source}</Text>
                  </Text>
                  <Text style={styles.input}>
                    IP Address :{' '}
                    <Text style={{color: '#F8F8F8'}}>{rowitem.ip_address}</Text>
                  </Text>
                  <Text style={styles.input}>
                    Updated At :{' '}
                    <Text style={{color: '#F8F8F8'}}>{rowitem.updated_at}</Text>
                  </Text>
                  <Text style={styles.input}>
                    When :{' '}
                    <Text style={{color: '#F8F8F8'}}>{rowitem.when}</Text>
                  </Text>
                </View>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 12,
    height: 25,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderColor: '#191B2E',
  },

  block: {
    //height: 250,
    backgroundColor: '#15172C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '5%',
    padding: 7,
    borderWidth: 1,
    borderColor: '#403F62',
  },
});

export default SignInActivity;
