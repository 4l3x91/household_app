import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Button, Divider, Portal, Text, useTheme } from "react-native-paper";
import CreateChore from "../components/chore/CreateChore";
import ChoreItem from "../components/ChoreItem";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const chores = useAppSelector(selectChores);
  const modalizeRef = useRef<Modalize>(null);
  const theme = useTheme();
  const openModalize = () => {
    modalizeRef.current?.open();
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>ChoresScreen</Text>
      <ScrollView>
        {chores.chores.map((chore) => (
          <Pressable key={chore.id} onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id })}>
            <ChoreItem chore={chore} />
          </Pressable>
        ))}
      </ScrollView>
      <Portal>
        <Modalize ref={modalizeRef} modalStyle={{ backgroundColor: theme.colors.surface }} adjustToContentHeight={true}>
          <CreateChore closeModal={() => modalizeRef.current?.close()} />
        </Modalize>
      </Portal>
      <Divider style={{ height: 1 }} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 1 }}>
          <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={openModalize}>
            Lägg till
          </Button>
        </View>
        <Divider style={{ width: 1, height: "auto" }} />
        <View style={{ flex: 1 }}>
          <Button style={{ padding: 15 }} mode={"text"} icon="plus-circle-outline" onPress={() => console.log("Ändra logik goes here")}>
            Ändra
          </Button>
        </View>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(ChoresScreen);
