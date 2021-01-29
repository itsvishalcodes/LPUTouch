import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'

import AuthContext from '../AuthContext'

import AttendanceScreenBox from '../components/AttendanceScreenBox'

import { LineChart } from 'react-native-chart-kit'

const AttendanceScreen = ({ route, navigation }) => {

    const screenWidth = Dimensions.get("window").width;
    const { attendanceData } = route.params
    
    const courseName = attendanceData.map((courseInfo) => {
        return courseInfo.CourseCode
    })
    const courseAttend = attendanceData.map((courseInfo) => {
        return courseInfo.Total_Perc.split('.')[0]
    })
    const allAttendanceData = attendanceData.map((courseInfo) => {
        return <AttendanceScreenBox key={courseInfo.CourseCode} courseCode={courseInfo.CourseCode} courseName={courseInfo.CourseName} rollNumber={courseInfo.RollNumber} 
            facultySeating={courseInfo.Room} attendancePerc={courseInfo.Total_Perc.split('.')[0]} navigationway={{navigation}} facultyName={courseInfo.Faculty}/>
    })
    return (
        <View style={ styles.AttendanceScreenContainer }>
            <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%', height:255, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            <Text style={styles.aggAttendance}>{attendanceData[0].Total}<Text style={styles.percSign}>%
                    <Text style={styles.aggAttendanceText}>  Agg Attendance</Text>
                </Text></Text>
                <LineChart
                    data={{
                        labels: courseName,
                        datasets: [
                            {
                                data: courseAttend
                            }
                        ]
                    }}
                    fromZero={false}
                    verticalLabelRotation = {20}
                    width={screenWidth-30}
                    height={185}
                    xLabelsOffset = {-10}
                    yLabelsOffset = {10}
                    chartConfig = {{
                        backgroundGradientFrom: "#43A4E3",
                        backgroundGradientTo: "#9D43E3",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 14
                        },
                        propsForDots: {
                            r: 2,
                            strokeWidth: "2",
                            stroke: '#ffa726'
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 6,
                        borderRadius: 14
                    }}
                />
                
            </View>
            <ScrollView style={styles.AttendanceDetails}>
                <Text style = {{color: '#fff', fontSize: 22, marginBottom: 8}}>courses :</Text>
                    {allAttendanceData}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    aggAttendance: {
        fontSize: 30,
        color: '#fff',
        marginLeft: 14
    },
    percSign: {
        fontSize: 19,
        color: '#909191'
    },
    aggAttendanceText: {
        fontSize: 15,
        color: '#909191'
    },
    AttendanceScreenContainer: {
        flex: 1,
        backgroundColor: '#222324'
    },
    AttendanceDetails: {
        padding: 14
    }
    
})

export default AttendanceScreen