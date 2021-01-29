import AsyncStorage from '@react-native-community/async-storage'
import React, { useState, useContext } from 'react'
import { View, Text, Button, StyleSheet, StatusBar, Image, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import AuthContext from '../AuthContext'

// const wait = (timeout) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout)
//     })
// }



function DashboardContent(props) {
    const {studentData, setStudentData} = useContext(AuthContext)

    return (
        <View style={styles.TileContainer}> 
            <View style={styles.TileContainerLeft}>
                <TouchableOpacity
                    onPress={() => props.navigationway.navigation.navigate("Announcement")}
                    style={styles.DashboardTile}
                    underlayColor='#fff'
                    >
                    <View style={styles.iconContainer}>
                        <Image 
                            style={styles.iconImage}
                            source={
                                require('../assets/icons/announcement.png')
                            }
                        />
                    </View>
                    <View style={styles.tileTextContainer}>
                        <Text style={styles.tileTextData}>{props.announcementCount}<Text style={{color: '#909191', fontSize: 12}}>  new</Text></Text>
                        <Text style={styles.tileName}>Announcement</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigationway.navigation.navigate("TabNavigator")}
                    style={styles.DashboardTile}
                    underlayColor='#fff'
                    >
                    <View style={styles.iconContainer}>
                        <Image 
                            style={styles.iconImage}
                            source={
                                require('../assets/icons/assignment.png')
                            }
                        />
                    </View>
                    <View style={styles.tileTextContainer}>
                        <Text style={styles.tileTextData}>{props.assignmentCount}<Text style={{color: '#909191', fontSize: 12}}>  new</Text></Text>
                        <Text style={styles.tileName}>Assignment/Reading</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigationway.navigation.navigate("Results")}
                    style={styles.DashboardTileShort}
                    underlayColor='#fff'
                    >
                    <View style={styles.iconContainer}>
                        <Image 
                            style={styles.iconImage}
                            source={
                                require('../assets/icons/result.png')
                            }
                        />
                    </View>
                    <View style={styles.tileTextContainerShort}>
                        <Text style={styles.tileTextDataShort}>{props.cgpa}<Text style={{color: '#909191', fontSize: 10}}>  CGPA</Text></Text>
                        <Text style={styles.tileName}>Results</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => props.navigationway.navigation.navigate('Marks')}
                    style={styles.DashboardTileShort}
                    underlayColor='#fff'
                    >
                    <View style={styles.iconContainer}>
                        <Image 
                            style={styles.iconImage}
                            source={
                                require('../assets/icons/test.png')
                            }
                        />
                    </View>
                    <View style={styles.tileTextContainerShort}>
                        <Text style={{fontSize: 19, color: '#929394'}}>Marks</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.TileContainerRight}>
                <TouchableOpacity
                    onPress={() => props.navigationway.navigation.navigate("Attendance", {
                        attendanceData: props.attendanceData
                    })}
                    style={styles.DashboardTileShort}
                    >
                    <View style={styles.iconContainer}>
                    <Image 
                        style={styles.iconImage}
                        source={
                            require('../assets/icons/attendance.png')
                        }
                    />
                    </View>
                    <View style={styles.tileTextContainerShort}>
                        <Text style={styles.tileTextDataShort}>{props.aggAttendance}<Text style={{color: '#909191', fontSize: 14}}> %</Text></Text>
                        <Text style={styles.tileName}>Attendance</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigationway.navigation.navigate("Message")}
                    style={styles.DashboardTileShort}
                    >
                    <View style={styles.iconContainer}>
                    <Image 
                        style={styles.iconImage}
                        source={
                            require('../assets/icons/message.png')
                        }
                    />
                    </View>
                    <View style={styles.tileTextContainerShort}>
                        <Text style={styles.tileTextDataShort}>{props.messageCount}</Text>
                        <Text style={styles.tileName}>Messages</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {() => props.navigationway.navigation.navigate("TimeTable", {
                        attendanceData: props.attendanceData
                    })}
                    style={styles.DashboardTile}
                    underlayColor='#fff'
                    >
                    <View style={styles.iconContainer}>
                        <Image 
                            style={styles.iconImage}
                            source={
                                require('../assets/icons/timetable.png')
                            }
                        />
                    </View>
                    <View style={styles.tileTextContainer}>
                        <Text style={styles.tileTextData}>{props.timeTable}<Text style={{color: '#909191', fontSize: 12}}>  Lectures Today</Text></Text>
                        <Text style={styles.tileName}>Time Table</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            "Log Out",
                            "Are you sure you want to Log Out?",
                            [
                                {
                                    text: 'No'
                                }
                                ,
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        try{
                                            AsyncStorage.removeItem('uid')
                                        }
                                        catch(e) {
                                            alert(e)
                                        }
                                        setStudentData({
                                            uid: null,
                                            pass: null,
                                            accessToken: null,
                                            deviceId: null
                                        })
                                    }
                                }
                            ],
                            { cancelable: true }
                        )
                    }}
                    style={{
                        padding: 15,
                        backgroundColor: "#ff0000",
                        borderRadius: 8,
                        height: 80,
                        marginBottom: 20,
                        flexDirection: 'row'
                    }}
                    >
                    <View style={styles.iconContainer}>
                    <Image 
                        style={styles.iconImage}
                        source={
                            require('../assets/icons/log-out.png')
                        }
                    />
                    </View>
                    <View style={styles.tileTextContainerShort}>
                        <Text style={{fontSize: 19, color: '#929394'}}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    TileContainer: {
        flex:1,
        flexDirection: 'row',
        marginTop: 20
    },
    TileContainerLeft: {
        flex: 1,
        marginLeft: 20,
        marginRight: 10
    },
    TileContainerRight: {
        flex: 1,
        marginLeft: 10, 
        marginRight: 20
    },
    DashboardTile: {
        padding: 12,
        backgroundColor: "#262628",
        borderRadius: 8,
        height: 180,
        marginBottom: 20,
    },
    DashboardTileShort: {
        padding: 15,
        backgroundColor: "#262628",
        borderRadius: 8,
        height: 80,
        marginBottom: 20,
        flexDirection: 'row'
    },
    iconContainer: {
        flex: 3
    },
    tileTextContainer: {
        flex: 5
    },
    iconImage: {
        height: 40,
        width: 40
    },
    tileTextData: {
        color: "#fff",
        fontSize: 50
    },
    tileName: {
        color: '#909191',
        fontSize: 12
    },
    tileTextDataShort: {
        color: "#fff",
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    tileTextContainerShort: {
        flex: 5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }   
})

export default DashboardContent