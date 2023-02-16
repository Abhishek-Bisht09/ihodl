import React, { Component, useState, useEffect } from 'react';
import {
    Image, StyleSheet, SafeAreaView, TextInput, ImageBackground,
    View, Text, TouchableOpacity, TouchableHighlight, Modal, Pressable, ScrollView
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';
import { urls } from '../utils/api';
import Toast from 'react-native-toast-message';

const SendHistory = (props) => {


    return (

        <View style={{ height: '100%', backgroundColor: '#131222' }}>
            <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: '10%' }}>
                    <TouchableOpacity style={{ marginLeft: '4%', marginTop: '1%' }}
                        onPress={() => props.navigation.goBack()}>
                        <Image
                            style={{ height: 18, width: 18 }}
                            source={require('../assets/back_button.png')} /></TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: 25, marginLeft: '22%', color: '#FFFFFF' }}>Send History</Text>
                </View>
            </View>
            <ScrollView>

                <View style={{ height: '78%' }}>

                    <View style={{ height: '40%', backgroundColor: '#15172C', width: '90%', alignSelf: 'center', borderRadius: 20, flexDirection: 'column', justifyContent: 'space-around', marginTop: '5%' }}>
                        <View style={{ bottom: '5%' }}>
                            <Text style={styles.input}>Sender : user@email.com</Text>
                            <Text style={styles.input}>Receiver : adskgaoc@solarunited.net</Text>
                            <Text style={styles.input}>Coin Amount  : 1.0000000000</Text>
                            <Text style={styles.input}>Coin Name : NFT</Text>
                            <Text style={styles.input}>Status : Accepted</Text>
                            <Text style={styles.input}>Created At : 16 September 2022 | 06 : 00 AM</Text>
                        </View>

                    </View>
                    <View style={{ height: '40%', backgroundColor: '#15172C', width: '90%', alignSelf: 'center', borderRadius: 20, flexDirection: 'column', justifyContent: 'space-around', marginTop: '5%' }}>
                        <View style={{ bottom: '5%' }}>
                            <Text style={styles.input}>Sender : user@email.com</Text>
                            <Text style={styles.input}>Receiver : adskgaoc@solarunited.net</Text>
                            <Text style={styles.input}>Coin Amount  : 1.0000000000</Text>
                            <Text style={styles.input}>Coin Name : NFT</Text>
                            <Text style={styles.input}>Status : Accepted</Text>
                            <Text style={styles.input}>Created At : 16 September 2022 | 06 : 00 AM</Text>


                        </View>

                    </View>
                    <View style={{ height: '40%', backgroundColor: '#15172C', width: '90%', alignSelf: 'center', borderRadius: 20, flexDirection: 'column', justifyContent: 'space-around', marginTop: '5%' }}>
                        <View style={{ bottom: '5%', }}>
                            <Text style={styles.input}>Sender : user@email.com</Text>
                            <Text style={styles.input}>Receiver : adskgaoc@solarunited.net</Text>
                            <Text style={styles.input}>Coin Amount  : 1.0000000000</Text>
                            <Text style={styles.input}>Coin Name : NFT</Text>
                            <Text style={styles.input}>Status : Accepted</Text>
                            <Text style={styles.input}>Created At : 16 September 2022 | 06 : 00 AM</Text>


                        </View>

                    </View>


                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({

    input: {
        color: '#F8F8F8',
        fontWeight: '500',
        fontSize: 14,
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%',

    },
});



export default SendHistory;