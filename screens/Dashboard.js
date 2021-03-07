import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, StyleSheet, Image, RefreshControl } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icons from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

import LoadingComponent from '../components/LoadingComponent'
import DashboardUpcomingLectures from '../components/DashboardUpcomingLectures'
import DashboardContent from '../components/DashboardContent'
import DashboardDrawer from './DashboardDrawer'

import AuthContext from '../AuthContext'


// const Drawer = createDrawerNavigator();

// function SideDrawer() {
//   return (
//       <Drawer.Navigator drawerStyle={{
//           backgroundColor: '#222324'
//       }}
//       drawerContentOptions={{
//           inactiveTintColor: "#fff"
//       }}
//       >
//         <Drawer.Screen name="Dashboard" component={Dashboard}
//           options={{
//               drawerIcon: ({focused, size}) => (
//                   <Icons name='tachometer-alt' size={size} color={focused ? '#7cc' : '#ccc'} />
//               )
//           }}
//         />
//       </Drawer.Navigator>
//   );
// }

function Dashboard({navigation}) {
    console.log("Dashboard started")
    const [data, setData] = useState(null)
    const [attendanceData, setAttendanceData] = useState(null)
    // const [refreshing, setRefreshing] = useState(false)

    let dataReceived = null

    let {studentData , setStudentData} = useContext(AuthContext)
    studentData = JSON.parse(JSON.stringify(studentData))

    useEffect(() => {
        console.log("UseEffect entered")

            console.log("Fetching BasicInfo Began")
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentBasicInfoForService/${studentData.uid}/${studentData.accessToken}/${studentData.deviceId}/`)
                .then(response => {
                    console.log(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentBasicInfoForService/${studentData.uid}/${studentData.accessToken}/${studentData.deviceId}/`)
                    return response.text()
                })
                .then(responseData => {
                    dataReceived = JSON.parse(responseData)
                    console.log("BasicInfoFetched")
                    setData(dataReceived)
                    console.log('Stored Data - ', data)
                    console.log('Received Data - ', dataReceived)
                })
                .then(() => {
                    if(dataReceived[0].Error.length === 0) {
                        console.log("Fetching Attendance Began")
                        fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentAttendanceForServiceNew/${studentData.uid}/${studentData.accessToken}/${studentData.deviceId}`)
                            .then(attendResponse => {
                                return attendResponse.text()
                            })
                            .then(attendResponseData => {
                                try{
                                    let attendDataReceived = JSON.parse(attendResponseData)
                                    console.log("Attendance Fetched")
                                    setAttendanceData(attendDataReceived)
                                } catch(e) {
                                }
                            })
                    }
                    else{
                        console.log("Session Expired Call")
                        try{
                            AsyncStorage.removeItem('uid')
                            console.log('Removed Item UID because of session Expire')
                        }
                        catch(e) {
                            alert(e)
                        }
                        // alert(data[0].Error)
                        setStudentData({
                            uid: null,
                            pass: null,
                            accessToken: null,
                            deviceId: null
                        })
                    }
                    })
        
    }, [])

    console.log(studentData.uid)

    
    let courseDetails = {}
    function getCourseName(courseCode) {
        courseDetails = {}
        attendanceData.find(courseInfo => {
            if(courseInfo.CourseCode == courseCode) {
                courseDetails.courseName = courseInfo.CourseName
                courseDetails.courseAttendance = courseInfo.Total_Perc.split(".")[0]
            }
        })
        return courseDetails
    }

    if(!data || !attendanceData) {
        console.log("Loading Component called")
        return (
            <LoadingComponent loadingText="Fetching Data..." />
        )
    }
    else {
        console.log("Rendered")
        let upcomingLectureData = null
        if(data[0].TimeTable.length == 0) {
            upcomingLectureData = <Image
            style = {{ height: 90, width: 250 }}
             source={
                require('../assets/noLectureImage.png')
            } />
        }
        else {
            upcomingLectureData = data[0].TimeTable.map(function(upcomingData) {
                return <DashboardUpcomingLectures key={upcomingData.AttendanceTime} courseName={getCourseName(upcomingData.CourseCode).courseName} courseAttendance={courseDetails.courseAttendance} ifUpcoming={upcomingData.AttendanceType} courseCode={upcomingData.CourseCode} roomNo={upcomingData.RoomNumber} startTime={upcomingData.AttendanceTime.substring(0, 2)} endTime={upcomingData.AttendanceTime.substring(3, 5)} timeofDay={upcomingData.AttendanceTime.substring(6, 8)} />
            })
        }
        return (
            <View style={styles.DashboardContainer}>
                <View style={styles.DashboardHeader}>
                    <View style={{flexDirection: 'row', flex: 3}}>
                        <View style={{flex: 1, marginTop: 5, marginLeft: 48, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text style={{fontWeight: 'bold', color: '#909191', fontFamily: 'ProductSans'}}>Howdy,</Text>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{color: '#909191', fontSize: 17, fontFamily: 'Product-Sans-Regular'}}>{data === null ? null : data[0].StudentName}</Text>
                        </View>
                        <View style={{flex: 1, marginTop: -8, marginRight: 48, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <View style={{width: 40, height: 40, borderRadius:20, backgroundColor: "#fff", marginBottom: 5}}>
                                <Image
                                    style = {{width: 40, height: 40, borderRadius: 20}}
                                    source={
                                    data===null ? null : 
                                    {
                                        uri: `data:image/png;base64,${data[0].StudentPicture}`
                                    }}
                                ></Image>
                            </View>
                            <Text onPress={() => navigation.navigate("Home")} style={{color: '#909191'}}>View Profile  <Image
                                style={{width: 16, height: 16}}
                                source={
                                    require('../assets/icons/right-icon.png')
                                }
                            /></Text>
                        </View>
                    </View>
                    <View style={{flex: 4,}}>
                        <ScrollView horizontal={true}>
                            {upcomingLectureData}
                        </ScrollView>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{color: '#909191', marginLeft: 25}}>{data[0].TimeTable.length} Lectures today</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Text onPress={() => navigation.navigate('TimeTable', {
                                attendanceData: attendanceData
                            })} style={{color: '#909191', marginRight: 25}}>View Time Table  <Image
                                style={{width: 16, height: 16}}
                                source={
                                    require('../assets/icons/right-icon.png')
                                }
                            /></Text>
                            </View>
                    </View>
                </View>
                <View style={styles.DashboardContent}>
                    <ScrollView>
                        <DashboardContent attendanceData={attendanceData} navigationway={{navigation}} announcementCount={data[0].AnnouncementCount} cgpa={data[0].CGPA} assignmentCount={data[0].AssignmentCount} 
                        aggAttendance={data[0].AggAttendance.split(" ")[0]} messageCount={data[0].MyMessagesCount} timeTable={data[0].TimeTable.length} />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    DashboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222324'
    },
    DashboardHeader: {
        height: 225,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#323334',
        width: '100%',
        // borderRadius: 25
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25        
    },
    DashboardContent: {
		flex: 7,
		width: '100%'
    }
})

export default Dashboard