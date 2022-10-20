import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { resetProfileState } from "../store/profile/profileSlice";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const MenuScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
        dispatch(logout());

        //denna resettar state men ska bytas ut mot en useEffect där alla state resettas
        dispatch(resetProfileState());
      }
    });
  }

  return (
    <View>
      <Text>MenuScreen</Text>
      {/* <CreateProfile /> */}
      {/* <CreateHousehold /> */}
      <Button mode="contained" onPress={handleSignOut}>
        Logout
      </Button>
    </View>
  );
};

export default MenuScreen;
