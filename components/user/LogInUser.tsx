import {} from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signInUser } from "../../store/user/userSlice";
import BottomButtons from "../BottomButtons";
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
  const { error } = useAppSelector((state) => state.userState);
  const userPending = useAppSelector((state) => state.userState).pending;
  const profilePending = useAppSelector((state) => state.profile).pending;
  const householdPending = useAppSelector((state) => state.household).pending;

  const pending = userPending || profilePending || householdPending;

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
                <BottomButtons
                  pending={pending}
                  handleSubmit={handleSubmit}
                  close={close}
                  leftTitle="Logga in"
                  rightTitle="Stäng"
                  leftIcon="login"
                  rightIcon="close-circle-outline"
                />
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
