import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { db } from "../../config/firebase";
import { selectHousehold } from "../../store/household/householdSelector";
import { setError } from "../../store/household/householdSlice";
import { getHouseholdByCode } from "../../store/household/householdThunks";
import { Profile } from "../../store/profile/profileModel";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import ErrorTranslator from "../common/ErrorTranslator";
import CreateProfile from "../profile/CreateProfile";

const householdCodeSchema = Yup.object().shape({
  householdCode: Yup.string()
    .required("En hushållskod måste innehålla sex stycken tecken")
    .min(6, "En hushållskod måste innehålla sex tecken")
    .matches(/^\S*$/, "En hushållskod kan inte innehålla mellanslag"),
});

interface Props {
  closeModal: () => void;
}

const JoinHousehold = ({ closeModal }: Props) => {
  const [text, setText] = useState<string>();
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const user = useAppSelector(selectUser);
  const [profilesInHousehold, setProfilesInHousehold] = useState<Profile[]>([]);
  const pinCodeLength = 6;
  const { colors } = useTheme();

  async function getUnavalibleAvatars() {
    const profilesRef = collection(db, "profiles");

    const q = query(profilesRef, where("householdId", "==", household.household.id));

    const result = await getDocs(q);

    console.log(result);

    if (!result.empty) {
      result.forEach((doc) => setProfilesInHousehold((prev) => [...prev, doc.data() as Profile]));
    }
  }

  //resetting errormessage
  useEffect(() => {
    if (text?.length !== 6) {
      dispatch(setError(""));
    }
  }, [text]);

  useEffect(() => {
    if (text === household.household.code) {
      setProfilesInHousehold([]);

      getUnavalibleAvatars();
    }
  }, [household]);

  function InputBoxes() {
    const inputBoxes = [];
    for (let i = 0; i < pinCodeLength; i++) {
      let filled = false;
      if (text && text[i]) filled = true;
      inputBoxes.push(
        <InputBox elevation={0} key={i} filled={filled} style={{ borderColor: colors.primary, backgroundColor: colors.onPrimary }}>
          <Text variant="headlineLarge">{text && text.toUpperCase()[i]}</Text>
        </InputBox>
      );
    }
    return inputBoxes;
  }
  return (
    <FlexContainer>
      <Formik
        validationSchema={householdCodeSchema}
        initialValues={{
          householdCode: "",
        }}
        onSubmit={(values) => {
          if (values.householdCode && user) {
            dispatch(getHouseholdByCode({ code: values.householdCode, user: user }));
          }
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <Content>
              <ModalContent elevation={0}>
                <Container>
                  {household.household.code !== values.householdCode || household.error ? (
                    <>
                      <Text variant="headlineMedium">Ange hushållskod</Text>
                      <Text variant="bodySmall" style={{ textAlign: "left", margin: 4 }}>
                        Skriv in den sexsiffriga koden i rutorna!
                      </Text>
                      <InputContainer>
                        <Input
                          maxLength={pinCodeLength}
                          mode="outlined"
                          value={text}
                          onChangeText={(text: string) => {
                            values.householdCode = text.toUpperCase();
                            setText(text.toUpperCase());

                            if (text.length === 6) {
                              Keyboard.dismiss();
                              handleSubmit();
                            }
                          }}
                        />
                        {InputBoxes()}
                      </InputContainer>
                    </>
                  ) : (
                    !household.error && (
                      <>
                        <Text variant="headlineMedium">Skapa din profil</Text>
                        <InfoBox style={{ borderColor: colors.primary }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text variant="bodySmall">Välkommen till </Text>
                            <Text variant="bodySmall" style={{ fontWeight: "bold" }}> {household.household.name}
                            </Text>
                          </View>
                          <Text variant="bodySmall">Fyll i ditt namn och välj en ledig avatar för att gå vidare.</Text>
                        </InfoBox>
                        <CreateProfile profilesInHousehold={profilesInHousehold} closeModal={closeModal} />
                      </>
                    )
                  )}
                  <ErrorBox>{household.error && <ErrorTranslator error={household.error as string} />}</ErrorBox>
                </Container>
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

export default JoinHousehold;

const InfoBox = styled.View`
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  border-width: 1px;
`;
const ErrorBox = styled.View`
  padding: 5px;
  margin-top: 10px;
`;

const InputBox = styled(Surface)<{ filled: boolean }>`
  border-width: 2px;
  min-width: 50px;
  margin: 6px;
  min-height: 70px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  opacity: ${({ filled }) => (filled ? 1 : 0.69)};
`;

const InputContainer = styled(Surface)`
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.TextInput`
  margin-top: -8px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
`;

const Container = styled.View`
  justify-content: center;
  background-color: transparent;
  align-items: center;
  `;

const FlexContainer = styled(Container)`
  flex: 1;
  `;

const Content = styled(Surface)`
  margin: 10px;
  justify-content: center;
  padding: 0px 20px;
  border-radius: 20px;
  align-items: center;
  `;

const ModalContent = styled(Surface)`
  padding: 0px 10px 0px 10px;
  margin-top: 10px;
`;
