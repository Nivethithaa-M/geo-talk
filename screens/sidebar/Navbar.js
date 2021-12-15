import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from './Map';
import Profile from './Profile';
import ChatHistory from './ChatHistory';
import SignOut from './Signout';
const Drawer = createDrawerNavigator();

function Navbar() {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="ChatHistory"
        component={ChatHistory}
        options={{ drawerLabel: 'Chat History' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name="SignOut"
        component={SignOut}
        options={{ drawerLabel: 'SignOut' }}
      />
    </Drawer.Navigator>
  );
}

export default Navbar;