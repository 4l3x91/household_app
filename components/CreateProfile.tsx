import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { selectHouseholdId } from "../store/household/householdSelector";
import { avatarData } from "../store/profile/profileData";
import { Avatar, Profile } from "../store/profile/profileModel";
import { createProfile } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import { profileSchema } from "../utils/yupSchemas";
import Input from "./Input";

interface Props {
  closeModal: () => void;
}

const CreateProfile = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const householdId = useAppSelector(selectHouseholdId);
  const pending = useAppSelector((state) => state.profile).pending;

  return (
    <Container>
      <Formik
        validationSchema={profileSchema}
        initialValues={{
          profileName: "",
        }}
        onSubmit={(values) => {
          if (user) {
            const newProfile: Profile = {
              id: uuidv4(),
              userId: user?.id,
              householdId: householdId,
              profileName: values.profileName,
              avatar: avatar,
              role: "user",
              isPaused: false,
            };

            dispatch(createProfile(newProfile));
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          const inputsOk = !errors.profileName && selectedAvatar !== -1 && values.profileName.length >= 2;
          return (
            <View>
              <View>
                <Input
                  marginHorizontal={30}
                  label="Profilnamn"
                  value={values.profileName}
                  handleChange={handleChange("profileName")}
                  activeOutlineColor={colors.primary}
                />
                {errors.profileName && <Text>{errors.profileName}</Text>}
              </View>
              <AvatarContainer>
                <Text variant="headlineSmall" style={{ marginHorizontal: 10, alignSelf: "center" }}>
                  Välj din avatar
                </Text>
                <AvatarContent elevation={3}>
                  {avatarData.map((avatar, index) => (
                    <AvatarCard
                      key={avatar.avatar}
                      onPress={() => {
                        setAvatar(avatar);
                        setSelectedAvatar(index);
                      }}
                      color={avatar.color}
                      selected={index === selectedAvatar}
                    >
                      <AvatarText>{avatar.avatar}</AvatarText>
                    </AvatarCard>
                  ))}
                </AvatarContent>
              </AvatarContainer>
              <Button
                style={{ marginHorizontal: 30 }}
                disabled={!inputsOk}
                mode="contained"
                onPress={() => {
                  handleSubmit();
                  closeModal();
                }}
                loading={pending}
                buttonColor={colors.surfaceVariant}
              >
                <Text style={{ color: colors.onSurfaceVariant }}>Skapa</Text>
              </Button>
            </View>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateProfile;

const Container = styled.View`
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AvatarContent = styled.View`
  margin: 20px;
  width: 85%;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const AvatarText = styled.Text`
  font-size: 40px;
`;

const AvatarCard = styled.Pressable<{ color: string; selected?: boolean }>`
  padding: 5px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  ${({ selected }) => !selected && "opacity: .5"};
  margin: 4px;
`;
