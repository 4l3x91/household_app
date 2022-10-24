import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { selectHousehold } from "../../store/household/householdSelector";
import { getHouseholdByCodeThunk, setError } from "../../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUser } from "../../store/user/userSelectors";
import CreateProfile from "../CreateProfile";
import ErrorTranslator from "../ErrorTranslator";

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
  const error = useAppSelector(selectHousehold).error;
  const pinCodeLength = 6;

  //resetting errormessage
  useEffect(() => {
    if (text?.length !== 6) {
      dispatch(setError(""));
    }
  }, [text]);

  function InputBoxes() {
    const inputBoxes = [];
    for (let i = 0; i < pinCodeLength; i++) {
      let filled = false;
      if (text && text[i]) filled = true;
      inputBoxes.push(
        <InputBox elevation={0} key={i} filled={filled}>
          <Text variant="headlineLarge">{text && text.toUpperCase()[i]}</Text>
        </InputBox>
      );
    }
    return inputBoxes;
  }
  return (
    <Formik
      validationSchema={householdCodeSchema}
      initialValues={{
        householdCode: "",
      }}
      onSubmit={(values) => {
        if (values.householdCode && user) {
          dispatch(getHouseholdByCodeThunk({ code: values.householdCode, user: user }));
        }
      }}
    >
      {({ handleSubmit, values }) => {
        return (
          <>
            <Container>
              <Text style={{ padding: 10, fontSize: 30 }}>Fyll i hushållskoden</Text>
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
              {error && <ErrorTranslator error={error as string} />}
              {household.household.code !== "" && household.household.code === values.householdCode && <CreateProfile closeModal={closeModal} />}
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

export default JoinHousehold;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const InputBox = styled(Surface)<{ filled: boolean }>`
  background-color: transparent;
  border-width: 2px;
  min-width: 50px;
  min-height: 70px;
  border-radius: 5px;
  margin: 4px;
  justify-content: center;
  align-items: center;
  opacity: ${({ filled }) => (filled ? 1 : 0.3)};
`;

const InputContainer = styled(Surface)`
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
