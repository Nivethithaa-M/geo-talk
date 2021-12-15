import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import Navbar from './sidebar/Navbar';
const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <Navbar />
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:'#28A848',
        width: '60%',
        padding: 15,
        borderRadius:10,
        alignItems:'center',
        marginTop:40,
    },
    buttonText:{
         color: 'white',
         fontWeight:'700',
         fontSize:16,
    },
})
