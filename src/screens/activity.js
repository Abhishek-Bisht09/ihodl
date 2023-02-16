import React, { Component, useState, useEffect } from 'react';
import {
    Image, StyleSheet, SafeAreaView, TextInput, ImageBackground,
    View, Text, TouchableOpacity, TouchableHighlight, Modal, Pressable, ScrollView
} from 'react-native';
import axios from 'axios';
import { urls } from '../utils/api';
import LinearGradient from 'react-native-linear-gradient';

const Activity = (props) => {

    const onBack = () => {
        props.navigation.goBack()
        props.navigation.openDrawer()
      }

    return (

        <View style={{ height: '100%', backgroundColor: '#131222' }}>
            <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: '10%' }}>
                    <TouchableOpacity style={{ marginLeft: '4%', marginTop: '1%' }}
                        onPress={() => props.navigation.push('DrawerNavigator')}>
                        <Image
                            style={{ height: 18, width: 18 }}
                            source={require('../assets/back_button.png')} /></TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: 25, marginLeft: '30%', color: '#FFFFFF' }}>Activity</Text>
                </View>
            </View>

            <LinearGradient colors={['#222441', '#050506']} style={styles.HeaderView}>
                <Text style={styles.headerContent}>Action</Text>
                <Text style={styles.headerContent}>IP Address</Text>
                <Text style={styles.headerContent}>Updated At</Text>

            </LinearGradient>

            <LinearGradient colors={['#222441', '#050506']} style={styles.bodyContent}>
                <ScrollView>

                    <View style={{
                        height: 40, width: '90%', alignSelf: 'center', borderRadius: 7,
                        flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between', marginTop: '2%'
                    }}>
                        <Image
                            style={{ height: 16, width: 16, marginTop: '3%' }}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={{ height: 20, width: 15, marginTop: '3%' }}
                            source={require('../assets/mobile.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>
                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>
                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={{ height: 20, width: 15, marginTop: '3%' }}
                            source={require('../assets/mobile.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>

                    <View style={styles.view}>
                        <Image
                            style={styles.img}
                            source={require('../assets/web.png')} />
                        <Text style={styles.login}>Login Web</Text>
                        <Text style={styles.ip_adress}>115.127.97.52</Text>
                        <Text style={styles.date}>29 March 2022 <Text style={{ color: '#4FAEFD' }}>07:53 AM</Text></Text>


                    </View>
                </ScrollView>

            </LinearGradient>

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
    date: {
        fontWeight: '500',
        fontSize: 12,
        color: '#808080',
        marginTop: '3%',
        right: 10,
        width: '30%',
        lineHeight: 15,
        textAlign: 'right'
    },
    ip_adress: {
        fontWeight: '400',
        fontSize: 12,
        color: '#808080',
        marginTop: '3%'
    },
    login: {
        fontWeight: '400',
        fontSize: 12,
        color: '#808080',
        marginTop: '3%',
        right: 15
    },
    view: {
        height: 40,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    img: {
        height: 16,
        width: 16,
        marginTop: '3%'
    },
    HeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#403E62',
        margin: 20,
        borderRadius: 10,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '6%',
        width: '90%'
    },

    headerContent: {
        fontWeight: '500',
        fontSize: 14,
        color: '#808080',
    },
    bodyContent: {
        borderWidth: 1,
        borderColor: '#403E62',
        margin: 20,
        borderRadius: 10,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '75%',
        width: '90%',
        bottom: '3%'
    }

});



export default Activity;