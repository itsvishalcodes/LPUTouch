import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'

import { BarChart } from 'react-native-chart-kit'

import FastImage from 'react-native-fast-image'

function Marks() {
    const screenWidth = Dimensions.get("window").width;
    const [ marks, setMarks] = useState(null)

    const uid = `11910547`
    const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    const deviceId = `29904bc142b60dce`

    useEffect(() => {
        if(marks===null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentResultMarksForService/${uid}/${accessToken}/${deviceId}`)
            .then(response => {
                return response.text()
            })
            .then(responseData => {
                let dataReceived = JSON.parse(responseData)
                setMarks(dataReceived)
            })
            .catch((e) => alert(e))
        }
    })

    if(marks===null) {
        console.log("Loading Rendered")
        return (
            <View style={{flex: 1, backgroundColor: '#222324', justifyContent: 'center', alignItems: 'center'}}>
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
        console.log("Loaded Rendered")
        return (
            <View style={styles.marksContainer}>
                <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%', height:280, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <BarChart
                        data={{
                            labels: ['CSE101', 'ECE131', 'ECE132','MEC103', 'MTH165', 'PES318', 'PHY109', 'PHY119' ],
                            datasets: [
                                {
                                    data: [50, 78, 81, 85, 78, 15, 47, 90]
                                }
                            ]
                        }}
                        width={screenWidth-30}
                        fromZero={true}
                        height={185}
                        verticalLabelRotation={90}
                        xLabelsOffset = {-40}
                        yLabelsOffset = {20}
                        chartConfig = {{
                            backgroundGradientFrom: "#6C1AF2",
                            backgroundGradientTo: "#0FA1EF",
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                // borderRadius: 14
                            }
                        }}
                        style={{
                            marginVertical: 6,
                            borderRadius: 14,
                            marginLeft: 0
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    marksContainer: {
        flex: 1,
        backgroundColor: '#222324'
    }
})

export default Marks