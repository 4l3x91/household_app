import { Formik } from "formik";
import React, { useState } from "react";
import {} from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { HouseholdModel } from "../store/household/householdModel";
import { createHouseholdThunk } from "../store/household/householdSlice";
import { avatarData } from "../store/profile/profileData";
import { Avatar, Profile } from "../store/profile/profileModel";
import { createProfile } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import Input from "./Input";

const householdNameSchema = Yup.object().shape({
  householdName: Yup.string()
    .required("namnet på hushållet kan inte vara tomt")
    .matches(/^\S+(?: \S+)*$/, "ogiltligt hushålls namn")
    .min(2, "namnet måste innehålla minst 2 tecken"),
  profileName: Yup.string()
    .required("Profilnamn får inte vara tomt")
    .min(2, "Profilnamn måste minst inehålla 2 tecken")
    .matches(/^\S*$/, "Profilnamn kan inte innehålla mellanslag"),
});

interface Props {
  closeModal: () => void;
}

const CreateHousehold2 = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const householdPending = useAppSelector((state) => state.household).pending;
  const profilePending = useAppSelector((state) => state.profile).pending;

  const generateHouseholdCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  const pending = householdPending || profilePending;

  return (
    <Container>
      <Formik
        validationSchema={householdNameSchema}
        initialValues={{
          householdName: "",
          profileName: "",
        }}
        onSubmit={(values) => {
          const newHousehold: HouseholdModel = {
            name: values.householdName,
            id: uuidv4(),
            code: generateHouseholdCode(),
          };
          dispatch(createHouseholdThunk(newHousehold));

          if (user) {
            const newProfile: Profile = {
              id: uuidv4(),
              userId: user?.id,
              householdId: newHousehold.id,
              profileName: values.profileName,
              avatar: avatar,
              role: "owner",
              isPaused: false,
            };
            dispatch(createProfile(newProfile));
            closeModal();
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          const inputsOk =
            !errors.householdName &&
            !errors.profileName &&
            selectedAvatar !== -1 &&
            values.householdName.length >= 2 &&
            values.profileName.length >= 2;
          return (
            <Container>
              <Text variant="headlineMedium" style={{ alignSelf: "center" }}>
                Skapa hushåll
              </Text>
              <InputContainer>
                <Input
                  label="Namn på hushåll"
                  value={values.householdName}
                  handleChange={handleChange("householdName")}
                  activeOutlineColor={colors.primary}
                />
                {errors.householdName && <Text>{errors.householdName}</Text>}
                <Input label="Profilnamn" value={values.profileName} handleChange={handleChange("profileName")} />
                {errors.profileName && <Text>{errors.profileName}</Text>}
              </InputContainer>
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
              <Button disabled={!inputsOk} mode="outlined" onPress={() => handleSubmit()} loading={pending}>
                <Text>Skapa</Text>
              </Button>
              {/* <CreateButton disabled onPress={() => handleSubmit()}>
                <CreateButtonText color={colors.secondary}>Skapa</CreateButtonText>
              </CreateButton> */}
              {/* <CreateButton onPress={() => handleSubmit()} bgColor={colors.primary}>
                <ButtonText color={colors.secondary}>Skapa hushåll</ButtonText>
              </CreateButton> */}
            </Container>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateHousehold2;

const Container = styled.View`
  justify-content: center;
  padding: 10px;
`;

const InputContainer = styled.View`
  padding: 10px;
`;

const CreateButton = styled.Pressable`
  margin: 20px 50px;
  border-radius: 100px;

  justify-content: center;
  align-items: center;
`;

const CreateButtonText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 20px;
  padding: 10px;
`;

const ButtonText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 20px;
  padding: 10px;
`;

const AvatarCard = styled.Pressable<{ color: string; selected?: boolean }>`
  padding: 5px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  ${({ selected }) => !selected && "opacity: .5"};
  margin: 4px;
`;

const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AvatarContent = styled(Surface)`
  margin: 20px;
  width: 85%;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: lightgray; */
  border-radius: 10px;
  padding: 10px;
`;

const AvatarText = styled.Text`
  font-size: 40px;
`;
