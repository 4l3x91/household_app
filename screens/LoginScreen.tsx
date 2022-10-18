import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { useAppDispatch } from "../store/store";
import { signInUser } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const validation = Yup.object().shape({
  email: Yup.string().required("Email kan inte vara tomt"),
  password: Yup.string().required("Lösenord kan inte vara tomt"),
});

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthentication();

  useEffect(() => {
    if (user) {
      navigation.navigate("TabStack");
    }
  }, [user]);
  return (
    <>
      <Main>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validation}
          onSubmit={(values) => {
            dispatch(
              signInUser({
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
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                />
                {errors.password && <Text>{errors.password}</Text>}
                <Button mode={"contained"} style={{ marginTop: 10 }} onPress={handleSubmit}>
                  Logga in
                </Button>
              </>
            );
          }}
        </Formik>
      </Main>
    </>
  );
};

export default LoginScreen;

const Main = styled.View`
  flex: 1;
  padding: 10px;
`;
