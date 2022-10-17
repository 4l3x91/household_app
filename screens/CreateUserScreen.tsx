import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CreateUser from "../components/CreateUser";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";

type Props = NativeStackScreenProps<RootStackParams>;

const CreateUserScreen = ({ navigation }: Props) => {
  const currentUser = useAppSelector(selectUser);

  return (
    <View>
      {currentUser.user.id === "" ? <CreateUser /> : <Text>current user email: {currentUser.user.email}</Text>}
      {/* <Text>current user email: {currentUser.user.email}</Text> */}
    </View>
  );
};

export default CreateUserScreen;
