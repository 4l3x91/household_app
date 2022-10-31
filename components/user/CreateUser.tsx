import { Formik } from "formik";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { useYup } from "../../hooks/useYup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { postUser } from "../../store/user/userThunks";
import BottomButtons from "../common/BottomButtons";
import ErrorTranslator from "../common/ErrorTranslator";
import Input from "../common/Input";

interface Props {
  close: () => void;
}

const CreateUser = ({ close }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);
  const { userSchema } = useYup();

  return (
    <Container>
      <Formik
        validationSchema={userSchema}
        initialValues={{ email: "", password: "", passwordConfirmation: "" }}
        onSubmit={(values) => {
          dispatch(
            postUser({
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
                {userState.error && <ErrorTranslator error={userState.error} />}
              </InputContainer>
              <BottomButtons
                pending={userState.pending}
                leftOnPress={handleSubmit}
                rightOnPress={close}
                leftTitle="Registrera"
                rightTitle="Stäng"
                leftIcon="account-plus"
                rightIcon="close-circle-outline"
              />
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateUser;

const Container = styled.View`
  height: 100%;
`;

const ButtonContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;
