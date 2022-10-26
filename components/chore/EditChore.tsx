import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, overlay, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { updateChore } from "../../store/chore/choreThunks";
import { useAppDispatch } from "../../store/store";
import { createOrEditChoreSchema } from "../../utils/yupSchemas";
import Input from "../common/Input";
import ValuePicker from "./ValuePicker";

interface Props {
  closeModal: () => void;
  chore: Chore;
  toggleOverlay: () => void;
}

const EditChore = ({ closeModal, chore, toggleOverlay }: Props) => {
  const [interval, setInterval] = useState(chore.interval);
  const [energy, setEnergy] = useState(chore.energy);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Container overlay={overlay}>
      <Content>
        <Text style={{ fontSize: 30 }}>Redigera syssla</Text>
        <ModalContent elevation={0}>
          <Formik
            initialValues={{ name: chore.name, description: chore.description, energy: chore.energy, interval: chore.interval }}
            validationSchema={createOrEditChoreSchema}
            onSubmit={(values) => {
              dispatch(updateChore({ ...chore, name: values.name, description: values.description, energy: energy, interval: interval }));
            }}
          >
            {({ handleSubmit, values, handleChange, errors }) => {
              return (
                <View style={{ width: "100%" }}>
                  <ComponentContainer>
                    <Input label="Titel" value={values.name} handleChange={handleChange("name")} />
                    {errors.name && <Text>{errors.name}</Text>}
                  </ComponentContainer>

                  <ComponentContainer>
                    <Input label="Beskrivning" value={values.description} numberOfLines={4} handleChange={handleChange("description")} />
                    {errors.description && <Text>{errors.description}</Text>}
                  </ComponentContainer>

                  <ComponentContainer>
                    <ValuePicker label="Återkommer" min={1} max={31} onChange={setInterval} value={interval} prefix="var" unit="dag" />
                  </ComponentContainer>
                  <ComponentContainer>
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
                  </ComponentContainer>
                  <ComponentContainer>
                    <Button
                      onPress={() => {
                        handleSubmit();
                        closeModal();
                        toggleOverlay();
                      }}
                      mode="outlined"
                    >
                      Spara
                    </Button>
                  </ComponentContainer>
                </View>
              );
            }}
          </Formik>
        </ModalContent>
      </Content>
      <Pressable
        onPress={() => {
          toggleOverlay();
          closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default EditChore;

const Container = styled.View<{ overlay: boolean }>`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => (props.overlay ? "rgba(0,0,0,0.5)" : undefined)};
  align-items: center;
`;

const Content = styled(Surface)`
  margin: 20px;
  padding: 20px 0;
  border-radius: 20px;
  align-items: center;
`;
const ModalContent = styled(Surface)`
  flex-direction: row;
  padding: 20px;
  margin-top: 10px;
`;
const ComponentContainer = styled.View`
  margin: 8px 0;
`;
