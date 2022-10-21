import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ErrorTranslator from "../ErrorTranslator";
import Input from "../Input";
import ValuePicker from "../ValuePicker";

const validation = Yup.object().shape({
  title: Yup.string().required("Titel kan inte vara tom"),
  description: Yup.string().required("Beskrivning kan inte vara tom"),
});

interface Props {
  closeModal: () => void;
}

const CreateChore = ({ closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector((state) => state.userState);

  return (
    <View>
      <Formik initialValues={{ title: "", description: "" }} validationSchema={validation} onSubmit={(values) => console.log("Add chore")}>
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View>
              <Text style={{ padding: 20 }} variant="headlineMedium">
                Skapa en ny syssla
              </Text>
              <Divider style={{ height: 1, width: "100%" }} />
              <ContentContainer elevation={0}>
                <Container>
                  <Input label="Titel" value={values.title} handleChange={handleChange("title")} />
                  {errors.title && <Text>{errors.title}</Text>}
                </Container>

                <Container>
                  <Input label="Beskrivning" multiline={true} value={values.description} handleChange={handleChange("description")} />
                  {errors.description && <Text>{errors.description}</Text>}
                  {error && <ErrorTranslator error={error} />}
                </Container>

                <Container>
                  <ValuePicker showBadge={true} label="Återkommer" max={10} value={10} prefix="var" unit="dag" />
                </Container>
                <Container>
                  <ValuePicker subLabel="Hur energikrävande är sysslan?" showBadge={false} label="Värde" max={10} value={10} />
                </Container>
              </ContentContainer>
              <Divider style={{ height: 1, width: "100%" }} />
              <ButtonContainer>
                <ButtonWrapper>
                  <Button style={{ padding: 15 }} mode={"text"} onPress={handleSubmit} loading={pending} icon="plus-circle-outline">
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
