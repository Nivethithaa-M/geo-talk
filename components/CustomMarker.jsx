import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// TODO: style this
const CustomMarker = ({ title, description, icon = 'dog' }) => {
  return (
    <View>
      <Text>{title}</Text>

      <Text>{description}</Text>

      <FontAwesome5 name={icon} size={26} />
    </View>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({});
