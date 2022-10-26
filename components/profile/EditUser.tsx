import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { default as React, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { avatarData } from "../../store/profile/profileData";
import { Avatar } from "../../store/profile/profileModel";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { editProfileThunk } from "../../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Input from "../Input";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Profilnamnet måste vara minst två tecken")
    .max(20, "Profilnamnet kan inte vara längre än 20 tecken")
    .required("Profilnamn kan inte vara tomt"),
});

interface Props {
  closeModal: () => void;
  overlay: boolean;
  toggleOverlay: () => void;
}

const EditUser = ({ closeModal, toggleOverlay, overlay }: Props) => {
  const { colors } = useTheme();
  const profile = useAppSelector(selectCurrentProfile);
  const dispatch = useAppDispatch();
  const handleSubmit = (values: { name: string; avatar: string; avatarColor: string }) => {
    if (profile) dispatch(editProfileThunk({ ...profile, profileName: values.name, avatar: { avatar: values.avatar, color: values.avatarColor } }));
    closeModal();
  };
  const [avatar, setAvatar] = useState<Avatar>(profile?.avatar as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(3);

  return (
    <Container overlay={overlay}>
      <Content>
        <Text variant="headlineMedium">Redigera profil</Text>
        <ModalContent elevation={0}>
          <Formik
            initialValues={{ name: profile?.profileName }}
            validationSchema={validation}
            onSubmit={(values) => values && handleSubmit({ name: values.name as string, avatar: avatar.avatar, avatarColor: avatar.color })}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <View style={{ width: "100%" }}>
                  <Input label="Namn" value={values.name as string} handleChange={handleChange("name")} />
                  {errors.name && <Text>{errors.name}</Text>}
                  <AvatarContainer>
                    <Text variant="headlineSmall">Välj din avatar</Text>
                    {/* TODO: will be replaced */}
                    <AvatarContent elevation={0}>
                      {avatarData.map((avatar, index) => (
                        <View key={avatar.avatar}>
                          <AvatarCard
                            onPress={() => {
                              setAvatar(avatar);
                              setSelectedAvatar(index);
                            }}
                            color={avatar.color}
                            selected={index === selectedAvatar}
                          >
                            <AvatarText>{avatar.avatar}</AvatarText>
                          </AvatarCard>
                        </View>
                      ))}
                    </AvatarContent>
                    {/* TODO: will be replaced ^ */}
                  </AvatarContainer>
                  <Button onPress={handleSubmit}>Spara</Button>
                </View>
              );
            }}
          </Formik>
        </ModalContent>
      </Content>
      <Pressable
        onPress={() => {
          toggleOverlay();
          setTimeout(() => {
            closeModal();
          }, 500);
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default EditUser;

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

const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const AvatarContent = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 20px 0;
`;

const AvatarText = styled.Text`
  font-size: 35px;
`;

const AvatarCard = styled.Pressable<{ color: string; selected?: boolean }>`
  padding: 14px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  ${({ selected }) => !selected && "opacity: .5"};
  margin: 4px;
`;