import {} from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { useYup } from "../../hooks/useYup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signInUser } from "../../store/user/userThunks";
import BottomButtons from "../common/BottomButtons";
import ErrorTranslator from "../common/ErrorTranslator";
import Input from "../common/Input";

interface Props {
  close: () => void;
  register: () => void;
}

const LoginUser = ({ close, register }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();
  const { loginSchema } = useYup();
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
          validationSchema={loginSchema}
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
