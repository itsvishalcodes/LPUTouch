import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function LogInScreen() {
    return (
        <View style={styles.logInContainer}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/bg-images/9.jpg')}>   
                <View style={styles.logInBoxContainer}>
                    <View style={styles.logInBox}>
                        <Image style={styles.logInBoxLogo} source={require('../../assets/Loading_below_image.png')} />
                        <TextInput keyboardType='numeric' maxLength={8} style={{ height: 45,backgroundColor: '#222324', fontSize: 18, borderRadius: 10, width: '90%', color: '#fff', textAlign: 'center', marginBottom: 20 }} placeholder="Unique ID" placeholderTextColor='#888888' />
                        <TextInput style={{ height: 45,backgroundColor: '#222324', fontSize: 18, borderRadius: 10, width: '90%', color: '#fff', textAlign: 'center' }} placeholder="Password" secureTextEntry={true}  placeholderTextColor='#888888' />
                        <TouchableOpacity
                            underlayColor='#fff'
                            style={styles.logInButton}
                            >
                            <Text style={{color: '#fff', fontSize: 18}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    logInContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222324',
        opacity: 0.8
    },
    logInBoxContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingTop: 100
        // opacity: 0.8
    },
    logInBox: {
        width: '80%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323334',
        borderRadius: 25
    },
    logInBoxLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 25,
        marginTop: -65
    },
    logInButton: {
        height: 50,
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#ff5334',
        opacity: 0.1,
        marginBottom: -50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})