import React, { Component, useState, useEffect } from 'react';
import {
    Image, StyleSheet, SafeAreaView, TextInput, ImageBackground,
    View, Text, TouchableOpacity, TouchableHighlight, Modal, Pressable,
} from 'react-native';

const MyProfile = (props) => {

    return (

        <View style={{ height: '100%', backgroundColor: '#15172C' }}>
            <View style={{ backgroundColor: '#131222', height: '33%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, justifyContent:'center', alignItems:'center', }}>
                <View style={{ width:'100%', flexDirection:'row', marginBottom:'8%'}}>
                <TouchableOpacity style={{ marginLeft:'4%', marginTop:'1%'}}
                        onPress={() => props.navigation.openDrawer()}>
                <Image
                  style={{ height: 18, width: 18 , marginLeft:'4%', marginTop:'1%'}}
                  source={require('../assets/back_button.png')} /></TouchableOpacity>
                    <Text style={{ fontWeight:'700', fontSize:25, marginLeft:'28%', color:'#FFFFFF'}}>Profile</Text>
                </View>
<View style={{ flexDirection:'row', width:'65%', justifyContent:'space-between'}}>
            <TouchableOpacity><ImageBackground
                style={{ height: 113, width: 115, marginTop: '3%', justifyContent: 'center', alignItems: 'center' }}
                source={require('../assets/round_icon.png')}>
                <Image
                  style={{ height: 40, width: 39 }}
                  source={require('../assets/user_profile.png')} />
               </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity><ImageBackground
                style={{ height: 113, width: 115, marginTop: '3%', justifyContent: 'center', alignItems: 'center' }}
                source={require('../assets/round_icon.png')}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require('../assets/medal.png')} />

              </ImageBackground>
              </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: '67%', backgroundColor: '#15172C' }}>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, { marginTop: '6%' }]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Mr User"
                        placeholderTextColor='white' />
                    <TextInput
                        style={[styles.input]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Email : user@email.com"
                        placeholderTextColor='white' />
                    <TextInput
                        style={[styles.input]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Plan Name : Platinum"
                        placeholderTextColor='white' />
                    <TextInput
                        style={[styles.input]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Blocked Coins : 196022.99"
                        placeholderTextColor='white' />
                </View>
                <View style={{ }}>
                    <Text style={{ fontWeight: '500', fontSize: 19, color: '#F8F8F8', padding: 15, marginTop: '3%' }}>Profile Information</Text>

                    <Text style={{ fontWeight: '600', fontSize: 15, color: '#F8F8F8',  marginLeft:'5%' }}>Name</Text>
                    <TextInput
                        style={[styles.input, {alignSelf:'center'}]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Mr user"
                        placeholderTextColor='white' />
                    <Text style={{ fontWeight: '600', fontSize: 15, color: '#F8F8F8', marginTop: '3%', marginLeft:'5%'  }}>Country</Text>

                    <TextInput
                        style={[styles.input, {alignSelf:'center'}]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="bd"
                        placeholderTextColor='white' />

                    <Text style={{ fontWeight: '600', fontSize: 15, color: '#F8F8F8', marginTop: '3%', marginLeft:'5%'  }}>Email Address</Text>

                    <TextInput
                        style={[styles.input, {alignSelf:'center'}]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="email"
                        placeholderTextColor='white' />

                    <Text style={{ fontWeight: '600', fontSize: 15, color: '#F8F8F8', marginTop: '3%', marginLeft:'5%'  }}>Email Verification</Text>

                    <TextInput
                        style={[styles.input, {alignSelf:'center'}]}
                        // onChangeText={onChangeEmail}
                        // value={Email}
                        placeholder="Active"
                        placeholderTextColor='white' />
                </View>
                <Image style={{}} source={require('../assets/tansparent_lines.png')} />
            </View>
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
});



export default MyProfile;