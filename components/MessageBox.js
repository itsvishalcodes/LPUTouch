import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function MessageBox(props) {
    return (
        <View style={styles.messageBoxContainer}>
            <Text style={styles.headingStyle}>{props.heading}</Text>
            <Text style={styles.detailStyle}>{props.details}</Text>
            <View style={styles.nameStyleContainer} >
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.nameStyle}>{props.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageBoxContainer: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#262628',
        marginBottom: 15,
    },
    headingStyle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 7,
        textDecorationLine: 'underline'
    },
    detailStyle: {
        fontSize: 17,
        color: '#fff',
        marginBottom: 12
    },
    nameStyle: {
        fontSize: 14,
        color: '#000'
    },
    nameStyleContainer: {
        flex: 1,
        paddingLeft: 8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ff5334',
        width: '65%',
        marginLeft: -14,
        height: 28,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
})