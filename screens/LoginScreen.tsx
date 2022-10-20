import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginUser from "../components/user/LogInUser";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { findUsersProfilesThunk } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import { clearErrors } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userProfiles = useAppSelector(selectUsersProfiles);

  useEffect(() => {
    if (user) {
      dispatch(findUsersProfilesThunk(user));
      if (userProfiles.length === 1) {
        navigation.navigate("TabStack");
      } else navigation.navigate("HouseholdOptions");
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
