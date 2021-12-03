import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import { set } from 'react-native-reanimated'
import LoadingComponent from '../../components/LoadingComponent'
import AuthContext from '../../AuthContext'

export default function LogInScreen() {

    const { studentData, setStudentData } = useContext(AuthContext)

    const [uid, setUID] = useState('')
    const [pass, setPass] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    function LogIn() {
        setIsLoggingIn(true)
        console.log(`DeviceId = ${studentData.deviceId}`)
        console.log(`UID = ${uid}`)
        console.log(`Pass = ${pass}`)
        fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/CheckVersion/${studentData.deviceId}`)
        .then(() => 
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/Testing`, {
                method: 'post',
                headers: {
                    'host': 'ums.lpu.in',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserId: `${uid}`,
                    password: `${pass}`,
                    Identity: `aphone`,
                    DeviceId: `${studentData.deviceId}`,
                    PlayerId: ``
                })
            })
            .then(attendResponse => {
                // console.log(attendResponse.text())
                return attendResponse.text()
            })
            .then(response => {
                console.log(response)
                if(JSON.parse(response).TestingResult[0].AccessToken !== "") {
                    const _setData = async () => {
                        try{
                            await AsyncStorage.setItem('uid', JSON.stringify(uid))
                            await AsyncStorage.setItem('pass', JSON.stringify(pass))
                            await AsyncStorage.setItem('accessToken', JSON.stringify(JSON.parse(response).TestingResult[0].AccessToken))
                        }
                        catch(e) {
                            alert (e)
                        }
                    }
                    _setData()
                    setStudentData({
                        ...studentData,
                        uid: `${uid}`,
                        pass: `${pass}`,
                        accessToken: `${JSON.parse(response).TestingResult[0].AccessToken}`
                    })
                    console.log(uid)
                    console.log(`Obt. Pass - ${pass}`)
                    console.log(`Obt. AccessToken - ${JSON.parse(response).TestingResult[0].AccessToken}`)
                    
                    // console.log(`UID - ${AsyncStorage.getItem('uid')}`)
                    // console.log(`Pass - ${AsyncStorage.getItem('pass')}`)
                    // console.log(`AT - ${AsyncStorage.getItem('accessToken')}`)
                    // console.log(`Signed In Successfully = ${JSON.parse(response).TestingResult[0].AccessToken}`)
                }
                else {
                    alert(JSON.parse(response).TestingResult[0].MenuText)
                    setIsLoggingIn(false)
                }
            })
        )
        .catch(e => alert(e))
    }
    if(isLoggingIn==false) {
        let bgImage = Math.floor(Math.random() * 10)
        const img1 = require(`../../assets/bg-images/1.jpg`)
        const img2 = require(`../../assets/bg-images/2.jpg`)
        const img3 = require(`../../assets/bg-images/3.jpg`)
        const img4 = require(`../../assets/bg-images/4.jpg`)
        const img5 = require(`../../assets/bg-images/5.jpg`)
        const img6 = require(`../../assets/bg-images/6.jpg`)
        const img7 = require(`../../assets/bg-images/7.jpg`)
        const img8 = require(`../../assets/bg-images/8.jpg`)
        const img9 = require(`../../assets/bg-images/9.jpg`)
        const img10 = require(`../../assets/bg-images/10.jpg`)
        const bgArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
        return (
            <View style={styles.logInContainer}>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={bgArray[bgImage]}>   
                    <View style={styles.logInBoxContainer}>
                        <View style={styles.logInBox}>
                            <Image style={styles.logInBoxLogo} source={require('../../assets/Loading_below_image.png')} />
                            <TextInput value={uid} onChangeText={setUID} keyboardType='numeric' maxLength={8} style={{ height: 45,backgroundColor: '#222324', fontSize: 18, borderRadius: 10, width: '90%', color: '#fff', textAlign: 'center', marginBottom: 20 }} placeholder="Unique ID" placeholderTextColor='#888888' />
                            <TextInput value={pass} onChangeText={setPass} style={{ height: 45,backgroundColor: '#222324', fontSize: 18, borderRadius: 10, width: '90%', color: '#fff', textAlign: 'center' }} placeholder="Password" secureTextEntry={true}  placeholderTextColor='#888888' />
                            <TouchableOpacity
                                onPress={() => LogIn()}
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
    else if(isLoggingIn==true) {
        return <LoadingComponent loadingText="Logging In" />
    }
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
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323334',
        borderRadius: 25
    },
    logInBoxLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
        marginTop: -50
    },
    logInButton: {
        height: 50,
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#ff5334',
        opacity: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})