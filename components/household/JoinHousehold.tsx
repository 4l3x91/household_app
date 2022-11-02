import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { db } from "../../config/firebase";
import { useYup } from "../../hooks/useYup";
import { HouseholdModel } from "../../store/household/householdModel";
import { Profile } from "../../store/profile/profileModel";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import ErrorTranslator from "../common/ErrorTranslator";
import CreateProfile from "../profile/CreateProfile";

interface Props {
  closeModal: () => void;
}

const JoinHousehold = ({ closeModal }: Props) => {
  const [text, setText] = useState<string>();
  const user = useAppSelector(selectUser);
  const [profilesInHousehold, setProfilesInHousehold] = useState<Profile[]>([]);
  const pinCodeLength = 6;
  const [householdToJoin, setHouseholdToJoin] = useState<HouseholdModel>();
  const { householdCodeSchema } = useYup();
  const { colors } = useTheme();
  const [error, setError] = useState("");

  const getHouseholdByCodeTest = async () => {
    if (text && user) {
      try {
        const capitalizedCode = text.toUpperCase();
        const profilesRef = collection(db, "profiles");
        const householdRef = collection(db, "households");
        const q = query(householdRef, where("code", "==", capitalizedCode));
        const q2 = query(profilesRef, where("userId", "==", user.id));
        const queryResult = await getDocs(q);

        if (!queryResult.empty) {
          const household = queryResult.docs[0].data() as HouseholdModel;

          const queryResult2 = await getDocs(q2);
          queryResult2.forEach((doc) => {
            if (doc.get("householdId") === household.id) {
              setError("Du har redan en profil i detta hushåll");
            }
          });
          setHouseholdToJoin(household);
        } else {
          setError("Det här hushållet existerar inte");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("error");
      }
    }
  };

  async function getUnavalibleAvatars() {
    if (householdToJoin) {
      const profilesRef = collection(db, "profiles");

      const q = query(profilesRef, where("householdId", "==", householdToJoin.id));

      const result = await getDocs(q);

      if (!result.empty) {
        result.forEach((doc) => setProfilesInHousehold((prev) => [...prev, doc.data() as Profile]));
      }
    }
  }

  useEffect(() => {
    if (text?.length !== 6) {
      setError("");
    }
  }, [text]);

  useEffect(() => {
    if (text?.toUpperCase() === householdToJoin?.code) {
      setProfilesInHousehold([]);

      getUnavalibleAvatars();
    }
  }, [householdToJoin]);

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
        onSubmit={async (values) => {
          if (values.householdCode && user) {
            await getHouseholdByCodeTest();
          }
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <Content>
              <ModalContent elevation={0}>
                <Container>
                  {householdToJoin?.code !== values.householdCode || error ? (
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
                            setText(text);

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
                    !error && (
                      <>
                        <Text variant="headlineMedium">Skapa din profil</Text>
                        <InfoBox style={{ borderColor: colors.primary }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text variant="bodySmall">Välkommen till </Text>
                            <Text variant="bodySmall" style={{ fontWeight: "bold" }}>
                              {" "}
                              {householdToJoin?.name}
                            </Text>
                          </View>
                          <Text variant="bodySmall">Fyll i ditt namn och välj en ledig avatar för att gå vidare.</Text>
                        </InfoBox>
                        <CreateProfile profilesInHousehold={profilesInHousehold} householdId={householdToJoin.id} closeModal={closeModal} />
                      </>
                    )
                  )}
                  <ErrorBox>{error && <ErrorTranslator error={error} />}</ErrorBox>
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
