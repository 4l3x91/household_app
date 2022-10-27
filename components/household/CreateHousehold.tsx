import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { HouseholdModel } from "../../store/household/householdModel";
import { postHousehold } from "../../store/household/householdThunks";
import { Avatar, Profile } from "../../store/profile/profileModel";
import { postProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import { generateHouseholdCode } from "../../utils/utils";
import { createHouseholdSchema } from "../../utils/yupSchemas";
import Input from "../common/Input";
import AvatarPicker from "../profile/AvatarPicker";
import HouseholdCode from "./HouseholdCode";

interface Props {
  closeModal?: () => void;
}

const CreateHousehold = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [householdCode, setHouseholdCode] = useState(generateHouseholdCode());
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const householdPending = useAppSelector((state) => state.household).pending;
  const profilePending = useAppSelector((state) => state.profile).pending;
  const user = useAppSelector(selectUser);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

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
        isApproved: true,
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
              <HeaderText variant="headlineMedium">Skapa hushåll</HeaderText>
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
              <AvatarPicker setAvatar={setAvatar} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />

              <Button disabled={!inputsOk} mode="contained" onPress={() => handleSubmit()} loading={pending}>
                Skapa
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

const HeaderText = styled(Text)`
  align-self: center;
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
  padding: 0px;
`;
