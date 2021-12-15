import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { RFC_2822 } from "moment";

const { width, height } = Dimensions.get("screen");

const Map = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    longitude: 80.23539830006482,
    latitude: 13.01107648890877,
    longitudeDelta: 0.8023539830006482,
    latitudeDelta: 0.1301107648890877
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.8023539830006482,
        latitudeDelta: 0.1301107648890877
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
      </MapView>
      <Marker coordinate={mapRegion}>
        <View style={styles.circle}>
          <View style={styles.stroke} />
          <View style={styles.core} />
        </View>
      </Marker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width,
    height
  },
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height
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
  }
});

export default Map;