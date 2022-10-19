import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginUser from "../components/LogInUser";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  const { user } = useAuthentication();

  useEffect(() => {
    if (user) {
      navigation.navigate("TabStack");
    }
  }, [user]);
  return (
    <>
      <LoginUser />
    </>
  );
};

export default LoginScreen;
