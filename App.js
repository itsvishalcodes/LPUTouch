/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';


import { NavigationContainer, StackActions, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import AttendanceScreen from './screens/AttendanceScreen'
import Dashboard from './screens/Dashboard'
import AnnouncementView from './screens/AnnouncementView'
import Announcement from './screens/Announcement'
import Message from './screens/Message'
import AllMessage from './screens/AllMessageScreen'
import TabNavigationTop from './screens/TabNavigationTop'
import TimeTableScreen from './screens/TimeTableScreen'
import Results from './screens/ResultsScreen'
import Marks from './screens/MarksScreen'

import LogInScreen from './screens/loginScreens/LogInScreen'
import LoadingComponent from './components/LoadingComponent'

import AuthContext from './AuthContext'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {

  StatusBar.setBarStyle( 'light-content',true)
  StatusBar.setBackgroundColor("#323334")

  const [isFetchingUID, setIsFetchingUID] = useState(true)
  const [studentData, setStudentData] = useState({
    uid: null,
    pass: null,
    accessToken: null,
    deviceId: null
  })

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // AsyncStorage.setItem('uid', '11910547')
        // AsyncStorage.setItem('deviceId', '29904bc142b60dce')
        // AsyncStorage.setItem('accessToken', '7076e035-9ceb-457f-abee-f27fb45dd29c')
        // AsyncStorage.setItem('pass', 'Verygoodboy00!')
        // AsyncStorage.removeItem('uid')
        let inUID = JSON.parse(await AsyncStorage.getItem('uid'))
        console.log(inUID)
        let inpass = null
        let inaccessToken = null
        let inDeviceId = DeviceInfo.getUniqueId()
        console.log(inDeviceId)

        if(inUID!==null) {
          inpass = JSON.parse(await AsyncStorage.getItem('pass'))
          inaccessToken = JSON.parse(await AsyncStorage.getItem('accessToken'))
        }
        if(isFetchingUID==true) {
          setStudentData({
            uid: inUID,
            pass: inpass,
            accessToken: inaccessToken,
            deviceId: inDeviceId
          })
        }
        setIsFetchingUID(false)
        // console.log(uid)
      } catch(e) {
        alert(e)
      }
    }
    bootstrapAsync()
  }, [])

  if(isFetchingUID == true) {
    return (
      <LoadingComponent loadingText="Reading Data" />
    )
  }

  if(studentData.uid==null) {
    console.log("UID Null called")
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{studentData, setStudentData}}>
          <Stack.Navigator initialRouteName={"LogIn"}>
            <Stack.Screen name="LogIn" component={LogInScreen} 
              options={{ 
                title: "LPU Touch",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 15,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                },
              }}
            />
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    )
  }
  else {
    console.log("This also called")
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{studentData, setStudentData}}>
          <Stack.Navigator initialRouteName={"Dashboard"}>
            <Stack.Screen name="Dashboard" component={Dashboard}
              options={{ 
                title: "LPU Touch",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 15,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                },
              }}
            />
            <Stack.Screen name="Marks" component={Marks}
              options={{
                title: "Marks",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}  
            />
            <Stack.Screen name="Results" component={Results}
              options={{
                title: "Results",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}  
            />
            <Stack.Screen name="TimeTable" component={TimeTableScreen}
              options={{
                title: "Time Table",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}  
            />
            <Stack.Screen name="TabNavigator" component={TabNavigationTop}
              options={{
                title: "Assignment Marks",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}  
            />
            <Stack.Screen name="Attendance" component={AttendanceScreen}
              options={{
                title: "Attendance",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}  
            />
            <Stack.Screen name="AllMessage" component={AllMessage} 
              options={{
                title: "Messages",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}
            />
            <Stack.Screen name="Message" component={Message} 
              options={{
                title: "Messages",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }}
            />
            <Stack.Screen name="AnnouncementView" component={AnnouncementView}
              options={{
                title: "Announcement",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }} />
            <Stack.Screen name="Announcement" component={Announcement}
              options={{
                title: "Announcements",
                headerStyle: {
                  backgroundColor: '#323334',
                  elevation: 0,
                  shadowColor: 'transparent',
                  shadowRadius: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: "left"
                },
              }} 
            />
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>

    );
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
