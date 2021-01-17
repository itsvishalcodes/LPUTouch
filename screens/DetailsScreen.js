import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const DetailsScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button 
                title="Go to Home Screen"
                onPress={() => navigation.navigate("Home")}
            />
            <Button 
                title="Go to Attendance Screen"
                onPress={() => navigation.navigate("Attendance")}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DetailsScreen