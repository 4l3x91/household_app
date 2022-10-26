import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import ChangeHouseholdName from "./ChangeHouseholdName";

type Props = {
  role?: string;
  householdName: string;
};

const HouseholdName = ({ role, householdName }: Props) => {
  const [showTooltip, setShowToolTip] = useState(true);
  const { colors } = useTheme();

  return role === "owner" ? (
    <TitleContainer>
      {showTooltip && (
        <Tooltip
          backgroundColor={colors.surfaceVariant}
          width={200}
          height={80}
          popover={<Text>Tryck på namnet för att byta namn.</Text>}
          actionType="press"
        >
          <CodeInnerContainer>
            <AntDesign name="questioncircleo" size={15} color={colors.onSurface} />
          </CodeInnerContainer>
        </Tooltip>
      )}
      <ChangeHouseholdName setShowTooltip={setShowToolTip} showTooltip={showTooltip} />
    </TitleContainer>
  ) : (
    <TitleContainer>
      <DayViewTitle style={{ color: colors.primary }}>{householdName}</DayViewTitle>
    </TitleContainer>
  );
};

const TitleContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;
  flex-direction: row;
`;
const CodeInnerContainer = styled.View`
  align-items: center;
`;

const DayViewTitle = styled.Text`
  align-items: center;
  font-size: 25px;
  padding: 0 30px;
`;

export default HouseholdName;
