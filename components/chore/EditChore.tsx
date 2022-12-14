import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useStorage } from "../../hooks/useStorage";
import { useYup } from "../../hooks/useYup";
import { Chore } from "../../store/chore/choreModel";
import { updateChore } from "../../store/chore/choreThunks";
import { useAppDispatch } from "../../store/store";
import Input from "../common/Input";
import AttachmentEditor from "./AttachmentEditor";
import ValuePicker from "./ValuePicker";

interface Props {
  closeModal: () => void;
  chore: Chore;
}

const EditChore = ({ closeModal, chore }: Props) => {
  const [deviceImageUri, setDeviceImageUri] = useState<string>("");
  const [deviceRecordingUri, setDeviceRecordingUri] = useState<string>("");
  const [editImage, setEditImage] = useState<"add" | "update" | "delete" | "">("");
  const [editSound, setEditSound] = useState<"add" | "update" | "delete" | "">("");
  const [interval, setInterval] = useState(chore.interval);
  const [energy, setEnergy] = useState(chore.energy);
  const { colors } = useTheme();
  const { choreSchema } = useYup();
  const { checkAttachments } = useStorage();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Content>
        <Text style={{ fontSize: 30 }}>Redigera syssla</Text>
        <ModalContent elevation={0}>
          <Formik
            initialValues={{ name: chore.name, description: chore.description, energy: chore.energy, interval: chore.interval }}
            validationSchema={choreSchema}
            onSubmit={async (values) => {
              const attachments: { firebaseImgUrl: string; firebaseSoundUrl: string } = await checkAttachments(
                chore,
                editImage,
                deviceImageUri,
                editSound,
                deviceRecordingUri
              );

              dispatch(
                updateChore({
                  ...chore,
                  name: values.name,
                  description: values.description,
                  energy: energy,
                  interval: interval,
                  imgUrl: attachments.firebaseImgUrl,
                  soundUrl: attachments.firebaseSoundUrl,
                })
              );
            }}
          >
            {({ handleSubmit, values, handleChange, errors }) => {
              return (
                <View style={{ width: "100%" }}>
                  <ComponentContainer>
                    <Input label="Titel" value={values.name} handleChange={handleChange("name")} />
                    {errors.name && <Text style={{ color: colors.error }}>{errors.name}</Text>}
                  </ComponentContainer>

                  <ComponentContainer>
                    <Input label="Beskrivning" multiline value={values.description} numberOfLines={4} handleChange={handleChange("description")} />
                    {errors.description && <Text style={{ color: colors.error }}>{errors.description}</Text>}
                  </ComponentContainer>

                  <ComponentContainer>
                    <ValuePicker label="??terkommer" min={1} max={31} onChange={setInterval} value={interval} prefix="var" unit="dag" />
                  </ComponentContainer>
                  <ComponentContainer>
                    <ValuePicker
                      subLabel="Hur energikr??vande ??r sysslan?"
                      showBadge={true}
                      label="V??rde"
                      min={1}
                      max={10}
                      steps={1}
                      onChange={setEnergy}
                      value={energy}
                    />
                  </ComponentContainer>
                  <AttachmentEditor
                    chore={chore}
                    editImage={editImage}
                    editSound={editSound}
                    deviceRecordingUri={deviceRecordingUri}
                    setEditImage={setEditImage}
                    setDeviceImageUri={setDeviceImageUri}
                    setEditSound={setEditSound}
                    setDeviceRecordingUri={setDeviceRecordingUri}
                  />
                  <ComponentContainer>
                    <Button
                      onPress={() => {
                        handleSubmit();
                        closeModal();
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
      <Pressable onPress={() => closeModal()}>
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default EditChore;

const Container = styled.View`
  flex: 1;
  justify-content: center;
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
