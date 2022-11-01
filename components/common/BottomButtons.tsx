import React from "react";
import { View } from "react-native";
import { Button, Divider } from "react-native-paper";

interface Props {
  leftOnPress: () => void;
  pending?: boolean;
  rightOnPress: () => void;
  leftTitle: string;
  rightTitle: string;
  leftIcon: string;
  rightIcon: string;
  topDivider?: boolean;
}

const BottomButtons = ({ leftOnPress, pending, rightOnPress, leftTitle, rightTitle, leftIcon, rightIcon, topDivider }: Props) => {
  return (
    <>
      {topDivider && <Divider style={{ height: 1 }} />}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button mode={"text"} style={{ borderRadius: 0, padding: 15 }} onPress={leftOnPress} loading={pending} icon={leftIcon}>
            {leftTitle}
          </Button>
        </View>
        <Divider style={{ width: 1, height: "100%" }} />
        <View style={{ flex: 1 }}>
          <Button mode={"text"} style={{ borderRadius: 0, padding: 15 }} onPress={rightOnPress} icon={rightIcon}>
            {rightTitle}
          </Button>
        </View>
      </View>
    </>
  );
};

// onPress;

export default BottomButtons;
