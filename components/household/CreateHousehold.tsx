import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { HouseholdModel } from "../../store/household/householdModel";
import { postHousehold } from "../../store/household/householdThunks";
import { avatarData } from "../../store/profile/profileData";
import { Avatar, Profile } from "../../store/profile/profileModel";
import { postProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import { generateHouseholdCode } from "../../utils/utils";
import { createHouseholdSchema } from "../../utils/yupSchemas";
import Input from "../common/Input";
import HouseholdCode from "./HouseholdCode";

interface Props {
  closeModal?: () => void;
}

const CreateHousehold = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [householdCode, setHouseholdCode] = useState(generateHouseholdCode());
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const householdPending = useAppSelector((state) => state.household).pending;
  const profilePending = useAppSelector((state) => state.profile).pending;
  const user = useAppSelector(selectUser);

  const pending = householdPending || profilePending;

  const handleSubmit = (values: { householdName: string; profileName: string }) => {
    const newHousehold: HouseholdModel = {
      name: values.householdName,
      id: uuidv4(),
      code: householdCode,
    };
    dispatch(postHousehold(newHousehold));

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
      dispatch(postProfile(newProfile));
    }

    closeModal && closeModal();
  };

  return (
    <Container>
      <Formik
        validationSchema={createHouseholdSchema}
        initialValues={{
          householdName: "",
          profileName: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
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
                <HouseholdCode householdCode={householdCode} setHouseholdCode={setHouseholdCode} />
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
              <Button disabled={!inputsOk} mode="contained" onPress={() => handleSubmit()} loading={pending}>
                <Text>Skapa</Text>
              </Button>
            </Container>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateHousehold;

const Container = styled.View`
  justify-content: center;
  padding: 10px;
`;

const InputContainer = styled.View`
  padding: 0px;
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
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 10px;
`;

const AvatarText = styled.Text`
  font-size: 40px;
`;
