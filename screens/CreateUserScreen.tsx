import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import CreateUser from "../components/CreateUser";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const CreateUserScreen = ({ navigation }: Props) => {
  const { user } = useAuthentication();

  useEffect(() => {
    if (user) {
      navigation.replace("HouseholdOptions");
    }
  }, [user]);

  return (
    <View>
      <CreateUser />
    </View>
  );
};

export default CreateUserScreen;
