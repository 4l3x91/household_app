import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { RootStackParams } from "../navigation/RootStackNavigator";

interface Props {
  error: string;
  navigate?: () => void;
}

const ErrorTranslator = ({ error, navigate }: Props) => {
  const theme = useTheme();

  if (error.includes("auth/email-already-in-use")) {
    return (
      <>
        <ErrorText theme={theme}>Angiven email finns redan registrerad</ErrorText>
        <Text onPress={navigate}>Logga in</Text>
      </>
    );
  }

  return <ErrorText theme={theme}>{error}</ErrorText>;
};

export default ErrorTranslator;

const ErrorText = styled(Text)<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.error};
`;
