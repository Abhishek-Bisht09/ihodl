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
  ScrollView,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';
import API from '../api/services';
import {APP_URLS} from '../api/urls';

const FAQs = props => {
  useEffect(() => {
    getData();
  }, []);

  const [faq, setfaq] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [newOne, setnewOne] = useState(false);
  const [Currentindex, setCurrentindex] = useState('');

  const toggleExpanded = ind => {
    setCurrentindex(ind);
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
    setnewOne(!newOne);
  };

  const getData = () => {
    API.get(APP_URLS.FAQ)
      .then(function (response) {
        setfaq(response.data.data.data);
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
      <View style={{height: '100%', backgroundColor: '#15172C'}}>
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
              onPress={() => props.navigation.push('DrawerNavigator')}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../assets/back_button.png')}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
              top: 5,
            }}>
            FAQs
          </Text>

          <Text> </Text>
        </View>
        <ImageBackground
          style={{
            height: Dimensions.get('screen').height,
            width: '100%',
            flex: 1,
            backgroundColor: '#15172C',
            paddingBottom: 5,
          }}
          tintColor="#fff"
          resizeMode="contain"
          source={require('../assets/Lines-PNG-Transparent-Image.png')}>
          <ScrollView>
            {faq.map((rowitem, index) => (
              <LinearGradient
                colors={['#222441', '#050506']}
                style={[styles.block]}>
                <TouchableOpacity onPress={() => toggleExpanded(index)}>
                  <View>
                    <Text
                      style={{
                        color: '#808080',
                        fontWeight: '500',
                        fontSize: 12,
                        height: 60,
                        width: '80%',
                        left: '5%',
                        borderColor: '#191B2E',
                        textAlignVertical: 'center',
                      }}>
                      Question :{' '}
                      <Text style={{color: '#F8F8F8'}}>{rowitem.question}</Text>
                    </Text>
                    <Image
                      style={{
                        height: 10,
                        width: 10,
                        alignSelf: 'flex-end',
                        bottom: '40%',
                        right: '5%',
                      }}
                      source={require('../assets/cone_down.png')}
                    />
                  </View>
                </TouchableOpacity>
                {index == Currentindex ? (
                  <Collapsible collapsed={collapsed} align="center">
                    <View
                      style={{
                        right: '1.5%',
                        borderColor: '#191B2E',
                        width: '100%',
                        alignSelf: 'center',
                        paddingBottom: 10,
                        // height: 180,
                      }}>
                      <Text
                        style={[
                          styles.input,
                          {
                            // borderTopWidth: 1,
                          },
                        ]}>
                        Answer :{' '}
                        <Text style={{color: '#F8F8F8'}}>{rowitem.answer}</Text>
                      </Text>
                    </View>
                  </Collapsible>
                ) : null}
              </LinearGradient>
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131222',
  },
  block: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#403F62',
    padding: 5,
    marginTop: '5%',
  },
  input: {
    padding: 5,
    borderColor: '#191B2E',
    color: '#808080',
    width: '90%',
    alignSelf: 'center',
    fontSize: 13,
  },
});

export default FAQs;
