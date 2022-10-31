import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";

import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useUtils } from "../../hooks/useUtils";
import { Chore } from "../../store/chore/choreModel";
import AppModal from "../common/AppModal";
import SoundRecorder from "./SoundRecorder";

interface Props {
  chore: Chore;
  editImage: string;
  editSound: string;
  deviceRecordingUri: string;
  setEditSound: React.Dispatch<React.SetStateAction<"" | "delete" | "update" | "add">>;
  setEditImage: React.Dispatch<React.SetStateAction<"" | "delete" | "update" | "add">>;
  setDeviceImageUri: React.Dispatch<React.SetStateAction<string>>;
  setDeviceRecordingUri: React.Dispatch<React.SetStateAction<string>>;
}

const AttachmentEditor = ({
  chore,
  editImage,
  editSound,
  deviceRecordingUri,
  setEditImage,
  setDeviceImageUri,
  setDeviceRecordingUri,
  setEditSound,
}: Props) => {
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [sound, setSound] = useState<Audio.Sound>();
  const { colors } = useTheme();
  const [soundModalOpen, setSoundModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const { pickImage } = useUtils();

  const setDeviceImage = async () => {
    const img = await pickImage();
    setDeviceImageUri(img || "");
  };

  useEffect(() => {
    if (chore?.soundUrl) {
      const loadSound = async () => {
        const loadedSound = new Audio.Sound();
        await loadedSound.loadAsync({
          uri: chore.soundUrl,
        });
        setSound(loadedSound);
      };
      loadSound();
    }
  }, []);

  return (
    <AttachmentsContent>
      {chore.imgUrl ? (
        <ImageContainer>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AttachedImage source={{ uri: chore.imgUrl }} willBeChanged={editImage !== ""} />
            {editImage === "delete" && <FontAwesome5 name="trash-alt" size={40} color={colors.error} style={{ position: "absolute" }} />}
            {editImage === "update" && <FontAwesome5 name="edit" size={40} color={colors.secondary} style={{ position: "absolute" }} />}
          </View>
          <AttachmentButtons>
            <FontAwesome5 name="trash-alt" size={24} color={colors.primary} onPress={() => setEditImage(editImage !== "delete" ? "delete" : "")} />
            <FontAwesome5
              name="edit"
              size={24}
              color={colors.primary}
              onPress={() => {
                setDeviceImage();
                setEditImage("update");
              }}
            />
          </AttachmentButtons>
        </ImageContainer>
      ) : (
        <Button
          onPress={() => {
            setDeviceImage();
            setEditImage("add");
          }}
          icon={editImage === "add" ? "check" : ""}
        >
          Lägg till bild
        </Button>
      )}
      {sound ? (
        <ImageContainer>
          <SoundButton onPress={() => sound.replayAsync()} style={{ backgroundColor: editSound === "" ? colors.primary : colors.secondary }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <SoundIcon willBeChanged={editSound !== ""}>
                <FontAwesome5 name="volume-up" size={40} color={colors.surface} />
                {editSound === "delete" && <FontAwesome5 name="trash-alt" size={40} color={colors.error} style={{ position: "absolute" }} />}
                {editSound === "update" && <FontAwesome5 name="edit" size={40} color={colors.primary} style={{ position: "absolute" }} />}
              </SoundIcon>
            </View>
          </SoundButton>
          <AttachmentButtons>
            <FontAwesome5 name="trash-alt" size={24} color={colors.primary} onPress={() => setEditSound(editSound !== "delete" ? "delete" : "")} />
            <FontAwesome5
              name="edit"
              size={24}
              color={colors.primary}
              onPress={() => {
                setSoundModalOpen(true);
                setEditSound("update");
              }}
            />
          </AttachmentButtons>
        </ImageContainer>
      ) : (
        <Button
          onPress={() => {
            setSoundModalOpen(true);
            setEditSound("add");
          }}
          icon={deviceRecordingUri === "" ? "" : "check"}
        >
          Lägg till ljud
        </Button>
      )}
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
    </AttachmentsContent>
  );
};

export default AttachmentEditor;

const AttachedImage = styled.Image<{ willBeChanged: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin: 10px 10px 5px 10px;
  ${({ willBeChanged }) => willBeChanged && "opacity: .5"}
`;

const AttachmentsContent = styled.View`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const AttachmentButtons = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ImageContainer = styled(Surface)`
  border-radius: 10px;
  padding-bottom: 10px;
  margin: 0 10px;
`;

const SoundButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 70px;
  height: 70px;
  margin: 10px 10px 5px 10px;
`;

const SoundIcon = styled.View<{ willBeChanged: boolean }>``;
