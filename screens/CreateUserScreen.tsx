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
      navigation.navigate("TabStack");
    }
  }, [user]);

  return (
    <View>
      {/* TODO check how to properly use useNavigation() hook instead of passing navigation */}
      <CreateUser navigate={() => navigation.navigate("Login")} />
    </View>
  );
};

export default CreateUserScreen;
