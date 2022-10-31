import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { RootStackParams } from "../../navigation/RootStackNavigator";

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  pending: boolean;
  leftTitle: string;
  rightTitle: string;
  leftIcon: string;
  rightIcon: string;
}

type BottomButtonsNavProps = NativeStackNavigationProp<RootStackParams, "Welcome">;

const BottomButtons = ({ handleSubmit, pending, leftTitle, rightTitle, leftIcon, rightIcon }: Props) => {
  const navigation = useNavigation<BottomButtonsNavProps>();

  return (
    <View style={{ flexDirection: "row", marginBottom: 30 }}>
      <View style={{ flex: 1 }}>
        <Button labelStyle={{ fontSize: 16 }} mode={"text"} style={{ borderRadius: 0 }} onPress={handleSubmit} loading={pending} icon={leftIcon}>
          {leftTitle}
        </Button>
      </View>
      <Divider style={{ width: 1, height: "100%" }} />
      <View style={{ flex: 1 }}>
        <Button labelStyle={{ fontSize: 16 }} mode={"text"} style={{ borderRadius: 0 }} onPress={() => navigation.goBack()} icon={rightIcon}>
          {rightTitle}
        </Button>
      </View>
    </View>
  );
};

// onPress;

export default BottomButtons;
