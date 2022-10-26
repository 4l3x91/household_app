import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { selectChore } from "../../store/chore/choreSelectors";
import { useAppSelector } from "../../store/store";

type ChoreDetailsScreenRouteProp = RouteProp<ChoreStackParams, "ChoreDetailsScreen">;

const ChoreDetailsScreen = () => {
  const route = useRoute<ChoreDetailsScreenRouteProp>();
  const { id } = route.params;
  const chore = useAppSelector((state) => selectChore(state, id));

  if (chore) {
    const energyLevels = [2, 4, 6, 8, 10];
    return (
      <View style={styles.container}>
        <Surface elevation={0} style={styles.surface}>
          <View style={styles.subContainer}>
            <Surface elevation={0} style={[styles.surface, styles.textContainer]}>
              <Text variant="bodySmall">Syssla</Text>
              <Text variant="headlineLarge">{chore.name}</Text>
            </Surface>
          </View>

          <View style={styles.subContainer}>
            <Surface elevation={0} style={[styles.surface, styles.textContainer]}>
              <Text variant="bodySmall">Beskrivning</Text>
              <Text variant="titleMedium">{chore.description}</Text>
            </Surface>
          </View>

          <View style={styles.subContainer}>
            <Text variant="bodySmall">Energinivå</Text>
            <Surface style={[styles.surfaceRow, styles.surface]}>
              <Text variant="headlineLarge">😌</Text>
              {energyLevels.map((level) => (
                <Text
                  key={level}
                  variant={level === chore.energy ? "headlineLarge" : "headlineMedium"}
                  style={{ opacity: level === chore.energy ? 1 : 0.5 }}
                >
                  {level}
                </Text>
              ))}
              <Text variant="headlineLarge">🥵</Text>
            </Surface>
          </View>
        </Surface>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  subContainer: {
    minWidth: "90%",
    maxWidth: "90%",
    alignSelf: "center",
    marginVertical: 5,
  },
  surface: {
    backgroundColor: "transparent",
  },
  surfaceRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 10,
  },
});

export default ChoreDetailsScreen;
