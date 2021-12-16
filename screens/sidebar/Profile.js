import * as React from 'react';
import { View, Text } from "react-native";
import { auth } from '../../firebase'
export default function Profile() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:16,fontWeight:'700'}}>Profile Screen</Text>
        <Text>Email:{auth.currentUser.email}</Text>
      </View>
    );
  }