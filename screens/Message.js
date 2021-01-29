import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, RefreshControl, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

import AuthContext from '../AuthContext'

import MessageBox from '../components/MessageBox'

export default function Message({navigation}) {
    let {studentData , setStudentData} = useContext(AuthContext)
    studentData = JSON.parse(JSON.stringify(studentData))
    
    // const uid = `11910547`
    // const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    // const deviceId = `29904bc142b60dce`
    const [messageData, setMessageData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if(messageData==null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/StudentMyMessagesForService/${studentData.uid}/${studentData.accessToken}/${studentData.deviceId}`)
                .then(response => {
                    return response.text()
                })
                .then(responseData => {
                    try {
                        let dataReceived = JSON.parse(responseData)
                        setMessageData(dataReceived)
                        setRefreshing(false)
                    } catch(e) {
                        alert(e)
                    }
                })
        }
    })

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setMessageData(null)
    })

    if(messageData == null) {
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
        const allMessages = messageData.map((message) => {
            return <MessageBox heading={message.Subject} details={message.Detail} name={message.Name}  />
        })
        return (
            <View  style={{flex: 1, backgroundColor: '#222324'}}>
                <View style={{ paddingLeft: 15, width: '100%', height:55, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <Text style={{fontSize: 16, color: '#909191', textAlign: 'left'}}>Total messages Fetched: {messageData.length}</Text>
                    <Text onPress={() => navigation.navigate("AllMessage")} style={{fontSize: 16, color: '#909191', textAlign: 'left'}}>Show All  <Image
                        style = {{height: 15, width: 15}}
                        source={
                            require('../assets/icons/right-icon.png')
                        } />
                    </Text>
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{padding: 15}}>    
                    {allMessages}
                </ScrollView>
            </View>
        )
    }
}