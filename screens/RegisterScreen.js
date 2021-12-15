import { useNavigation } from '@react-navigation/native'
import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import { auth } from '../firebase'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.navigate("Home")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email.trim(),password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:',user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.logo}>
        <Image 
          style={{height: 100,width:150,marginTop:2}}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.title}>GEOTALK</Text>
        </View>
        
        <View style={styles.inputcontainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleSignUp}
                style={[styles.button]}
            >
            <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupTextCont}
                onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.signupText}>Already have an account </Text>
            <Text style={styles.signupButton}>Login</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
         fontWeight:'700',
         fontSize:30,
        color: '#28A848',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    inputcontainer: {
        width: '80%'
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
    buttonContainer:{
        width: '60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'#28A848',
        width: '100%',
        padding: 5,
        borderRadius:5,
        alignItems:'center'
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#28A848',
        borderWidth:2,
    },
    buttonText:{
         color: 'white',
         fontWeight:'700',
         fontSize:16,
    },
    buttonOutlineText:{
        color: '#28A848',
         fontWeight:'700',
         fontSize:16,
    },
    signupTextCont:{
        alignItems:'center',
        marginVertical:16,
        flexDirection:'row'
    },
    signupText:{
        color: 'grey',
        fontSize:13
    },
    signupButton:{
        color: '#28A848',
        fontSize:13,
        fontWeight:'500'
    }
})
