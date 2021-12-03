import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image'

import AuthContext from '../AuthContext'


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

function AssignmentBox(props) {
    const reason = props.reason
    let height = reason == 'OK' ? 100 : 100
    let ifReason = null
    let percText = null
    let markText = null
    if (reason == 'OK') {
        markText = <Text numberOfLines={1} style={{ fontSize: 11, color: '#c8c8c8', marginTop: 14 }}> {`Marks: ${props.marksObt}/${props.maxMarks}`} </Text>
        percText = <Text numberOfLines={1} style={{ fontSize: 11, color: '#c8c8c8' }}>{`Percentage: ${props.percentage} %`}</Text>
    }
    else {
        ifReason = <Text style={{ color: '#daa800', marginTop: 14 }}>{`${reason}`}</Text>
    }
    return (
        <View style={{ height: height, backgroundColor: '#262628', width: '100%', borderRadius: 8, flexDirection: 'row', paddingHorizontal: 12, marginBottom: 10 }}>
            <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: '#fff' }}> { props.courseCode } </Text>
                <Text numberOfLines={1} style={{ fontSize: 12, color: '#c8c8c8' }}> { props.title } </Text>
                {ifReason}
                {markText}
                {percText}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', width: 25 }}>
                <Icons onPress={() => Linking.openURL("http:\/\/assignments.lpu.in\/Teacher\/A1284997552_14307_7_2021_CSE329.pdf")} name={"download"} size={25} color={'#ff5334'} />
            </View>
        </View>
    )
}

function AssignmentScreen() {
    const allAssignmentData = assignment.map(
        assignmentItem => 
            <AssignmentBox 
                downloadLink={assignmentItem.FileUrl}
                courseCode={assignmentItem.CourseCode}
                title={assignmentItem.Title}
                marksObt={assignmentItem.MarksObtained}
                maxMarks={assignmentItem.MaxMarks}
                percentage={assignmentItem.Per}
                reason={assignmentItem.Reason}
            />
    )
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#222324' }}>
        <View style={{ paddingLeft: 15, width: '100%', height:15, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
        <ScrollView style={{ padding: 12, height: '100%', width: '100%', marginBottom: 70 }}>
            {allAssignmentData}
        </ScrollView>
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
    let {studentData , setStudentData} = useContext(AuthContext)
    studentData = JSON.parse(JSON.stringify(studentData))

    useEffect(() => {
        if(assignmentData === null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/GetStudentAcademicTaskMarks/${studentData.accessToken}/${studentData.deviceId}/${studentData.uid}`)
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
        readingMaterial = assignmentData.filter(elements => elements.Category=="Reading Material")
        assignment = assignmentData.filter(elements => elements.Category=="Assignment")
        practical = assignmentData.filter(elements => elements.Category=="Practical")
        console.log(`\n\nReading Material - ${readingMaterial}\n\nAssignment - ${assignment}\n\n`);
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