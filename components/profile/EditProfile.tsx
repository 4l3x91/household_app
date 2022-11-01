import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { default as React, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useYup } from "../../hooks/useYup";
import { avatarData } from "../../store/profile/profileData";
import { Avatar } from "../../store/profile/profileModel";
import { selectCurrentProfile, selectMemoizedHouseholdMembers } from "../../store/profile/profileSelectors";
import { updateProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Input from "../common/Input";
import AvatarPicker from "./AvatarPicker";

interface Props {
  closeModal: () => void;
}

const EditProfile = ({ closeModal }: Props) => {
  const profile = useAppSelector(selectCurrentProfile);
  const [avatar, setAvatar] = useState<Avatar>(profile?.avatar as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarData.findIndex((x) => x.avatar === profile?.avatar.avatar));
  const members = useAppSelector(selectMemoizedHouseholdMembers);
  const { colors } = useTheme();
  const { profileSchema } = useYup();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Content>
        <ModalContent elevation={0}>
          <Formik
            initialValues={{ profileName: profile?.profileName }}
            validationSchema={profileSchema}
            onSubmit={(values) => {
              if (profile && values.profileName) {
                dispatch(updateProfile({ ...profile, profileName: values.profileName, avatar: { avatar: avatar.avatar, color: avatar.color } }));
                closeModal();
              }
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <View>
                  <Text variant="headlineMedium" style={{ textAlign: "center", marginBottom: 10 }}>
                    Redigera profil
                  </Text>
                  <Input label="Namn" value={values.profileName as string} handleChange={handleChange("profileName")} />
                  {errors.profileName && <Text>{errors.profileName}</Text>}
                  <AvatarPicker
                    setAvatar={setAvatar}
                    selectedAvatar={selectedAvatar}
                    setSelectedAvatar={setSelectedAvatar}
                    profilesInHousehold={members}
                  />
                  <Button mode="contained-tonal" style={{ borderRadius: 10 }} onPress={handleSubmit}>
                    Spara
                  </Button>
                </View>
              );
            }}
          </Formik>
        </ModalContent>
      </Content>
      <Pressable onPress={closeModal}>
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default EditProfile;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled(Surface)`
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalContent = styled(Surface)`
  width: 100%;
  padding: 20px;
  flex-direction: row;
`;
