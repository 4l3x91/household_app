import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import LoginUser from "../../components/user/LogInUser";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { selectHousehold } from "../../store/household/householdSelector";
import { getHouseholdById } from "../../store/household/householdThunks";
import { selectMemoizedUserProfiles } from "../../store/profile/profileSelectors";
import { getAllProfiles } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import { clearErrors } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  const user = useAppSelector(selectUser);
  const household = useAppSelector(selectHousehold);
  const dispatch = useAppDispatch();
  const userProfiles = useAppSelector(selectMemoizedUserProfiles);
  const { error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (user) {
      dispatch(getAllProfiles(user));
      if (error !== "") {
        navigation.navigate("HouseholdOptions");
      }
    }
  }, [user, error]);

  useEffect(() => {
    if (userProfiles.length !== 0) {
      if (userProfiles.length === 1) {
        dispatch(getHouseholdById(userProfiles[0].householdId));
        navigation.navigate("TabStack");
      } else if (household.household.id === "") {
        navigation.navigate("HouseholdOptions");
      }
    }
  }, [userProfiles]);

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
