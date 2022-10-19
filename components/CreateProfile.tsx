import { Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useAuthentication } from "../hooks/useAuthentication";
import { selectHouseholdId } from "../store/household/householdSelector";
import { avatarData } from "../store/profile/profileData";
import { Avatar, Profile } from "../store/profile/profileModel";
import { setProfile } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const profileSchema = Yup.object().shape({
  profileName: Yup.string()
    .required("profile name cant be empty")
    .min(2, "must contain atleast 2 characters")
    .matches(/^\S*$/, "profile name cannot contain spaces"),
});

const CreateProfile = () => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const { user } = useAuthentication();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const householdId = useAppSelector(selectHouseholdId);

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

            dispatch(setProfile(newProfile));
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View>
              <View>
                <TextInput
                  label="Profilnamn"
                  mode={"outlined"}
                  activeOutlineColor={colors.primary}
                  outlineColor={colors.secondary}
                  value={values.profileName}
                  onChangeText={handleChange("profileName")}
                />
                {errors.profileName && <Text>{errors.profileName}</Text>}
              </View>
              <AvatarContainer>
                <Text style={{ marginHorizontal: 10 }}>Välj din avatar</Text>
                <AvatarContent>
                  {avatarData.map((avatar) => (
                    <AvatarCard onPress={() => setAvatar(avatar)} color={avatar.color}>
                      <AvatarText>{avatar.avatar}</AvatarText>
                    </AvatarCard>
                  ))}
                </AvatarContent>
              </AvatarContainer>
              <CreateButton onPress={() => handleSubmit()} bgColor={colors.primary}>
                <CreateButtonText color={colors.secondary}>Skapa</CreateButtonText>
              </CreateButton>
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

const AvatarCard = styled.Pressable<{ color: string }>`
  padding: 5px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  margin: 4px;
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

const CreateButton = styled.Pressable<{ bgColor: string }>`
  margin: 20px 50px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
`;

const CreateButtonText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 20px;
  padding: 10px;
`;