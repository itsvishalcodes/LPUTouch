import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image'


let readingMaterial = null
let assignment = null
let practical = null


function ReadingBox(props) {
    return (
        <View style={{ height: 80, backgroundColor: '#262628', width: '100%', borderRadius: 8, flexDirection: 'row', padding: 12, marginBottom: 10 }}>
            <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#fff'}}>{props.courseCode}</Text>
                <Text numberOfLines={1} style={{fontSize: 12, color: '#fff'}}>{props.title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', width: 25 }}>
                <Icons onPress={() => Linking.openURL(props.downloadLink)} name={"download"} size={25} color={'#ff5334'} />
            </View>
        </View>
    )
}

function AssignmentScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#222324' }}>
        <View style={{ paddingLeft: 15, width: '100%', height:15, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
        <Text>{assignment.length}</Text>
        </View>
    );
}

function PracticalScreen() {
        return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#222324' }}>
            <View style={{ paddingLeft: 15, width: '100%', height:15, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
            <Text>{practical.length}</Text>
        </View>
        );
  }

function ReadingScreen() {
    const allReadingData = readingMaterial.map((readingItem) => <ReadingBox downloadLink={readingItem.FileUrl} courseCode={readingItem.CourseCode} title={readingItem.Title} />)
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#222324' }}>
            <View style={{ paddingLeft: 15, width: '100%', height:15, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
            <ScrollView style={{ padding: 12, height: '100%', width: '100%', marginBottom: 70 }}>
                {allReadingData}
            </ScrollView>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function TabNavigationTop() {
    const [assignmentData, setAssignmentData] = useState(null)
    const uid = `11910547`
    const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    const deviceId = `29904bc142b60dce`

    useEffect(() => {
        if(assignmentData === null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/GetStudentAcademicTaskMarks/${accessToken}/${deviceId}/${uid}`)
                .then(response => {
                    return response.text()
                })
                .then(responseData => {
                        let dataReceived = JSON.parse(responseData)
                        console.log(dataReceived)
                        setAssignmentData(dataReceived)
                })
                .catch((e) => alert(e))
        }
    })

    if(assignmentData === null) {
        return (
            <View style={{flex: 1, backgroundColor: '#222324', alignItems: 'center', justifyContent: 'center'}}>
                <FastImage
                    style={{width: 100, height: 100}}
                    source={
                        require('../assets/InLoadingGif.gif')
                    }
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        )
    }
    else {
        readingMaterial = assignmentData.filter(elements => elements.AssignmentType=="Reading Material")
        assignment = assignmentData.filter(elements => elements.AssignmentType=="Assignment")
        practical = assignmentData.filter(elements => elements.AssignmentType=="Practical")
        return (
            <Tab.Navigator 
            initialRouteName="Assignment"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Assignment') {
                        iconName = 'edit'
                    } else if (route.name === "Practical") {
                        iconName = 'flask'
                    } else if (route.name === "Reading") {
                        iconName = 'book-reader'
                    }

                    return <Icons name={iconName} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: true,
                style: {
                    backgroundColor: '#323334',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    paddingBottom: 3
                }
            }}
            >
                <Tab.Screen name="Assignment" component={AssignmentScreen} options={{ tabBarBadge: assignment.length }} />
                <Tab.Screen name="Practical" component={PracticalScreen} options={{ tabBarBadge: practical.length }} />
                <Tab.Screen name="Reading" component={ReadingScreen} options={{ tabBarBadge: readingMaterial.length }} />
            </Tab.Navigator>
        );
    }
}