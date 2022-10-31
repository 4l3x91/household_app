import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import CreateUser from "../../components/user/CreateUser";
import { useAuthentication } from "../../config/hooks/useAuthentication";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch } from "../../store/store";
import { clearErrors } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams, "CreateUser">;

const CreateUserScreen = ({ navigation }: Props) => {
  const { user } = useAuthentication();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigation.navigate("TabStack");
    }
  }, [user]);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <View>
      {/* TODO check how to properly use useNavigation() hook instead of passing navigation */}
      {/* logIn={() => navigation.navigate("Login")} */}
      <CreateUser close={() => navigation.goBack()} />
    </View>
  );
};

export default CreateUserScreen;
