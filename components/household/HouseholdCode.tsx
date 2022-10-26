import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { generateHouseholdCode } from "../../utils/utils";

interface Props {
  householdCode: string;
  setHouseholdCode: React.Dispatch<React.SetStateAction<string>>;
}

const HouseholdCode = ({ householdCode, setHouseholdCode }: Props) => {
  const { colors } = useTheme();

  return (
    <CodeContainer background={colors.primaryContainer}>
      <Tooltip
        backgroundColor={colors.surfaceVariant}
        width={200}
        height={80}
        popover={<Text>Hushållskoden används för att bjuda in nya medlemmar till ditt hushåll.</Text>}
        actionType="press"
      >
        <CodeInnerContainer>
          <AntDesign name="questioncircleo" size={15} color={colors.onSurface} />
          <Text variant="bodyLarge"> Hushållskod: </Text>
        </CodeInnerContainer>
      </Tooltip>
      <CodeInnerContainer>
        <Text variant="bodyLarge">{householdCode}</Text>
        <IconButton icon="cached" size={15} onPress={() => setHouseholdCode(generateHouseholdCode())} mode="contained-tonal" />
      </CodeInnerContainer>
    </CodeContainer>
  );
};

export default HouseholdCode;

const CodeContainer = styled.View<{ background: string }>`
  background-color: ${({ background }) => background};
  padding: 0 5px;
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

const CodeInnerContainer = styled.View`
  padding: 0 5px;
  flex-direction: row;
  align-items: center;
`;
