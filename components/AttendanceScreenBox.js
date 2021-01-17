import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const attendIcon = (attendancePerc) => {
    if (attendancePerc >=85)
        return require("../assets/icons/attend_green.png")
    else if(attendancePerc >=75 && attendancePerc < 85)
        return require("../assets/icons/attend_yellow.png")
    else
        return require("../assets/icons/attend_red.png")
}

export default function AttendanceScreenBox(props) {
    return (
        <TouchableOpacity
            style={styles.AttendanceTile}
            >
                <View style={{ borderRadius: 8, justifyContent: 'center', padding: 5, width: 50, backgroundColor: '#222324', height: 50, alignItems: 'center'}}>
                    <Image
                        style={styles.iconImage}
                        source={
                            attendIcon(props.attendancePerc)
                        }
                    />
                </View>
                <View  style={{ flex: 1, justifyContent: 'center', paddingLeft: 12, paddingRight: 12}}>
                        <Text style={{color: '#fff', fontSize: 18 }}>{props.courseCode}</Text>
                        <Text numberOfLines={1} style={{color: '#fff', fontSize: 12 }}>{props.courseName}</Text>
                        <Text numberOfLines={1} style={{color: '#909191', fontSize: 12 }}>Roll No: {props.rollNumber}</Text>
                        
                </View>
                <View  style={{ flex:1, alignItems: 'flex-end', justifyContent: 'center', paddingLeft: 12, paddingRight: 18}}>
                        <Text style={{color: '#fff', fontSize: 28 }}>{props.attendancePerc}% <Image
                            style={{width: 16, height: 16}}
                            source={
                                require('../assets/icons/right-icon.png')
                            }
                        />
                        </Text>
                        <Text numberOfLines={1} style={{color: '#909191', fontSize: 12 }}>Faculty: {props.facultyName}</Text>
                        <Text numberOfLines={1} style={{color: '#909191', fontSize: 12 }}>({props.facultySeating})</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconImage: {
        height: 30,
        width: 30
    },
    AttendanceTile: {
        flexDirection: 'row',
        backgroundColor: '#323334',
        borderRadius: 10,
        height: 85,
        marginBottom: 12,
        alignItems: 'center',
        paddingLeft: 10,
    },
})