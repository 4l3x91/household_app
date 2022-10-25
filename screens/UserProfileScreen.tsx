import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { List, Surface, useTheme } from "react-native-paper";
import CreateHousehold2 from "../components/CreateHousehold2";
import JoinHousehold from "../components/household/JoinHousehold";
import MyHouseholds from "../components/MyHouseholds";
import { UserStackParams } from "../navigation/UserStackNavigator";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const UserProfileScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  // TODO fix navigation typings
  return (
    <View>
      <Surface elevation={3} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
        <ScrollView>
          <View style={{ marginBottom: 5 }}>
            <List.Accordion
              title="Mina hushåll"
              left={(props) => <List.Icon {...props} icon="home" />}
              style={{ backgroundColor: colors.surface, borderRadius: 10 }}
              theme={{ colors: { background: "transparent" } }}
            >
              <MyHouseholds goToChores={() => navigation.navigate("Chores")} />
            </List.Accordion>
          </View>
          <List.Accordion
            title="Skapa hushåll"
            left={(props) => <List.Icon {...props} icon="home" />}
            theme={{ colors: { background: "transparent" } }}
            style={{ backgroundColor: colors.surface, borderRadius: 10 }}
          >
            <CreateHousehold2 />
          </List.Accordion>
          <List.Accordion
            title="Gå med i hushåll"
            left={(props) => <List.Icon {...props} icon="home" />}
            theme={{ colors: { background: "transparent" } }}
            style={{ backgroundColor: colors.surface, borderRadius: 10 }}
          >
            <JoinHousehold />
          </List.Accordion>
        </ScrollView>
      </Surface>
    </View>
  );
};

export default UserProfileScreen;
