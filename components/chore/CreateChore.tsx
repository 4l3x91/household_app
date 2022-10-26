import { uuidv4 } from "@firebase/util";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { Chore } from "../../store/chore/choreModel";
import { postChore } from "../../store/chore/choreThunks";
import { selectHousehold } from "../../store/household/householdSelector";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Input from "../common/Input";
import ValuePicker from "./ValuePicker";
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
}

const CreateChore = ({ closeModal }: Props) => {
  const [interval, setInterval] = useState(1);
  const [energy, setEnergy] = useState(2);
  const { household } = useAppSelector(selectHousehold);
  const dispatch = useAppDispatch();
  const choreState = useAppSelector((state) => state.chores);

  const handleSubmit = (values: { name: string; description: string }) => {
    const newChore: Chore = {
      id: uuidv4(),
      name: values.name,
      description: values.description,
      householdId: household.id,
      interval: interval,
      energy: energy,
    };
    dispatch(postChore(newChore));
    closeModal();
  };

  return (
    <View>
      <Formik initialValues={{ name: "", description: "" }} validationSchema={validation} onSubmit={(values) => handleSubmit(values)}>
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View>
              <Text style={{ padding: 20 }} variant="headlineMedium">
                Skapa en ny syssla
              </Text>
              <Divider style={{ height: 1, width: "100%" }} />
              <ContentContainer elevation={0}>
                <Container>
                  <Input label="Titel" value={values.name} handleChange={handleChange("name")} />
                  {errors.name && <Text>{errors.name}</Text>}
                </Container>

                <Container>
                  <Input label="Beskrivning" multiline value={values.description} numberOfLines={4} handleChange={handleChange("description")} />
                  {errors.description && <Text>{errors.description}</Text>}
                </Container>

                <Container>
                  <ValuePicker label="Återkommer" min={1} max={31} onChange={setInterval} value={interval} prefix="var" unit="dag" />
                </Container>
                <Container>
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
                </Container>
              </ContentContainer>
              <Divider style={{ height: 1, width: "100%" }} />
              <ButtonContainer>
                <ButtonWrapper>
                  <Button style={{ padding: 15 }} mode={"text"} onPress={handleSubmit} loading={choreState.pending} icon="plus-circle-outline">
                    Spara
                  </Button>
                </ButtonWrapper>
                <Divider style={{ width: 1, height: "100%" }} />
                <ButtonWrapper>
                  <Button style={{ padding: 15 }} mode={"text"} onPress={closeModal} icon="close-circle-outline">
                    Stäng
                  </Button>
                </ButtonWrapper>
              </ButtonContainer>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateChore;

const ButtonWrapper = styled.View`
  flex: 1;
`;

const ButtonContainer = styled(ButtonWrapper)`
  flex-direction: row;
`;

const ContentContainer = styled(Surface)`
  padding: 10px 20px;
  background-color: transparent;
  margin-bottom: 80px;
`;

const Container = styled.View`
  margin: 8px 0;
`;
