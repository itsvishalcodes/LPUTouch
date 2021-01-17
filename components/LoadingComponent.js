import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

function LoadingComponent(props) {
    let LoadingGif = require("../assets/LoadingGif.gif")
    let InLoadingGif = require("../assets/InLoadingGif.gif")
    return (
        <View style={styles.LoadingComponentContainer}>
            <View style={styles.LoadingGifContainer}>
                <View style={styles.LoadingGif}>
                    <FastImage
                        style={{width: 100, height: 100}}
                        source={
                            LoadingGif
                        }
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </View>
            <View style={styles.LoadingTextContainer}>
                <Text style={styles.LoadingText}>{props.loadingText}</Text>
            </View>
            <View style={styles.LoadingBelowImageContainer}>
                <Image
                style = {styles.LoadingBelowImage}
                 source={
                    require('../assets/Loading_below_image.png')
                } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    LoadingComponentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323334'
    },
    LoadingGif: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 110, 
        height: 110,
        borderRadius: 65,
        backgroundColor: '#fff'
    },
    LoadingGifContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoadingTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    LoadingBelowImageContainer: {
        flex: 6,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    LoadingBelowImage: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    }
})

export default LoadingComponent