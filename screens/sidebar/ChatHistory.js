import * as React from 'react';
import { View, Text } from "react-native";

export default function ChatHistory() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:16,fontWeight:'700'}}>Chat History Screen</Text>
      </View>
    );
  }