import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// TODO: style this
// TODO: capitalize first letter of title
const CustomMarker = ({ title, description, icon = 'dog' }) => {
  return (
    <View>
      <Text>{title.split('@')[0].toUpperCase()}</Text>

      <Text>{description}</Text>

      <FontAwesome5 name={icon} size={26} />
    </View>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({});
