import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import FastImage from 'react-native-fast-image'

import AnnouncementBox from '../components/AnnouncementBox'

export default function Announcement({navigation}) {
    const uid = `11910547`
    const accessToken = `7076e035-9ceb-457f-abee-f27fb45dd29c`
    const deviceId = `29904bc142b60dce`
    const [refreshing, setRefreshing] = useState(false)
    const [announcementData, setAnnouncementData] = useState(null)

    useEffect(() => {
        if(announcementData==null) {
            fetch(`https://ums.lpu.in/umswebservice/umswebservice.svc/GetAnnouncementsForServiceNew/${uid}/${accessToken}/${deviceId}/S`)
                .then(response => {
                    return response.text()
                })
                .then(responseData => {
                    try {
                        let dataReceived = JSON.parse(responseData)
                        setAnnouncementData(dataReceived)
                        setRefreshing(false)
                    } catch(e) {
                        alert(e)
                    }
                })
        }
    })

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setAnnouncementData(null)
    })

    if(announcementData !== null) {
        const allAnnouncements = announcementData.map((announcement) => {
            return <AnnouncementBox key={announcement.AnnouncementId} aid={announcement.AnnouncementId} category={announcement.Category} date={announcement.EntryDate}
                subject={announcement.Subject} tab={announcement.Tab} uploadedBy={announcement.UploadedBy} navigationway={navigation} />
        })
        return (
                <View style={styles.AnnouncemetOuterContainer}>
                    <View style={{width: '100%', height:12, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.AnnouncemetInnerContainer}>
                        {allAnnouncements}
                    </ScrollView>
                </View>
        )
    }
    else {
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
}

const styles = StyleSheet.create({
    AnnouncemetOuterContainer: {
        backgroundColor: '#222324',
        flex: 1
    },
    AnnouncemetInnerContainer: {
        flex: 1,
        padding: 18
    }
})