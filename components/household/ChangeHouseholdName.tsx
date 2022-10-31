import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useYup } from "../../config/hooks/useYup";
import { updateHouseholdName } from "../../store/household/householdThunks";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Input from "../common/Input";

interface Props {
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  showTooltip: boolean;
}

const ChangeHouseholdName = ({ setShowTooltip, showTooltip }: Props) => {
  const [toggleForm, setToggleForm] = useState(false);
  const household = useAppSelector((state) => state.household.household);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectCurrentProfile);
  const { colors } = useTheme();
  const { householdSchema } = useYup();

  return (
    <>
      <Pressable
        onPress={() => {
          setToggleForm(true);
          setShowTooltip(false);
        }}
      >
        {!toggleForm && <DayViewTitle variant="headlineLarge">{household.name}</DayViewTitle>}
      </Pressable>
      {toggleForm && (
        <Formik
          initialValues={{ householdName: household.name }}
          validationSchema={householdSchema}
          onSubmit={(values) => {
            if (values.householdName && profile) {
              dispatch(updateHouseholdName({ newName: values.householdName, profile: profile }));
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <InputContainer>
                <View>
                  <Input label="Title" value={values.householdName} handleChange={handleChange("householdName")} width={200} />
                  {errors.householdName && <Text>{errors.householdName}</Text>}
                </View>
                <SubmitButton
                  onPress={() => {
                    handleSubmit();
                    setToggleForm(false);
                    setShowTooltip(true);
                  }}
                >
                  <MaterialIcons name="done" size={24} color={colors.primary} />
                </SubmitButton>
              </InputContainer>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default ChangeHouseholdName;

const DayViewTitle = styled(Text)`
  align-items: center;
  padding: 0 30px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const SubmitButton = styled.Pressable`
  margin-left: 10px;
`;
