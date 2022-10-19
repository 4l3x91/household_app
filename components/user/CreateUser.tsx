import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createUser } from "../../store/user/userSlice";
import ErrorTranslator from "../ErrorTranslator";
import Input from "../Input";

interface Props {
  navigate?: () => void;
}

const userSchema = Yup.object().shape({
  email: Yup.string().email("Ange en giltlig Email").required("Email kan inte vara tomt"),
  password: Yup.string().min(6, "minst 6 tecken").required("Lösenord kan inte vara tomt"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Lösenorden matchar inte"),
});

const CreateUser = ({ navigate }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);

  return (
    <Container>
      <Text variant="titleLarge">Skapa användare</Text>
      <Formik
        validationSchema={userSchema}
        initialValues={{ email: "", password: "", passwordConfirmation: "" }}
        onSubmit={(values) => {
          dispatch(
            createUser({
              email: values.email,
              password: values.password,
            })
          );
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <>
              <Input label="Email" value={values.email} handleChange={handleChange("email")} />
              {errors.email && <Text>{errors.email}</Text>}
              <Input
                label="Lösenord"
                secureTextEntry={secureTextEntry}
                value={values.password}
                handleChange={handleChange("password")}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPressIn={() => {
                      setSecureTextEntry(false);
                    }}
                    onPressOut={() => {
                      setSecureTextEntry(true);
                    }}
                  />
                }
              />
              {errors.password && <Text>{errors.password}</Text>}
              <Input
                label="Bekräfta lösenord"
                secureTextEntry={secureTextEntry}
                value={values.passwordConfirmation}
                handleChange={handleChange("passwordConfirmation")}
              />
              {errors.passwordConfirmation && <Text>{errors.passwordConfirmation}</Text>}
              <Button mode={"contained"} style={{ marginTop: 10 }} onPress={handleSubmit} loading={userState.pending}>
                Registrera
              </Button>
              {userState.error && <ErrorTranslator error={userState.error} navigate={navigate} />}
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateUser;

const Container = styled.View`
  padding: 10px;
`;
