import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/user/userSlice";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required("Enter a valid E-mail"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const CreateUser = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  //   const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log("create user");
  return (
    <>
      <Formik
        validationSchema={userSchema}
        initialValues={{ email: "", password: "", passwordConfirmation: "" }}
        onSubmit={(values) => {
          dispatch(
            setUser({
              id: uuid.v4() as string,
              email: values.email,
              password: values.password,
            })
          );
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <>
              <TextInput label="email" value={values.email} error onChangeText={handleChange("email")} />
              {errors.email && <Text>{errors.email}</Text>}
              <TextInput
                label="password"
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
                error
                onChangeText={handleChange("password")}
              />
              {errors.password && <Text>{errors.password}</Text>}
              <TextInput
                label="confirm password"
                secureTextEntry={secureTextEntry}
                value={values.passwordConfirmation}
                error
                onChangeText={handleChange("passwordConfirmation")}
              />
              {errors.passwordConfirmation && <Text>{errors.passwordConfirmation}</Text>}
              <Button onPress={handleSubmit}>Submit </Button>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateUser;
