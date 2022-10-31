import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginUser from "../../components/user/LogInUser";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch } from "../../store/store";
import { clearErrors } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      <LoginUser close={() => navigation.popToTop()} register={() => navigation.navigate("CreateUser")} />
    </>
  );
};

export default LoginScreen;
