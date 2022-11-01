import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useStorage } from "../../hooks/useStorage";
import { Chore } from "../../store/chore/choreModel";
import { deleteChore, updateChore } from "../../store/chore/choreThunks";
import { useAppDispatch } from "../../store/store";

interface Props {
  closeModal: () => void;
  chore: Chore;
}

const DeleteChore = ({ closeModal, chore }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { deleteAttachments } = useStorage();

  return (
    <Container>
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
              deleteAttachments(chore);
              closeModal();
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
          closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default DeleteChore;

const Container = styled.View`
  flex: 1;
  justify-content: center;
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
