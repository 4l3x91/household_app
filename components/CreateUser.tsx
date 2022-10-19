import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAppDispatch } from "../store/store";
import { createUser } from "../store/user/userSlice";

const userSchema = Yup.object().shape({
  email: Yup.string().email("Ange en giltlig Email").required("Email kan inte vara tomt"),
  password: Yup.string().min(6, "minst 6 tecken").required("Lösenord kan inte vara tomt"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Lösenorden matchar inte"),
});

const CreateUser = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();

  return (
    <Container>
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
              <TextInput label="Email" mode={"outlined"} value={values.email} onChangeText={handleChange("email")} />
              {errors.email && <Text>{errors.email}</Text>}
              <TextInput
                label="Lösenord"
                mode={"outlined"}
                secureTextEntry={secureTextEntry}
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
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {errors.password && <Text>{errors.password}</Text>}
              <TextInput
                label="Bekräfta lösenord"
                mode={"outlined"}
                secureTextEntry={secureTextEntry}
                value={values.passwordConfirmation}
                onChangeText={handleChange("passwordConfirmation")}
              />
              {errors.passwordConfirmation && <Text>{errors.passwordConfirmation}</Text>}
              <Button mode={"contained"} style={{ marginTop: 10 }} onPress={handleSubmit}>
                Registrera
              </Button>
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
