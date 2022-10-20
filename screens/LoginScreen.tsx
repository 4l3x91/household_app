import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginUser from "../components/user/LogInUser";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { useAppDispatch } from "../store/store";
import { clearErrors } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  const { user } = useAuthentication();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigation.navigate("HouseholdOptions");
    }
  }, [user]);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      <LoginUser close={() => navigation.goBack()} register={() => navigation.navigate("CreateUser")} />
    </>
  );
};

export default LoginScreen;
