import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DashboardUpcomingLectures(props) {

    return (
        <View style={styles.UpcomingLecturesContainer}>
            <View style={styles.UpcomingText}>
                <Text style={{color: '#000'}}>{props.ifUpcoming}</Text>
            </View>
            <View style={styles.UpcomingLecturesDetails}>
                <View style={styles.UpcomingLectureName}>
                    <View style={styles.UpcomingLectureCode}>
                        <Text style={{color: '#fff', fontSize: 15}}>{props.courseCode}</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{color: '#fff', fontSize: 10}}>{props.courseName}</Text>
                        <Text style={{color: '#909191', fontSize: 10}}>{props.roomNo}</Text>
                    </View>
                    <View style={styles.UpcomingLectureAttendance}>
                        <Text style={{color: '#fff', fontSize: 18}}>{props.courseAttendance}%</Text>
                        <Text style={{color: '#909191', fontSize: 8}}>Course Attendance</Text>
                    </View>
                </View>
                <View style={styles.UpcomingLectureTime}>
                    <Text style={{color: '#fff'}}>{props.startTime}</Text>
                    <Text style={{color: '#fff', fontSize: 10}}>{props.timeofDay}</Text>
                    <Text style={{color: '#fff'}}>{props.endTime}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    UpcomingLecturesContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginRight: 20
    },
    UpcomingText: {
        flex: 1,
        height: 3,
        width: 90,
        backgroundColor: '#e8f2a3',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    UpcomingLecturesDetails: {
        flexDirection: 'row',
        flex: 3,
        width: 310,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#ff5334',
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 14,
    },
    UpcomingLectureName: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#222324',
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
        borderBottomRightRadius: 14,
        borderTopLeftRadius: -10
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

export default DashboardUpcomingLectures