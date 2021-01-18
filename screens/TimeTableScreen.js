import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import FastImage from 'react-native-fast-image'

function ScheduleBox(props) {
    return (
        <View style={stylesScheduleBox.UpcomingLecturesContainer}>
            <View style={stylesScheduleBox.UpcomingLecturesDetails}>
                <View style={stylesScheduleBox.UpcomingLectureName}>
                    <View style={stylesScheduleBox.UpcomingLectureCode}>
                        <Text style={{color: '#fff', fontSize: 15}}>{props.courseCode}</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{color: '#fff', fontSize: 10}}>{props.courseName}</Text>
                        <Text style={{color: '#909191', fontSize: 10}}>{props.roomNo}</Text>
                    </View>
                    <View style={stylesScheduleBox.UpcomingLectureAttendance}>
                        <Text style={{color: '#fff', fontSize: 18}}>{props.courseAttendance}%</Text>
                        <Text style={{color: '#909191', fontSize: 8}}>Course Attendance</Text>
                    </View>
                </View>
                <View style={stylesScheduleBox.UpcomingLectureTime}>
                    <Text style={{color: '#fff'}}>{props.startTime}</Text>
                    <Text style={{color: '#fff', fontSize: 8}}>{props.timeofday}</Text>
                    <Text style={{color: '#fff'}}>{props.endTime}</Text>
                </View>
            </View>
        </View>
    )
}

function DayBox(props) {

    const [activeDay, setActiveDay] = useState(null)

    useEffect(() => {
        setActiveDay(props.activeDay)
    })

    return (
        <TouchableOpacity onPress={props.onPress} style={ activeDay===props.dayPrefix ? dayBoxStyles.dayBoxContainerActive : dayBoxStyles.dayBoxContainer}>
            <Text style={dayBoxStyles.dayPrefixText}>{props.dayPrefix}</Text>
        </TouchableOpacity>
    )
}

export default function TimeTableScreen({ route, navigation }) {

    const { attendanceData } = route.params


    const [activeDay, setActiveDay] = useState('M')
    const [timeTable, setTimeTable] = useState(null)

    const uid = `11910547`
    const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    const deviceId = `29904bc142b60dce`
 
    let courseDetails = null

    function getCourseName(courseCode) {
        courseDetails = {}
        attendanceData.find(courseInfo => {
            if(courseInfo.CourseCode == courseCode.trim()) {
                courseDetails.courseName = courseInfo.CourseName
                courseDetails.courseAttendance = courseInfo.Total_Perc.split(".")[0]
            }
        })
        return courseDetails
    }

    useEffect(() => {
        if(timeTable===null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentTimeTableForService/${uid}/${accessToken}/${deviceId}`)
            .then(response => {
                return response.text()
            })
            .then(responseData => {
                let dataReceived = JSON.parse(responseData)
                setTimeTable(dataReceived)
            })
            .catch((e) => alert(e))
        }
    })

    if(timeTable === null) {
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
        const attendanceToDisp = timeTable.filter(element => element.AttendanceDay.startsWith(activeDay)).map(filteredElem => {

                return <ScheduleBox courseCode={filteredElem.Description.split('/')[1].split(':')[2]} courseName={getCourseName(filteredElem.Description.split('/')[1].split(':')[2]).courseName} roomNo={filteredElem.Description.split('/')[2]} courseAttendance={getCourseName(filteredElem.Description.split('/')[1].split(':')[2]).courseAttendance} startTime={filteredElem.AttendanceTime.split('-')[0]} endTime={filteredElem.AttendanceTime.split('-')[1].split(' ')[0]} timeofday={filteredElem.AttendanceTime.split('-')[1].split(' ')[1]}  />
            }     
        )
        return (
            <View style={styles.TimeTableContainer}>
                <View style={{width: '100%', height:120, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, padding: 20}}>
                    <ScrollView horizontal={true}>
                    <DayBox onPress={() => setActiveDay('M')} dayPrefix={'M'} activeDay={activeDay} />
                    <DayBox onPress={() => setActiveDay('Tu')} dayPrefix={'Tu'} activeDay={activeDay} />
                    <DayBox onPress={() => setActiveDay('W')} dayPrefix={'W'} activeDay={activeDay} />
                    <DayBox onPress={() => setActiveDay('Th')} dayPrefix={'Th'} activeDay={activeDay} />
                    <DayBox onPress={() => setActiveDay('F')} dayPrefix={'F'} activeDay={activeDay} />
                    <DayBox onPress={() => setActiveDay('S')} dayPrefix={'S'} activeDay={activeDay} />
                    </ScrollView>
                </View>
                <View style={styles.scheduleContainer}>
                    <Text style={{color: '#fff', fontSize: 22, marginBottom: 15}}>Schedule</Text>
                    <ScrollView>
                        {attendanceToDisp}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TimeTableContainer: {
        flex: 1,
        backgroundColor: '#222324'
    },
    scheduleContainer: {
        padding: 18
    }
})

let dayBoxStyles = StyleSheet.create({
    dayBoxContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2
    },
    dayPrefixText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    dayBoxContainerActive: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ff5334'
    },
})

const stylesScheduleBox = StyleSheet.create({
    UpcomingLecturesContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 16,
        height: 80
    },
    UpcomingLecturesDetails: {
        flexDirection: 'row',
        flex: 3,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#ff5334',
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 14,
        borderTopLeftRadius: 8
    },
    UpcomingLectureName: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#323334',
        height: '100%',
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 14,
        paddingLeft: 15,
        paddingRight: 15
    },
    UpcomingLectureTime: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14
    },
    UpcomingLectureCode: {
        flex: 4,
        justifyContent: 'center'
    },
    UpcomingLectureAttendance: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})