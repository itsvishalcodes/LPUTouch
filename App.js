/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  AsyncStorage
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer, StackActions, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import AttendanceScreen from './screens/AttendanceScreen'
import Dashboard from './screens/Dashboard'
import LoginScreen from './screens/LoginScreen'
import AnnouncementView from './screens/AnnouncementView'
import Announcement from './screens/Announcement'
import Message from './screens/Message'
import AllMessage from './screens/AllMessageScreen'
import TabNavigationTop from './screens/TabNavigationTop'
import TimeTableScreen from './screens/TimeTableScreen'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {

  // const [UID, setUID] = useState(null)

  // let initialRoute = "Dashboard"
  // AsyncStorage.getItem('UID').then(UIDReceived => {setUID(UIDReceived)})
  // if(UID==null) {
  //   initialRoute="LoginScreen"
  // }
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={"Dashboard"}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
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
      </Stack.Navigator>
      </NavigationContainer>

  );
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
