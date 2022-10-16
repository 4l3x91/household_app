import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { getTheme } from "../theme";

type Props = NativeStackScreenProps<RootStackParams>;

const WelcomeScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  console.log(getTheme(theme).dark);

  //TEST FUNCTION TO ADD DOCUMENT TO A COLLECTION WITH FIREBASE
  // async function postData() {
  //   await addDoc(collection(db, "testCollection"), { test: "test" });
  // }

  return (
    <View style={styles.container}>
      <Surface elevation={0} style={styles.surface}>
        {/* <Button onPress={() => postData()}>Test Firebase</Button> BUTTON TO TEST postDataFUNCTION! */}
        <Button
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
          icon="login"
          mode="contained"
          onPress={() => navigation.replace("TabStack")}
        >
          Logga in
        </Button>
        <Surface style={[styles.dividerContainer, styles.surface]}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>eller</Text>
          <View style={styles.dividerLine} />
        </Surface>
        <Button
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
          icon="account-plus"
          mode="outlined"
          onPress={() => navigation.replace("TabStack")}
        >
          Skapa nytt konto
        </Button>
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
  surface: {
    backgroundColor: "transparent",
  },
  dividerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  dividerText: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  dividerLine: {
    backgroundColor: "#6d6d6def",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  button: {
    flexDirection: "row-reverse",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 15,
  },
});

export default WelcomeScreen;
