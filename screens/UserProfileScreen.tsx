import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { UserStackParams } from "../navigation/UserStackNavigator";
import { selectHouseholdName } from "../store/household/householdSelector";
import { Avatar } from "../store/profile/profileModel";
import { selectCurrentProfile } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

type Props = NativeStackScreenProps<UserStackParams, "UserProfileScreen">;

const UserProfileScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectCurrentProfile);
  const householdName = useAppSelector(selectHouseholdName);
  // TODO fix navigation typings
  return (
    <View>
      <Surface elevation={3} style={{ margin: 10, padding: 10, borderRadius: 10 }}>
        <ScrollView>
          <View style={{ marginBottom: 5 }}>
            <Surface style={{ padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Hushållsnamn</Text>
              <Text variant="headlineMedium">{householdName}</Text>
            </Surface>
            <Surface style={{ marginTop: 10, padding: 10, borderRadius: 10 }}>
              <Text variant="bodySmall">Profil</Text>
              <View style={{ flexDirection: "row" }}>
                <Text variant="headlineMedium" style={{ marginRight: 10 }}>
                  {profile?.avatar.avatar}
                </Text>
                <Text variant="headlineMedium">{profile?.profileName}</Text>
              </View>
            </Surface>
            <Button onPress={() => console.log("Go to edit profile")}>Redigera profil</Button>
          </View>
          {/* <List.Accordion
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
          </List.Accordion> */}
          
        </ScrollView>
      </Surface>
    </View>
  );
};

export default UserProfileScreen;
