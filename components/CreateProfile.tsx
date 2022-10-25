import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { selectHouseholdId } from "../store/household/householdSelector";
import { avatarData } from "../store/profile/profileData";
import { Avatar, Profile } from "../store/profile/profileModel";
import { selectHouseholdMembers } from "../store/profile/profileSelectors";
import { createProfile } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import { profileSchema } from "../utils/yupSchemas";
import Input from "./Input";

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
  const members = useAppSelector(selectHouseholdMembers);
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
              isApproved: false,
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
                {members && members.map((member) => <Text key={member.id}>{member.profileName}</Text>)}
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
                    <View key={avatar.avatar} style={{ alignItems: "center", justifyContent: "center" }}>
                      <AvatarCard
                        onPress={() => {
                          if (profilesInHousehold) {
                            if (!profilesInHousehold.find((a) => a.avatar.avatar === avatar.avatar)) {
                              setAvatar(avatar);
                              setSelectedAvatar(index);
                            }
                          } else {
                            setAvatar(avatar);
                            setSelectedAvatar(index);
                          }
                        }}
                        color={avatar.color}
                        selected={index === selectedAvatar}
                      >
                        <AvatarText>{avatar.avatar}</AvatarText>
                      </AvatarCard>
                      {profilesInHousehold && profilesInHousehold.find((profile) => profile.avatar.avatar === avatar.avatar) && (
                        <View style={{ position: "absolute" }}>
                          <Tooltip
                            backgroundColor={colors.surface}
                            width={200}
                            height={80}
                            popover={
                              <Text>
                                Den här avataren används av
                                {profilesInHousehold.find((profile) => profile.avatar.avatar === avatar.avatar)?.profileName}
                              </Text>
                            }
                            actionType="press"
                          >
                            <MaterialCommunityIcons name="close" size={65} color={colors.error} />
                          </Tooltip>
                        </View>
                      )}
                    </View>
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
