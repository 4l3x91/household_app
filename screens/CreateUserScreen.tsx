import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import CreateUser from "../components/CreateUser";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const CreateUserScreen = ({ navigation }: Props) => {
  const { user } = useAuthentication();

  return <View>{user ? <>{navigation.navigate("TabStack")}</> : <CreateUser />}</View>;
};

export default CreateUserScreen;
