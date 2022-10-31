import { uuidv4 } from "@firebase/util";
import { Audio } from "expo-av";
import { Formik } from "formik";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useStorage } from "../../config/hooks/useStorage";
import { useUtils } from "../../config/hooks/useUtils";
import { useYup } from "../../config/hooks/useYup";
import { Chore } from "../../store/chore/choreModel";
import { postChore } from "../../store/chore/choreThunks";
import { selectHousehold } from "../../store/household/householdSelector";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AppModal from "../common/AppModal";
import Input from "../common/Input";
import SoundRecorder from "./SoundRecorder";
import ValuePicker from "./ValuePicker";

interface Props {
  closeModal: () => void;
}

const CreateChore = ({ closeModal }: Props) => {
  const [deviceRecordingUri, setDeviceRecordingUri] = useState<string>("");
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [deviceImageUri, setDeviceImageUri] = useState<string>("");
  const [interval, setInterval] = useState(1);
  const [energy, setEnergy] = useState(2);
  const [overlay, setOverlay] = useState(false);
  const [soundModalOpen, setSoundModalOpen] = useState(false);
  const { household } = useAppSelector(selectHousehold);
  const dispatch = useAppDispatch();
  const choreState = useAppSelector((state) => state.chores);
  const choreId = uuidv4();
  const { choreSchema } = useYup();
  const { pickImage } = useUtils();
  const { uploadAttatchments } = useStorage();

  const setDeviceImage = async () => {
    const img = await pickImage();
    setDeviceImageUri(img || "");
  };

  const handleSubmit = async (values: { name: string; description: string }) => {
    const attatchments = await uploadAttatchments(choreId, deviceImageUri, deviceRecordingUri);

    const newChore: Chore = {
      id: choreId,
      name: values.name,
      description: values.description,
      householdId: household.id,
      interval: interval,
      energy: energy,
      archived: false,
      dateCreated: new Date(),
      imgUrl: attatchments.firebaseImgUrl,
      soundUrl: attatchments.firebaseSoundUrl,
    };

    dispatch(postChore(newChore));
    closeModal();
  };

  return (
    <View>
      <Formik initialValues={{ name: "", description: "" }} validationSchema={choreSchema} onSubmit={(values) => handleSubmit(values)}>
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
                <AttatchmentContainer>
                  <Button onPress={setDeviceImage} icon={deviceImageUri ? "check-bold" : "image"}>
                    Lägg till bild
                  </Button>
                  <Button onPress={() => setSoundModalOpen(true)} icon={deviceRecordingUri ? "check-bold" : "volume-high"}>
                    Lägg till ljud
                  </Button>
                </AttatchmentContainer>
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
      <Modal animationType="slide" transparent={true} visible={soundModalOpen} statusBarTranslucent>
        <AppModal
          title="Lägg till ljud"
          closeModal={() => {
            setSoundModalOpen(false);
            setDeviceRecordingUri("");
          }}
          toggleOverlay={() => setOverlay((prev) => !prev)}
        >
          <SoundRecorder
            setDeviceRecordingUri={setDeviceRecordingUri}
            recording={recording}
            setRecording={setRecording}
            closeModal={() => setSoundModalOpen(false)}
          />
        </AppModal>
      </Modal>
    </View>
  );
};

export default CreateChore;

const AttatchmentContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonWrapper = styled.View`
  flex: 1;
`;

const ButtonContainer = styled(ButtonWrapper)`
  flex-direction: row;
`;

const ContentContainer = styled(Surface)`
  padding: 10px 20px;
  background-color: transparent;
  margin-bottom: 40px;
`;

const Container = styled.View`
  margin: 8px 0;
`;
