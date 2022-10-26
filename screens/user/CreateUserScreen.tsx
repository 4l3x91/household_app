import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import CreateUser from "../../components/user/CreateUser";
import { useAuthentication } from "../../hooks/useAuthentication";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch } from "../../store/store";
import { clearErrors } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

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
      <CreateUser close={() => navigation.goBack()} logIn={() => navigation.navigate("Login")} />
    </View>
  );
};

export default CreateUserScreen;