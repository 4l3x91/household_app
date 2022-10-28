import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Surface, Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { RootStackParams } from "../../navigation/RootStackNavigator";

interface Props {
  error: string;
  register?: () => void;
}

type ErrorTranslatorNavProps = NativeStackNavigationProp<RootStackParams, "Login">;

const ErrorTranslator = ({ error, register }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<ErrorTranslatorNavProps>();

  if (error.includes("auth/email-already-in-use")) {
    return (
      <ErrorContainer>
        <ErrorText theme={theme}>Angiven email finns redan registrerad</ErrorText>
        <Button mode="text" onPress={() => navigation.navigate("Login")}>
          Logga in
        </Button>
      </ErrorContainer>
    );
  }
  if (error.includes("auth/wrong-password")) {
    return (
      <ErrorContainer>
        <ErrorText theme={theme} style={{ marginVertical: 10 }}>
          Email eller lösenord stämmer inte
        </ErrorText>
      </ErrorContainer>
    );
  }
  if (error.includes("auth/user-not-found")) {
    return (
      <ErrorContainer>
        <ErrorText theme={theme}>Angiven email finns inte registrerad </ErrorText>
        <Button mode="text" onPress={register}>
          Registrera
        </Button>
      </ErrorContainer>
    );
  }

  return <ErrorText theme={theme}>{error}</ErrorText>;
};

export default ErrorTranslator;

const ErrorContainer = styled(Surface)`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled(Text)<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.error};
`;
