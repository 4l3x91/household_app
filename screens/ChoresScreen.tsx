import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Button, Divider, Portal, Theme, useTheme } from "react-native-paper";
import CreateChore from "../components/chore/CreateChore";
import ChoreItem from "../components/ChoreItem";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { setChoresThunk } from "../store/chore/choreSlice";
import { selectCurrentProfile } from "../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const [refresh, setRefresh] = React.useState(false);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const household = useAppSelector((state) => state.household.household);
  const chores = useAppSelector(selectChores);
  const profile = useAppSelector(selectCurrentProfile);
  const modalizeRef = useRef<Modalize>(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if (household) {
      if (household.id) dispatch(setChoresThunk(household.id));
    }
  }, [household]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              if (household) dispatch(setChoresThunk(household.id));
              console.log("refreshed");
              setRefresh(false);
            }}
          />
        }
      >
        {chores.chores.length !== 0 ? (
          chores.chores.map((chore) => (
            <Pressable key={chore.id} onPress={() => navigation.navigate("ChoreDetailsScreen", { id: chore.id, name: chore.name })}>
              <ChoreItem chore={chore} />
            </Pressable>
          ))
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: theme.colors.primary }}>Här var det tomt!</Text>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Modalize ref={modalizeRef} modalStyle={{ backgroundColor: theme.colors.surface }} adjustToContentHeight={true}>
          <CreateChore closeModal={() => modalizeRef.current?.close()} />
        </Modalize>
      </Portal>
      {profile && profile.role === "owner" && (
        <>
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
        </>
      )}
    </View>
  );
};

export default gestureHandlerRootHOC(ChoresScreen);
