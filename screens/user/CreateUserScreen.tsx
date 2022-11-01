import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import CreateUser from "../../components/user/CreateUser";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch } from "../../store/store";
import { clearErrors } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams, "CreateUser">;

const CreateUserScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <View>
      <CreateUser close={() => navigation.popToTop()} />
    </View>
  );
};

export default CreateUserScreen;
