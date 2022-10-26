import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { Chore } from "../../store/chore/choreModel";
import { useAppDispatch } from "../../store/store";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Titel måste vara minst två tecken")
    .max(20, "Titel kan inte vara längre än 20 tecken")
    .required("Titel kan inte vara tom"),
  description: Yup.string()
    .min(10, "Beskrivning måste vara minst 10 tecken")
    .max(100, "Beskrivning kan inte vara längre än 100 tecken")
    .required("Beskrivning kan inte vara tom"),
});

interface Props {
  closeModal: () => void;
  chore: Chore;
}

const editChore = ({ closeModal, chore }: Props) => {
  const [overlay, setOverlay] = useState(false);
  const [interval, setInterval] = useState(1);
  const [energy, setEnergy] = useState(2);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  // const chores = useAppSelector(selectChores);
  return (
    <Container>
      {/* <Formik
        initialValues={{ name: chore.name, description: chore.description, energy: chore.energy, interval: chore.interval }}
        validationSchema={validation}
        onSubmit={(values) => {
          dispatch(
            updateChoreThunk({ ...chore, name: values.name, description: values.description, energy: values.energy, interval: values.interval })
          );
        }}
      >
        {({ handleSubmit, values, handleChange, errors }) => {
          return (
            <View style={{ flex: 1 }}>
              <View>
                <Input label="Titel" value={values.name} handleChange={handleChange("name")} />
                {errors.name && <Text>{errors.name}</Text>}
              </View>
              <View>
                <Input label="Beskrivning" multiline value={values.description} numberOfLines={4} handleChange={handleChange("description")} />
                {errors.description && <Text>{errors.description}</Text>}
              </View>
              <View>
                <ValuePicker label="Återkommer" min={1} max={31} onChange={setInterval} value={interval} prefix="var" unit="dag" />
              </View>
              <View>
                <ValuePicker
                  subLabel="Hur energikrävande är sysslan?"
                  showBadge={true}
                  label="Värde"
                  min={1}
                  max={10}
                  steps={1}
                  onChange={setEnergy}
                  value={energy}
                />
              </View>
            </View>
          );
        }}
      </Formik> */}
      <Text>{chore.name}</Text>
      <Pressable
        style={{ marginTop: 50 }}
        onPress={() => {
          setOverlay(false);
          closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default editChore;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Modal = styled(Surface)`
  margin-top: 100px;
`;
