import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import CreateHousehold from "../components/createHousehold";
import { auth } from "../config/firebase";
import { MenuStackParams } from "../navigation/MenuStackNavigator";

type Props = NativeStackScreenProps<MenuStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
      }
    });
  }

  return (
    <View style={{ padding: 10 }}>
    <Text variant="headlineSmall">Inställningar</Text>
      <Text variant="bodyMedium">Anpassa din upplevelse i Hushållet.</Text>

    <View style={{ marginVertical: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("SelectThemeScreen")}>
        <Surface elevation={0} style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="moon-o" size={22} color="white" style={{ marginRight: 10 }} />
          <Text variant="bodyMedium">Mörkt läge</Text>
        </Surface>
      </TouchableOpacity>
    </View>

      <CreateHousehold />
      <Button mode="contained" onPress={handleSignOut}>
        Logout
      </Button>
    </View>
  );
};

export default MenuScreen;