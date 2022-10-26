import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Button, overlay, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { deleteChore } from "../../store/chore/choreThunks";
import { useAppDispatch } from "../../store/store";

interface Props {
  closeModal: () => void;
  chore: Chore;
  toggleOverlay: () => void;
}

const DeleteChore = ({ closeModal, chore, toggleOverlay }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Container overlay={overlay}>
      <Content>
        <Text variant="headlineMedium">Ta bort syssla</Text>
        <ModalContent elevation={0}>
          <Text>Vill du verkligen ta bort sysslan {chore.name} ?</Text>
        </ModalContent>

        <Button
          onPress={() => {
            dispatch(deleteChore(chore));
            closeModal();
            toggleOverlay();
          }}
          mode="contained"
          buttonColor={colors.errorContainer}
        >
          <Text>Ta bort</Text>
        </Button>
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

export default DeleteChore;

const Container = styled.View<{ overlay: boolean }>`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => (props.overlay ? "rgba(0,0,0,0.5)" : undefined)};
  align-items: center;
`;

const Content = styled(Surface)`
  margin: 20px;
  padding: 20px 0;
  border-radius: 20px;
  align-items: center;
`;
const ModalContent = styled(Surface)`
  flex-direction: row;
  padding: 20px;
  margin-top: 10px;
`;
