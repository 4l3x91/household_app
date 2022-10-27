import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Profile } from "../../store/profile/profileModel";
import { deleteProfile, updateProfile } from "../../store/profile/profileThunks";
import { useAppDispatch } from "../../store/store";
import AvatarCard from "./AvatarCard";

interface Props {
  member: Profile;
  closeModal: () => void;
  toggleOverlay: () => void;
  overlay: boolean;
}

const HouseholdMember = ({ member, closeModal, toggleOverlay, overlay }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Container background={"black"} overlay={overlay}>
      <ModalContainer background={colors.surface}>
        <ProfileContent>
          <ProfileName variant={"displayLarge"}>{member.profileName}</ProfileName>
          <AvatarCard profile={member} size={40} />
        </ProfileContent>
        <Text>Inställningar</Text>
        <ButtonContainer>
          <IconButton
            color={colors.surfaceVariant}
            onPress={() => {
              dispatch(deleteProfile(member));
              closeModal();
            }}
          >
            <FontAwesome5 name="trash-alt" size={30} color={colors.onSecondaryContainer} />
            <ButtonText variant="bodySmall">Ta Bort</ButtonText>
          </IconButton>
          <IconButton
            color={colors.surfaceVariant}
            onPress={() => {
              dispatch(updateProfile({ ...member, role: "owner" }));
              closeModal();
            }}
          >
            <FontAwesome5 name="crown" size={30} color={colors.onSecondaryContainer} />
            <ButtonText variant="bodySmall">Gör ägare</ButtonText>
          </IconButton>
          {member.isPaused === false ? (
            <IconButton
              color={colors.surfaceVariant}
              onPress={() => {
                dispatch(updateProfile({ ...member, isPaused: true }));
                closeModal();
              }}
            >
              <FontAwesome5 name="pause" size={30} color={colors.onSecondaryContainer} />
              <ButtonText variant="bodySmall">Pausa</ButtonText>
            </IconButton>
          ) : (
            <IconButton
              color={colors.surfaceVariant}
              onPress={() => {
                dispatch(updateProfile({ ...member, isPaused: false }));
                closeModal();
              }}
            >
              <FontAwesome5 name="play" size={30} color={colors.onSecondaryContainer} />
              <ButtonText variant="bodySmall">Pausa</ButtonText>
            </IconButton>
          )}
        </ButtonContainer>
      </ModalContainer>
      <Pressable
        onPress={() => {
          toggleOverlay();
          setTimeout(() => {
            closeModal();
          }, 500);
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} style={{ marginTop: 10 }} />
      </Pressable>
    </Container>
  );
};

export default HouseholdMember;

const Container = styled.View<{ overlay: boolean; background: string }>`
  background-color: ${(props) => (props.overlay ? "#000000c3" : undefined)};
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 22px;
`;

const ModalContainer = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  align-items: center;
  width: 90%;
  height: 50%;
  border-radius: 10px;
`;

const ProfileContent = styled(Surface)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  width: 100%;
  padding: 20px 0px;
`;

const ProfileName = styled(Text)`
  margin-right: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 90%;
  justify-content: space-between;
`;

const IconButton = styled.Pressable<{ color: string }>`
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.color};
  margin: 15px;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 0px;
`;

const ButtonText = styled(Text)`
  text-align: center;
  margin-top: 8px;
`;
