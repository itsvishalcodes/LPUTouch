import React, { useState, useEffect } from 'react'
import { View, useWindowDimensions } from 'react-native'
import {WebView} from 'react-native-webview'
import FastImage from 'react-native-fast-image'


export default function AnnouncementView({ route, navigation}) {
    const { aid, tab } = route.params
    const [htmlContent, setHTMLContent] = useState(null)

    useEffect(() => {
        if(htmlContent === null) {
            fetch(`https://ums.lpu.in/mobile/frmDisplayAnnouncement.aspx?aid=${aid}&tbl=${tab}`)
            .then(response => {
                return response.text()
            })
            .then(responseData => {
                try {
                    console.log("BasicInfoFetched")
                    setHTMLContent(responseData)
                } catch(e) {
                    alert(e)
                }
            })
        }
    })

    if(htmlContent === null) {
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
        return (
            <View style={{flex: 1, backgroundColor: '#222324'}}>
                <View style={{width: '100%', height:12, backgroundColor: '#323334', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}></View>
                <WebView
                    style={{ resizeMode: "cover", flex: 1, backgroundColor: '#222324', color: '#fff'}}
                    scalesPageToFit={false}
                    javaScriptEnabled={true} 
                    domStorageEnabled={true}
                    injectedJavaScript={"document.body.style.color = '#fff';"}
                    source={{ html: htmlContent}} />
            </View>
        );
        }
  }