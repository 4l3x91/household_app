import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { selectHousehold } from "../../store/household/householdSelector";
import { getHouseholdByCodeThunk } from "../../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const householdCodeSchema = Yup.object().shape({
  householdCode: Yup.string()
    .required("En hushållskod måste innehålla sex stycken tecken")
    .min(6, "En hushållskod måste innehålla sex stycken tecken")
    .matches(/^\S*$/, "En hushållskod kan inte innehålla mellanslag"),
});

const JoinHousehold = () => {
  const [text, setText] = useState<string>();
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const pinCodeLength = 6;

  function InputBoxes() {
    const inputBoxes = [];
    for (let i = 0; i < pinCodeLength; i++) {
      let filled = false;
      if (text && text[i]) filled = true;
      inputBoxes.push(
        <Surface elevation={0} key={i} style={[styles.surface, styles.inputBox, propsStyle(filled).filledText]}>
          <Text variant="headlineLarge">{text && text.toUpperCase()[i]}</Text>
        </Surface>
      );
    }
    return inputBoxes;
  }
  return (
    <Formik
      validationSchema={householdCodeSchema}
      initialValues={{
        householdCode: "",
      }}
      onSubmit={(values) => {
        if (values.householdCode) {
          dispatch(getHouseholdByCodeThunk(values.householdCode));
          if (household.household.code === values.householdCode) {
            console.log("Navigate me to profileCreation");
          }
        }
      }}
    >
      {({ handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Har du fått en hushållskod? Fyll i koden nedan</Text>
            <Surface style={styles.inputContainer}>
              <TextInput
                maxLength={pinCodeLength}
                mode="outlined"
                style={styles.input}
                value={text}
                onChangeText={(text) => {
                  setText(text);
                  values.householdCode = text;
                  console.log(values.householdCode);
                }}
                onSubmitEditing={() => handleSubmit()}
              />
              {InputBoxes()}
            </Surface>
            {errors.householdCode && <Text style={[styles.text, styles.errorText]}>{errors.householdCode}</Text>}
          </View>
        );
      }}
    </Formik>
  );
};

export default JoinHousehold;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  surface: {
    backgroundColor: "transparent",
  },
  inputContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: -8,
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
  },
  inputBox: {
    borderWidth: 1,
    minWidth: 50,
    minHeight: 70,
    borderRadius: 5,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
});

const propsStyle = (filled: boolean) =>
  StyleSheet.create({
    filledText: {
      opacity: filled ? 1 : 0.3,
    },
  });
