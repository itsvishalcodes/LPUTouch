import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function AnnouncementBox(props) {
    return (
        <TouchableOpacity style={styles.MainBox}
            onPress={() => props.navigationway.navigate('AnnouncementView', {
                aid: props.aid,
                tab: props.tab
            })}
            >
            <View style={styles.TopContent}>
                <View style={styles.IdContainer}>
                    <Text style={styles.Id}>#{props.aid}</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.Id}>{props.date}</Text>
                </View>
            </View>
            <View style={styles.CategoryContent}>
                <Text numberOfLines={1} ellipsizeMode={'tail'}  style={styles.Category}>{props.category}</Text>
            </View>
            <View style={styles.SubjectContent}>
                <View style={styles.SubjectBody}>
                    <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.Subject}>{props.subject}</Text>
                </View>
                <View style={styles.RightArrow}>
                <Image
                    style={{width: 16, height: 16}}
                    source={
                        require('../assets/icons/right-icon.png')
                    } />
                </View>
            </View>
            <View style={styles.UploadedByContent}>
                <Text style={styles.UploadedBy}>{props.uploadedBy}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    MainBox: {
        height: 160,
        width: '100%',
        backgroundColor: '#262628',
        borderRadius: 15,
        marginBottom: 20
    },
    TopContent: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5
    },
    CategoryContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ff5334',
        width: 110,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 4,
        marginLeft: -2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4
    },
    SubjectContent: {
        flex: 3,
        flexDirection: 'row'
    },
    UploadedByContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 15
    },
    Category: {
        color: '#fff',
        fontSize: 13
    }, 
    Id: {
        flex: 1,
        color: '#909191'
    },
    time: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    SubjectBody: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    RightArrow: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Subject: {
        color: '#fff',
        fontSize: 15
    },
    UploadedBy: {
        color: '#909191'
    }
})

export default AnnouncementBox