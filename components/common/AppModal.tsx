import { SimpleLineIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  closeModal: () => void;
  title: string;
  children: ReactNode;
}

const AppModal = ({ closeModal, title, children }: Props) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Content background={colors.surface}>
        <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
          {title}
        </Text>
        {children}
      </Content>
      <Pressable onPress={() => closeModal()}>
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default AppModal;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View<{ background: string }>`
  background-color: ${({ background }) => background};
  width: 90%;
  margin: 20px;
  padding: 20px 0;
  border-radius: 20px;
  align-items: center;
`;
