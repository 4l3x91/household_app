import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Button, overlay, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { deleteChore, updateChore } from "../../store/chore/choreThunks";
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
          {!chore.archived && (
            <Text>
              När du tar bort en syssla kommer även all statistik som är kopplad till sysslan att försvinna! Du kan istället välja att arkivera
              sysslan för att behålla statistiken.
            </Text>
          )}
        </ModalContent>
        <ButtonContainer>
          <Button
            onPress={() => {
              dispatch(deleteChore(chore));
              closeModal();
              toggleOverlay();
            }}
            mode="contained"
            buttonColor={colors.errorContainer}
            style={{ marginRight: 5 }}
          >
            <Text>Ta bort</Text>
          </Button>
          {!chore.archived && (
            <Button
              onPress={() => {
                dispatch(updateChore({ ...chore, archived: true }));
                closeModal();
                toggleOverlay();
              }}
              mode="outlined"
            >
              Arkivera
            </Button>
          )}
        </ButtonContainer>
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
  padding: 20px;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;
