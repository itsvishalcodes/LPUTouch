import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import AuthContext from '../AuthContext'

import { LineChart } from 'react-native-chart-kit'

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

function CourseBox(props) {
    return (
        <View style={courseBoxStyle.courseBoxContainer}>
            <View style={courseBoxStyle.courseDetails}>
                <Text style={{color: '#fff', fontSize: 16}}>{props.courseCode}</Text>
                <Text style={{color: '#fff', fontSize: 10}}>{props.courseName}</Text>
            </View>
            <View style={courseBoxStyle.courseGrade}>
                <Text style={{color: '#fff', fontSize: 14}}>{props.grade}</Text>
            </View>
        </View>
    )
}

function TermBox(props) {

    const [activeTerm, setActiveTerm] = useState(null)

    useEffect(() => {
        setActiveTerm(props.activeTerm)
    })

    return (
        <TouchableOpacity onPress={props.onPress} style={ activeTerm===props.TermId ? TermBoxStyles.TermBoxContainerActive : TermBoxStyles.TermBoxContainer} >
            <Text style={TermBoxStyles.activeTermText}>{props.TermId}</Text>
        </TouchableOpacity>
    )
}

export default function Results() {
    let {studentData , setStudentData} = useContext(AuthContext)
    studentData = JSON.parse(JSON.stringify(studentData))

    const screenWidth = Dimensions.get("window").width;

    const [ resultData, setResultData ] = useState(null)
    const [ activeTerm, setActiveTerm ] = useState(null)

    let termIds = []
    let romanTerms = []
    let tgpas = []

    useEffect(() => {
        if(resultData === null && activeTerm === null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentResultForService/${studentData.uid}/${studentData.accessToken}/${studentData.deviceId}`)
            .then(response => {
                return response.text()
            })
            .then(responseData => {
                    let dataReceived = JSON.parse(responseData)
                    setResultData(dataReceived)
            })
            .catch((e) => alert(e))
        }
    })

    if(resultData === null) {
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
        function ifExists(arr, arr2, arr3) {
            resultData.map(function(courseResult) {
                if(arr.find(TermId => courseResult.Termid == TermId) === undefined) {
                    arr.push(courseResult.Termid)
                    arr2.push(courseResult.RomanTerm)
                    arr3.push(courseResult.TermPercentOrTGPA.substring(7))
                }
            })
        }
        ifExists(termIds, romanTerms, tgpas)

        if(activeTerm == null)
            setActiveTerm(termIds[0])

        const resultGrouped = groupBy(resultData, result => result.Termid)

        const allTermBoxes = termIds.map((termId) => 
            <TermBox key={termId} onPress={() => setActiveTerm(`${termId}`)} activeTerm={activeTerm} TermId={`${termId}`} />
        )

        console.log(`current active Term - ${activeTerm}`)
        let allCoursesGrade = null
        if(activeTerm != null) {
            allCoursesGrade = resultGrouped.get(activeTerm).map((course) => <CourseBox courseCode={course.CourseCode} grade={course.GradeOrMarks.substring(8)} courseName={course.Course.split(':: ')[1]} />)
        }

        return (
            <View style={styles.resultContainer}>
                <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%', height:330, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <Text style={styles.aggAttendance}>7.80<Text style={styles.percSign}>  CGPA
                    </Text></Text>
                    <LineChart
                        data={{
                            labels: romanTerms,
                            datasets: [
                                {
                                    data: tgpas
                                }
                            ]
                        }}
                        width={screenWidth-30}
                        height={185}
                        xLabelsOffset = {-10}
                        yLabelsOffset = {10}
                        chartConfig = {{
                            backgroundGradientFrom: "#6C1AF2",
                            backgroundGradientTo: "#0FA1EF",
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
                    <Text style={{color: '#929394'}}>Terms:</Text>
                    <ScrollView horizontal={true}>
                        {allTermBoxes}
                    </ScrollView>
                </View>
                <View style={styles.GradeContainer}>
                    <ScrollView style={{marginBottom: 315}}>
                        <Text style={styles.TGPAText}>{ allCoursesGrade===null ? null : resultGrouped.get(activeTerm)[0].TermPercentOrTGPA }</Text>
                        { allCoursesGrade===null ? null : allCoursesGrade }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        backgroundColor: '#222324'
    },
    aggAttendance: {
        fontSize: 30,
        color: '#fff',
        marginLeft: 14
    },
    percSign: {
        fontSize: 15,
        color: '#909191'
    },
    aggAttendanceText: {
        fontSize: 15,
        color: '#909191'
    },
    GradeContainer: {
        padding: 15,
        
    },
    TGPAText: {
        color: '#929394',
        fontSize: 18,
        marginBottom: 10
    }
})

let TermBoxStyles = StyleSheet.create({
    TermBoxContainer: {
        height: 40,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: 6
    },
    activeTermText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    TermBoxContainerActive: {
        height: 40,
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ff5334',
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: 6
    },
})

const courseBoxStyle = StyleSheet.create({
    courseBoxContainer: {
        flexDirection: 'row',
        backgroundColor: '#323334',
        height: 70,
        width: '100%',
        marginBottom: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseDetails: {
        flex: 4,
        justifyContent: 'center',
        paddingLeft: 10
    },
    courseGrade: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5334',
        height: 40,
        width: 40,
        marginRight: 10,
        borderRadius: 20
    }
})