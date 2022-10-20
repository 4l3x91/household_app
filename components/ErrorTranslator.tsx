import React from "react";
import { Button, Surface, Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  error: string;
  logIn?: () => void;
  register?: () => void;
}

const ErrorTranslator = ({ error, logIn, register }: Props) => {
  const theme = useTheme();

  if (error.includes("auth/email-already-in-use")) {
    return (
      <ErrorContainer>
        <ErrorText theme={theme}>Angiven email finns redan registrerad</ErrorText>
        <Button mode="text" onPress={logIn}>
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
