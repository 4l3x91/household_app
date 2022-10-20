import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signInUser } from "../../store/user/userSlice";
import ErrorTranslator from "../ErrorTranslator";
import Input from "../Input";

interface Props {
  close: () => void;
  register: () => void;
}

const validation = Yup.object().shape({
  email: Yup.string().email("Ange en giltlig Email").required("Email kan inte vara tomt"),
  password: Yup.string().required("Lösenord kan inte vara tomt"),
});

const LoginUser = ({ close, register }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector((state) => state.userState);

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
                <InputContainer>
                  <Input label="Email" value={values.email} handleChange={handleChange("email")} />
                  {errors.email && <Text>{errors.email}</Text>}
                  <Input
                    label="Lösenord"
                    value={values.password}
                    handleChange={handleChange("password")}
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
                  />

                  {errors.password && <Text>{errors.password}</Text>}
                  {error && <ErrorTranslator error={error} register={register} />}
                </InputContainer>
                <ButtonContainer>
                  <View style={{ flex: 1 }}>
                    <Button mode={"text"} style={{ borderRadius: 0 }} onPress={handleSubmit} loading={pending} icon="plus-circle-outline">
                      Logga in
                    </Button>
                  </View>
                  <Divider style={{ width: 1, height: "100%" }} />
                  <View style={{ flex: 1 }}>
                    <Button mode={"text"} style={{ borderRadius: 0 }} onPress={close} icon="close-circle-outline">
                      Stäng
                    </Button>
                  </View>
                </ButtonContainer>
              </>
            );
          }}
        </Formik>
      </Main>
    </>
  );
};

export default LoginUser;

const Main = styled.View`
  flex: 1;
  padding: 10px;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
`;
