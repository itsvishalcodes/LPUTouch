import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

import { LineChart } from 'react-native-chart-kit'

export default function Results() {
    const screenWidth = Dimensions.get("window").width;

    const [ resultData, setResultData ] = useState(null)
    const [ marksData, setMarksData ] = useState(null)

    let termIds = []
    let MarksFiltered = []
    let ResultFiltered = []
    let tgpa = []
    let romanTerm = []

    const uid = `11910547`
    const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    const deviceId = `29904bc142b60dce`

    useEffect(() => {
        if(resultData === null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentResultForService/${uid}/${accessToken}/${deviceId}`)
            .then(response => {
                return response.text()
            })
            .then(responseData => {
                    let dataReceived = JSON.parse(responseData)
                    setResultData(dataReceived)
            })
            .then(() => {
                fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentResultMarksForService/${uid}/${accessToken}/${deviceId}`)
                .then(response => {
                    return response.text()
                })
                .then(responseData => {
                    let dataReceived = JSON.parse(responseData)
                    setMarksData(dataReceived)
                })
            })
            .catch((e) => alert(e))
        }
    })

    if(marksData === null) {
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
        marksData.map((item) => {
            termIds.push(item.Termid)
        })
        // console.log(termIds)
        termIds.map((termId) => {
            let tempResultFilter = resultData.filter(item => item.Termid == termId)
            ResultFiltered.push(tempResultFilter)
            let tempMarksFilter = marksData.filter(item => item.Termid == termId)
            MarksFiltered.push(tempMarksFilter)
            let temptgpa = resultData.find(element => element.Termid == termId)
            temptgpa!=undefined ? tgpa.push(temptgpa.TermPercentOrTGPA.substring(7)) : null
            temptgpa!=undefined ? romanTerm.push(temptgpa.RomanTerm) : null
            // console.log(ResultFiltered)
        })
        return (
            <View style={styles.resultContainer}>
                <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%', height:255, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <Text style={styles.aggAttendance}>7.80<Text style={styles.percSign}>  CGPA
                    </Text></Text>
                    <LineChart
                        data={{
                            labels: romanTerm,
                            datasets: [
                                {
                                    data: tgpa
                                }
                            ]
                        }}
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
})