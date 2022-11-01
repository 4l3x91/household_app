import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { HouseholdModel } from "../../store/household/householdModel";
import { Profile } from "../../store/profile/profileModel";
import { deleteProfile } from "../../store/profile/profileThunks";
import { useAppDispatch } from "../../store/store";

interface Props {
  closeModal?: () => void;
  profile: Profile;
  household: HouseholdModel;
}

const DeleteProfile = ({ closeModal, profile, household }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Content>
        <Text variant="headlineMedium">Lämna hushåll</Text>
        <ModalContent elevation={0}>
          <InfoBox style={{ borderColor: colors.primary }}>
            <Text variant="bodySmall" style={{ textAlign: "center" }}>
              Om du väljer att lämna ett hushåll kommer din profil i det hushållet att raderas.
            </Text>
          </InfoBox>
          <Text variant="bodyMedium" style={{ textAlign: "center", paddingVertical: 10 }}>
            Är du säker på att du vill ta bort {profile.profileName} i hushållet {household.name}?
          </Text>
        </ModalContent>
        <ButtonContainer>
          <Button
            onPress={() => {
              dispatch(deleteProfile(profile));
              closeModal && closeModal();
            }}
            mode="contained"
            buttonColor={colors.errorContainer}
            style={{ marginRight: 5 }}
          >
            Ta bort
          </Button>
        </ButtonContainer>
      </Content>
      <Pressable
        onPress={() => {
          closeModal && closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default DeleteProfile;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Content = styled(Surface)`
  margin: 20px;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled(Surface)`
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const InfoBox = styled.View`
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  border-width: 1px;
`;
