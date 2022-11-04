import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { useYup } from "../../hooks/useYup";
import { Avatar, Profile } from "../../store/profile/profileModel";
import { postProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import Input from "../common/Input";
import AvatarPicker from "./AvatarPicker";

interface Props {
  closeModal: () => void;
  profilesInHousehold?: Profile[];
  householdId: string;
  setSnackbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProfile = ({ closeModal, profilesInHousehold, householdId, setSnackbarVisible }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
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
                {errors.profileName && <Text style={{color: colors.error}}>{errors.profileName}</Text>}
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
                  setSnackbarVisible(true);
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
`;
