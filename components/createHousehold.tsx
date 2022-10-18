import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { HouseholdModel } from "../store/household/householdModel";
import { createHouseholdThunk } from "../store/household/householdSlice";
import { useAppDispatch } from "../store/store";

const householdNameSchema = Yup.object().shape({
  householdName: Yup.string()
    .required("household name cant be empty")
    .min(2, "must contain atleast 2 characters")
    .matches(/^\S*$/, "household name cannot contain spaces"),
});

const CreateHousehold = () => {
  const dispatch = useAppDispatch();

  const generateHouseholdCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  return (
    // <View style={styles.container}>
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
          <View style={styles.container}>
            <Text>Create your household</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInputField}
                label="householdName"
                mode={"outlined"}
                activeOutlineColor={"blue"}
                outlineColor={"green"}
                value={values.householdName}
                onChangeText={handleChange("householdName")}
              />
              {errors.householdName && <Text>{errors.householdName}</Text>}
            </View>
            <Button style={styles.createBtn} icon="home" mode="contained" onPress={handleSubmit}>
              Skapa
            </Button>
          </View>
        );
      }}
    </Formik>
    // </View>
  );
};

export default CreateHousehold;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    padding: 10,
  },
  textInputField: {
    borderColor: "green",
  },
  createBtn: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
});
