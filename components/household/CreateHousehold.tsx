import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import { useUtils } from "../../config/hooks/useUtils";
import { useYup } from "../../config/hooks/useYup";
import { HouseholdModel } from "../../store/household/householdModel";
import { postHousehold } from "../../store/household/householdThunks";
import { Avatar, Profile } from "../../store/profile/profileModel";
import { postProfile } from "../../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import Input from "../common/Input";
import AvatarPicker from "../profile/AvatarPicker";
import HouseholdCode from "./HouseholdCode";

interface Props {
  closeModal?: () => void;
}

const CreateHousehold = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const { generateHouseholdCode } = useUtils();
  const [householdCode, setHouseholdCode] = useState(generateHouseholdCode());
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const householdPending = useAppSelector((state) => state.household).pending;
  const profilePending = useAppSelector((state) => state.profile).pending;
  const user = useAppSelector(selectUser);
  const { newHouseholdSchema } = useYup();
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
    <FlexContainer>
      <Formik
        validationSchema={newHouseholdSchema}
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
            <Content>
              <ModalContent elevation={0}>
                <View>
                  <HeaderText variant="headlineMedium">Skapa hushåll</HeaderText>
                  <InputContainer>
                    <Input
                      width="100%"
                      label="Namn på hushåll"
                      value={values.householdName}
                      handleChange={handleChange("householdName")}
                      activeOutlineColor={colors.primary}
                    />
                  </InputContainer>
                  {errors.householdName && <Text>{errors.householdName}</Text>}

                  <HouseholdCode householdCode={householdCode} setHouseholdCode={setHouseholdCode} />
                  <InputContainer>
                    <Input
                      width="100%"
                      label="Profilnamn"
                      value={values.profileName}
                      handleChange={handleChange("profileName")}
                      activeOutlineColor={colors.primary}
                    />
                  </InputContainer>
                  {errors.profileName && <Text>{errors.profileName}</Text>}
                  <AvatarPicker setAvatar={setAvatar} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />

                  <Button disabled={!inputsOk} mode="contained-tonal" style={{ borderRadius: 10 }} onPress={() => handleSubmit()} loading={pending}>
                    Skapa
                  </Button>
                </View>
              </ModalContent>
            </Content>
          );
        }}
      </Formik>
      <Pressable onPress={closeModal}>
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </FlexContainer>
  );
};

export default CreateHousehold;

const Container = styled.View`
  justify-content: center;
  background-color: transparent;
  align-items: center;
`;

const FlexContainer = styled(Container)`
  flex: 1;
`;

const Content = styled(Surface)`
  margin: 20px;
  border-radius: 20px;
  align-items: center;
  padding: 10px;
`;

const HeaderText = styled(Text)`
  align-self: center;
  margin-bottom: 10px;
`;

const ModalContent = styled(Surface)`
  padding: 0px 10px 20px 10px;
  margin-top: 10px;
`;

const InputContainer = styled.View`
  background-color: transparent;
  flex-direction: row;
`;
