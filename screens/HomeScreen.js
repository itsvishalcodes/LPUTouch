import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen({navigation}) {
    return (
    <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
        <Text>Home Screen</Text>
        <Button 
            title="Go to Details Screen"
            onPress={() => navigation.navigate("Details")}
        />
        <Button 
            title="Go to Attendance Screen"
            onPress={() => navigation.navigate("Attendance")}
        />
        <Button 
            title="Go to Custom Button"
            onPress={() => navigation.navigate("Dashboard")} 
        />
        <Button
            title="HTML View"
            onPress={() => navigation.navigate("AnnouncementView")}
        />
        <Button 
            title="Announcement"
            onPress={() => navigation.navigate("Announcement")}
            />
    </View>
    )
}

const styles = StyleSheet.create()

export default HomeScreen;