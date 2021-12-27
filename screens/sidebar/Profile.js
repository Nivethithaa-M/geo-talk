import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Icon, Card, Image, ListItem } from "react-native-elements";

const Yellow = "#57F47F";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {}, []);

  const list = [
    {
      name: "Personal Information",
      icon: "person",
    },
    {
      name: `${auth.currentUser.email.split("@")[0]}`,
      icon: "face",
    },
    {
      name: `${auth.currentUser.email}`,
      icon: "mail",
    },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("screen").height / 3,
          backgroundColor: Yellow,
          elevation: 50,
          marginTop: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 70,
                marginTop: 50,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            <Image
              source={require("../../assets/user.png")}
              style={{
                width: 110,
                height: 110,
                borderRadius: 70,
                marginTop: 50,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              marginHorizontal: 5,
            }}
          >
            {auth.currentUser.email}
          </Text>
        </View>
      </Card>
      <View style={{ margin: 10, padding: 10 }}>
        {list.map((l, i) => (
          <Pressable key={i} onPress={l?.fun}>
            <ListItem key={i} bottomDivider style={{ marginTop: 7.5 }}>
              <Icon name={l.icon} color="#57F47F" />

              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;
// export default function Profile() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{fontSize:16,fontWeight:'700'}}>Profile Screen</Text>
//         <Text>Email:{auth.currentUser.email}</Text>
//       </View>
//     );
//   }
