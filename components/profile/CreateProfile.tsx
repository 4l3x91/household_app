import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { useYup } from "../../hooks/useYup";
import { selectHouseholdId } from "../../store/household/householdSelector";
import { Avatar, Profile } from "../../store/profile/profileModel";
import { selectMemoizedHouseholdMembers } from "../../store/profile/profileSelectors";
import { postProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import Input from "../common/Input";
import AvatarPicker from "./AvatarPicker";

interface Props {
  closeModal: () => void;
  profilesInHousehold?: Profile[];
}

const CreateProfile = ({ closeModal, profilesInHousehold }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const members = useAppSelector(selectMemoizedHouseholdMembers);
  const householdId = useAppSelector(selectHouseholdId);
  const pending = useAppSelector((state) => state.profile).pending;
  const { profileSchema } = useYup();

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
              isApproved: false,
            };

            dispatch(postProfile(newProfile));
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
              <AvatarPicker
                setAvatar={setAvatar}
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                profilesInHousehold={profilesInHousehold}
              />
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
