import { SimpleLineIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Pressable } from "react-native";
import { overlay, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  closeModal: () => void;
  toggleOverlay: () => void;
  title: string;
  children: ReactNode;
}

const AppModal = ({ closeModal, toggleOverlay, title, children }: Props) => {
  const { colors } = useTheme();

  return (
    <Container overlay={overlay}>
      <Content background={colors.surface}>
        <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
          {title}
        </Text>
        {children}
      </Content>
      <Pressable
        onPress={() => {
          toggleOverlay();
          closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default AppModal;

const Container = styled.View<{ overlay: boolean }>`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => (props.overlay ? "rgba(0,0,0,0.5)" : undefined)};
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
