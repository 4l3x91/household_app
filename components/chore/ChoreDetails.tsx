import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Button, Divider, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { Chore } from "../../store/chore/choreModel";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { postCompletedChore } from "../../store/completedChore/completedChoreThunks";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
  chore: Chore;
}

type ChoreDetailsScreenNavProp = NativeStackNavigationProp<ChoreStackParams, "ChoresScreen">;

const ChoreDetails = ({ chore }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const profile = useAppSelector(selectCurrentProfile);
  const navigation = useNavigation<ChoreDetailsScreenNavProp>();
  const dispatch = useAppDispatch();
  const completedChore = completedChores.find((completedChore) => completedChore.choreId === chore?.id && profile?.id === completedChore?.profileId);
  const { colors } = useTheme();
  const today = new Date().getDate();
  const energyLevels = [2, 4, 6, 8, 10];

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

  function handlePress() {
    if (chore?.id && profile?.id) {
      dispatch(postCompletedChore({ choreId: chore?.id, date: new Date(), profileId: profile?.id }));
      navigation.navigate("ChoresScreen");
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Text variant="bodySmall">Titel</Text>
        <Text variant="headlineLarge">{chore.name}</Text>
      </TitleContainer>

      <DetailsContainer>
        <DescriptionContainer>
          <Text variant="bodySmall">Beskrivning</Text>
          <Text variant="headlineSmall">{chore.description}</Text>
        </DescriptionContainer>
        <Divider bold style={{ marginHorizontal: 5 }} />

        <IntervalContainer>
          <Text variant="bodySmall">Intervall</Text>
          <IntervalContent>
            <Text variant="headlineSmall">Återkommer var</Text>

            <Interval elevation={1}>
              <Text variant="headlineSmall">{chore.interval}</Text>
            </Interval>

            <Text variant="headlineSmall">dag</Text>
          </IntervalContent>
        </IntervalContainer>

        <Divider bold style={{ marginHorizontal: 5 }} />
        <EnergyContainer>
          <Text variant="bodySmall">Energinivå</Text>
          <EnergyContent>
            {energyLevels.map((level) => (
              <Text
                key={level}
                variant={level === chore.energy ? "headlineLarge" : "headlineMedium"}
                style={{ opacity: level === chore.energy ? 1 : 0.5 }}
              >
                {level}
              </Text>
            ))}
          </EnergyContent>
        </EnergyContainer>
        <Divider bold style={{ marginHorizontal: 5 }} />

        {(chore.imgUrl || sound) && (
          <AttachmentsContainer>
            <Text variant="bodySmall">Bifogade filer</Text>
            <AttachmentsContent>
              {chore.imgUrl && <Image source={{ uri: chore.imgUrl }} style={{ width: 100, height: 100, borderRadius: 10, margin: 10 }} />}
              {sound && (
                <>
                  <PlayButton
                    onPress={() => sound.replayAsync()}
                    style={{ backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 10 }}
                  >
                    <FontAwesome5 name="volume-up" size={50} color={colors.surface} />
                  </PlayButton>
                </>
              )}
            </AttachmentsContent>
          </AttachmentsContainer>
        )}
      </DetailsContainer>

      <ButtonContainer>
        {!(completedChore && today === completedChore.date.getDate() && profile?.id === completedChore?.profileId) && (
          <Button onPress={handlePress} style={{ marginHorizontal: 20 }} mode="contained">
            Markera som klar
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default ChoreDetails;

const Container = styled.View`
  flex: 1;
`;

const TitleContainer = styled(Surface)`
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const DetailsContainer = styled(Surface)`
  margin: 5px 10px;
  border-radius: 10px;
`;

const DescriptionContainer = styled.View`
  padding: 10px;
`;

const AttachmentsContainer = styled.View`
  padding: 10px;
`;

const AttachmentsContent = styled.View`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
`;

const IntervalContainer = styled.View`
  padding: 10px;
`;

const IntervalContent = styled.View`
  flex-direction: row;
`;

const Interval = styled(Surface)`
  align-items: center;
  border-radius: 20px;
  padding: 0 10px;
  margin: 0 8px;
`;

const EnergyContainer = styled.View`
  padding: 10px;
`;

const EnergyContent = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin: 50px 20px 20px 20px;
`;

const PlayButton = styled.Pressable`
  width: 100px;
  height: 100px;
  margin: 10px;
`;
