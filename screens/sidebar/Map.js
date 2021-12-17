import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet,TextInput,TouchableOpacity, View, Dimensions,Alert} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';
import { FontAwesome5,MaterialIcons } from "@expo/vector-icons";
import {auth,app,fireStore,firebase} from "../../firebase"
const { width, height } = Dimensions.get("screen");
const LATDELTA = 0.017
const LNGDELTA = 0.017
const db = app.database();
const Map = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [messages, setMessages] = useState("");
  const [mapRegion, setMapRegion] = useState({
    longitude: 80.23539830006482,
    latitude: 13.01107648890877,
    longitudeDelta: LNGDELTA,
    latitudeDelta: LATDELTA
  });
  const sendmessage = async()=> {
    fireStore.collection('chat').doc(auth.currentUser.email).collection('messages').add({messages,mapRegion,timestamp : firebase.firestore.FieldValue.serverTimestamp() })
  }
  const [friends] = useState([
    {
      title: "bob",
      messsage: "guindy park",
      icon: "dog",
      location: {
        longitude: 80.2378081241749,
        latitude: 13.005155071011641
      }
    },
    {
      title: "Alex",
      messsage: "Childhood friend",
      icon: "dragon",
      location: {
        longitude: 80.2381648579569,
        latitude: 13.007708359268626
      }
    },
    {
      title: "Jack",
      messsage: "Business Partner",
      icon: "dove",
      location: {
        longitude: 80.22799707958029,
        latitude: 13.015214374137933, 
      }
    },
    {
      title: "rose",
      messsage: "coffee",
      icon: "cat",
      location: {
        longitude: 80.23329712442346,
        latitude: 13.013510494203762,  
      }
    }
    
  ]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: LNGDELTA,
        latitudeDelta: LATDELTA
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />      
      <MapView
        initialRegion={mapRegion}
        style={styles.mapView}
      >
        {mapRegion ? (
          <Circle
            center={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            radius={1000}
            strokeColor="transparent"
            fillColor="rgba(0,255,0,0.1)"
          ></Circle>
        ) : null}
        {mapRegion ? (
          <Marker
            coordinate={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            title={auth.currentUser.email}
            description={messages}
          >
          </Marker>
        ) : null}

        {friends ? friends.map((friend, i) => (
          <Marker key={i} coordinate={{
            ...friend.location,  longitudeDelta: LNGDELTA,
            latitudeDelta: LATDELTA
          }} title={friend.title} description={friend.messsage}>
            <FontAwesome5 name={friend.icon} size={26} />
          </Marker>
        )) : null}
      </MapView>
      <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here"
            onChangeText={setMessages}
          />
            <MaterialIcons style={styles.sendButton} onPress={() => sendmessage()} name="send" size={32} color="#fe4027" />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width,
    height,
    flex:1 
  },
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height,
    flex:1 
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
    shadowColor: '#555',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.9
  },
  stroke: {
    backgroundColor: "#ffffff",
    width: 26,
    height: 26,
    borderRadius: 50,
    zIndex: 1
  },
  core: {
    backgroundColor: "red",
    width: 24,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    height: 24,
    borderRadius: 50,
    zIndex: 2
  },
  inputWrapper: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    // top: StatusBar.currentHeight,
    bottom: 0,
    left: 0,
    zIndex: 100,
    flexDirection:'row'
  },
  input: {
    height: 46,
    width: '100%',
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  sendButton: {
    position: 'absolute',
    top: 17,
    right:20
  },
  sendButtonActive: {
    opacity: 1
  }
});

export default Map;