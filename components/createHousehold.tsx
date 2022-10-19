import { Formik } from "formik";
import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { HouseholdModel } from "../store/household/householdModel";
import { createHouseholdThunk } from "../store/household/householdSlice";
import { useAppDispatch } from "../store/store";
import Input from "./Input";

const householdNameSchema = Yup.object().shape({
  householdName: Yup.string()
    .required("namnet på hushållet kan inte vara tomt")
    .matches(/^\S+(?: \S+)*$/, "ogiltligt hushålls namn")
    .min(2, "namnet måste innehålla minst 2 tecken"),
});

const CreateHousehold = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const generateHouseholdCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  return (
    <Container>
      <Formik
        validationSchema={householdNameSchema}
        initialValues={{
          householdName: "",
        }}
        onSubmit={(values) => {
          const newHousehold: HouseholdModel = {
            name: values.householdName,
            id: uuidv4(),
            code: generateHouseholdCode(),
          };
          dispatch(createHouseholdThunk(newHousehold));
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <Container>
              <Text>Create your household</Text>
              <InputContainer>
                <Input
                  label="householdName"
                  value={values.householdName}
                  handleChange={handleChange("householdName")}
                  activeOutlineColor={colors.primary}
                />
                {errors.householdName && <Text>{errors.householdName}</Text>}
              </InputContainer>
              <CreateButton onPress={() => handleSubmit()} bgColor={colors.primary}>
                <ButtonText color={colors.secondary}>Skapa hushåll</ButtonText>
              </CreateButton>
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
  padding: 10px;
`;

const CreateButton = styled.Pressable<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  margin: 20px 50px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const ButtonText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 20px;
  padding: 10px;
`;
