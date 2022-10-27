import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { selectChore } from "../../store/chore/choreSelectors";
import { selectCompletedChores } from "../../store/completedChore/completedChoreSelector";
import { postCompletedChore } from "../../store/completedChore/completedChoreThunks";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

type ChoreDetailsScreenRouteProp = RouteProp<ChoreStackParams, "ChoreDetailsScreen">;

const ChoreDetailsScreen = () => {
  const route = useRoute<ChoreDetailsScreenRouteProp>();
  const { id } = route.params;
  const chore = useAppSelector((state) => selectChore(state, id));
  const profile = useAppSelector(selectCurrentProfile);
  const completedChores = useAppSelector(selectCompletedChores).completedChores;
  const dispatch = useAppDispatch();
  const completedChore = completedChores.find((completedChore) => completedChore.choreId === chore?.id);
  const today = new Date().getDate();
  const width = Dimensions.get("screen").width - 40;

  function handlePress() {
    if (chore?.id && profile?.id) {
      dispatch(postCompletedChore({ choreId: chore?.id, date: new Date(), profileId: profile?.id }));
    }
  }

  if (chore) {
    const energyLevels = [2, 4, 6, 8, 10];
    return (
      <Container>
        <OuterSurface elevation={3} width={width}>
          <TitleContainer>
            <Surface elevation={0}>
              <Text variant="headlineLarge">{chore.name}</Text>
            </Surface>
          </TitleContainer>

          <DescriptionContainer>
            <Surface elevation={0}>
              <Text variant="bodySmall">Beskrivning</Text>
              <Text variant="headlineSmall">{chore.description}</Text>
            </Surface>
          </DescriptionContainer>

          <EnergyOuterContainer>
            <Text variant="bodySmall">Energinivå</Text>
            <EnergyInnerContainer elevation={2}>
              {energyLevels.map((level) => (
                <Text
                  key={level}
                  variant={level === chore.energy ? "headlineLarge" : "headlineMedium"}
                  style={{ opacity: level === chore.energy ? 1 : 0.5 }}
                >
                  {level}
                </Text>
              ))}
            </EnergyInnerContainer>
          </EnergyOuterContainer>

          <IntervalOuterContainer>
            <Text variant="bodySmall">Intervall</Text>
            <IntervalInnerContainer>
              <Text variant="headlineSmall">
                Återkommer var{"  "}
                <Interval elevation={2}>
                  <Text variant="headlineSmall">{chore.interval}</Text>
                </Interval>
                {"  "}dag
              </Text>
            </IntervalInnerContainer>
          </IntervalOuterContainer>
          <ButtonContainer>
            {!(completedChore && today === completedChore.date.getDate() && profile?.id === completedChore?.profileId) && (
              <Button onPress={handlePress} style={{ marginHorizontal: 20 }} mode="contained">
                Markera som klar
              </Button>
            )}
          </ButtonContainer>
        </OuterSurface>
      </Container>
    );
  } else {
    return null;
  }
};

export default ChoreDetailsScreen;

const Container = styled.View`
  align-items: center;
  margin: 20px;
`;
const OuterSurface = styled(Surface)<{ width: number }>`
  margin: 0 20px;
  flex: 1;
  border-radius: 20px;
  width: ${(props) => props.width}px;
`;

const TitleContainer = styled.View`
  margin: 20px 20px 0 20px;
  align-items: center;
`;
const DescriptionContainer = styled.View`
  margin: 20px;
`;

const EnergyOuterContainer = styled.View`
  margin: 20px;
`;
const EnergyInnerContainer = styled(Surface)`
  flex-direction: row;
  margin-top: 10px;
  padding: 10px;
  border-radius: 15px;
  justify-content: space-between;
  align-items: center;
`;
const Interval = styled(Surface)`
  align-items: center;
  border-radius: 20px;
  padding: 0 10px;
`;
const IntervalOuterContainer = styled.View`
  margin: 20px;
`;

const IntervalInnerContainer = styled.View`
  justify-content: center;
`;

const ButtonContainer = styled.View`
  margin: 0 20px;
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
