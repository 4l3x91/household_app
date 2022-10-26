import React from "react";
import { View } from "react-native";
import { Button, Divider } from "react-native-paper";

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  pending: boolean;
  onPress: () => void;
  leftTitle: string;
  rightTitle: string;
  leftIcon: string;
  rightIcon: string;
}

const BottomButtons = ({ handleSubmit, pending, onPress, leftTitle, rightTitle, leftIcon, rightIcon }: Props) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 30 }}>
      <View style={{ flex: 1 }}>
        <Button labelStyle={{ fontSize: 16 }} mode={"text"} style={{ borderRadius: 0 }} onPress={handleSubmit} loading={pending} icon={leftIcon}>
          {leftTitle}
        </Button>
      </View>
      <Divider style={{ width: 1, height: "100%" }} />
      <View style={{ flex: 1 }}>
        <Button labelStyle={{ fontSize: 16 }} mode={"text"} style={{ borderRadius: 0 }} onPress={onPress} icon={rightIcon}>
          {rightTitle}
        </Button>
      </View>
    </View>
  );
};

export default BottomButtons;
