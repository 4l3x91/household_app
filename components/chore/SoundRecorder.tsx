import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

interface Props {
  setDeviceRecordingUri: React.Dispatch<React.SetStateAction<string>>;
  recording: Audio.Recording | undefined;
  setRecording: React.Dispatch<React.SetStateAction<Audio.Recording | undefined>>;
  closeModal: () => void;
}

export default function SoundRecorder({ setDeviceRecordingUri, recording, setRecording, closeModal }: Props) {
  const [playback, setPlayback] = useState<{ sound: Audio.Sound; duration: string } | undefined>();
  const { colors } = useTheme();

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    if (recording) {
      await recording.stopAndUnloadAsync();

      const { sound, status } = await recording.createNewLoadedSoundAsync();
      if (status.isLoaded) {
        const duration = getDurationFormatted(status.durationMillis);
        setPlayback({ sound: sound, duration: duration });
      }

      const uri = recording.getURI();
      setDeviceRecordingUri(uri || "");
    }
  }

  function getDurationFormatted(millis: any) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutesDisplay}:${secondsDisplay}`;
  }

  return (
    <>
      <Text>Spela in ett ljudklipp till din syssla.</Text>
      {playback ? (
        <Surface
          style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 20, marginVertical: 20, borderRadius: 20 }}
        >
          <FontAwesome5 name="play" size={24} color={colors.primary} onPress={() => playback.sound.replayAsync()} />
          <View style={{ marginHorizontal: 20 }}>
            <Text variant="bodyLarge">Inspelning - {playback.duration}</Text>
          </View>
          <FontAwesome5 name="trash-alt" size={24} color={colors.primary} onPress={() => setPlayback(undefined)} />
          <FontAwesome5 name="check" size={24} color={colors.primary} onPress={closeModal} style={{ marginLeft: 10 }} />
        </Surface>
      ) : (
        <Button mode="contained" onPress={recording ? stopRecording : startRecording} style={{ marginTop: 10 }} icon={recording && "record-rec"}>
          {recording ? "Stoppa inspelning" : "Starta inspelning"}
        </Button>
      )}
    </>
  );
}
