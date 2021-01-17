import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

import MessageBox from '../components/MessageBox'

export default function AllMessage({navigation}) {

    const [allMessageData, setAllMessageData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if(allMessageData==null) {
                fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/GetMyMessagesHistory`, {
                    method: 'post',
                    headers: {
                        'host': 'ums.lpu.in',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        AccessToken: "7076e035-9ceb-457f-abee-f27fb45dd29c",
                        deviceId: "29904bc142b60dce",
                        LoginName: "11910547",
                        Subject: "",
                        Description: ""
                    })
                })
                .then(attendResponse => {
                    return attendResponse.text()
                })
                .then(response => {
                    setAllMessageData(JSON.parse(response))
                    setRefreshing(false)
                })
                    .catch(e => alert(e))
        }
    })

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setAllMessageData(null)
    })

    if(allMessageData == null) {
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
        const allMessages = allMessageData.GetMyMessagesHistoryResult.map((message) => {
            return <MessageBox heading={message.Subject} details={message.Announcement} name={message.Name}  />
        })
        return (
            <View  style={{flex: 1, backgroundColor: '#222324'}}>
                <View style={{ paddingLeft: 15, width: '100%', height:55, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <Text style={{fontSize: 16, color: '#909191', textAlign: 'left'}}>Total messages Fetched: {allMessageData.GetMyMessagesHistoryResult.length}</Text>
                    
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{padding: 15}}>    
                    {allMessages}
                </ScrollView>
            </View>
        )
    }
}