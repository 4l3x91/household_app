import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Surface } from "react-native-paper";
import { selectChore } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

const ChoreDetailsScreen = () => {
  const chore = useAppSelector(selectChore);
  const energyLevels = [2, 4, 6, 8, 10];
  return (
    <View style={styles.container}>
      <Surface elevation={0} style={styles.surface}>

        <View style={styles.subContainer}>
          <Surface elevation={0} style={[styles.surface, styles.textContainer]}>
            <Text variant="bodySmall">Syssla</Text>
            <Text variant="headlineLarge">{chore.chore.name}</Text>
          </Surface>
        </View>

        <View style={styles.subContainer}>
          <Surface elevation={0} style={[styles.surface, styles.textContainer]}>
            <Text variant="bodySmall">Beskrivning</Text>
            <Text variant="titleMedium">{chore.chore.description}</Text>
          </Surface>
        </View>

        <View style={styles.subContainer}>
          <Text variant="bodySmall">Energinivå</Text>
          <Surface style={[styles.surfaceRow, styles.surface]}>
            <Text variant="headlineLarge">😌</Text>
            {energyLevels.map((level) => (
              <Text
                key={level}
                variant={level === chore.chore.energy ? "headlineLarge" : "headlineMedium"}
                style={{ opacity: level === chore.chore.energy ? 1 : 0.5 }}>{level}
              </Text>
            ))}
            <Text variant="headlineLarge">🥵</Text>
          </Surface>
        </View>

      </Surface>
    </View>
  );
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
