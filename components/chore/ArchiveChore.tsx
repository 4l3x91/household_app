import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Button, overlay, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { updateChore } from "../../store/chore/choreThunks";
import { useAppDispatch } from "../../store/store";

interface Props {
  closeModal: () => void;
  chore: Chore;
  toggleOverlay: () => void;
}

const ArchiveChore = ({ closeModal, chore, toggleOverlay }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const buttonLabel = chore.archived ? "Aktivera" : "Arkivera";

  return (
    <Container overlay={overlay}>
      <Content>
        {chore.archived ? <Text variant="headlineMedium">Aktivera syssla</Text> : <Text variant="headlineMedium">Arkivera syssla</Text>}

        <ModalContent elevation={0}>
          {chore.archived ? (
            <Text>Vill du aktivera {chore.name} igen?</Text>
          ) : (
            <>
              <Text>
                När du arkiverar en syssla kommer statistiken för sysslan fortfarande finnas kvar. Medlemmar i hushållet som inte är ägare kommer inte
                längre kunna se sysslan. Du kan alltid aktivera en arkiverad syssla igen.
              </Text>
              <Text>Vill du arkivera {chore.name} ?</Text>
            </>
          )}
        </ModalContent>

        <Button
          onPress={() => {
            dispatch(updateChore({ ...chore, archived: chore.archived ? false : true }));
            closeModal();
            toggleOverlay();
          }}
          mode="outlined"
        >
          {buttonLabel}
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

export default ArchiveChore;

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
