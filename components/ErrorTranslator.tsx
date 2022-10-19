import React from "react";
import { Button, Surface, Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  error: string;
  navigate?: () => void;
}

const ErrorTranslator = ({ error, navigate }: Props) => {
  const theme = useTheme();

  if (error.includes("auth/email-already-in-use")) {
    return (
      <ErrorContainer>
        <ErrorText theme={theme}>Angiven email finns redan registrerad</ErrorText>
        <Button mode="text" onPress={navigate}>
          Logga in
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
