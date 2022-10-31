import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { auth } from "../config/firebase";
import { MenuStackParams } from "../navigation/MenuStackNavigator";
import { resetHousehold } from "../store/household/householdSlice";
import { resetProfileState } from "../store/profile/profileSlice";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/user/userSlice";

type Props = NativeStackScreenProps<MenuStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  function handleSignOut() {
    signOut(auth).then(() => {
      {
        dispatch(logout());

        //denna resettar state men ska bytas ut mot en useEffect där alla state resettas
        dispatch(resetProfileState());
        dispatch(resetHousehold());
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
            <FontAwesome name="moon-o" size={22} color={colors.primary} style={{ marginRight: 10 }} />
            <Text variant="bodyMedium">Mörkt läge</Text>
          </Surface>
        </TouchableOpacity>
      </View>
      <View>
        <Text>MenuScreen</Text>
        <Button mode="contained" onPress={handleSignOut}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default MenuScreen;
