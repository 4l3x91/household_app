import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { UserStackParams } from "../navigation/UserStackNavigator";
import { selectProfile } from "../store/profile/profileSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<UserStackParams>;

const UserProfileScreen = ({ navigation }: Props) => {
  const profile = useAppSelector(selectProfile);
  return <></>;
};

export default UserProfileScreen;
