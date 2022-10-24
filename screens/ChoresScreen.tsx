import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Button, Divider, Portal, Theme, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import ChangeHouseholdName from "../components/ChangeHouseholdName";
import CreateChore from "../components/chore/CreateChore";
import ChoreItem from "../components/ChoreItem";
import { ChoreStackParams } from "../navigation/ChoreStackNavigator";
import { selectChores } from "../store/chore/choreSelectors";
import { setChoresThunk } from "../store/chore/choreSlice";
import { selectCurrentProfile } from "../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<ChoreStackParams>;

const ChoresScreen = ({ navigation }: Props) => {
  const [refresh, setRefresh] = useState(false);
  const [showTooltip, setShowToolTip] = useState(true);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const household = useAppSelector((state) => state.household.household);
  const chores = useAppSelector(selectChores);
  const profile = useAppSelector(selectCurrentProfile);
  const modalizeRef = useRef<Modalize>(null);
  const { colors } = useTheme();

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
        {profile?.role === "owner" ? (
          <TitleContainer>
            {showTooltip && (
              <Tooltip
                backgroundColor={colors.surfaceVariant}
                width={200}
                height={80}
                popover={<Text>Tryck på namnet för att byta namn.</Text>}
                actionType="press"
              >
                <CodeInnerContainer>
                  <AntDesign name="questioncircleo" size={15} color={colors.onSurface} />
                </CodeInnerContainer>
              </Tooltip>
            )}
            <ChangeHouseholdName setShowTooltip={setShowToolTip} showTooltip={showTooltip} />
          </TitleContainer>
        ) : (
          <TitleContainer>
            <DayViewTitle style={{ color: colors.primary }}>{household.name}</DayViewTitle>
          </TitleContainer>
        )}
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

const TitleContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;
  flex-direction: row;
`;
const CodeInnerContainer = styled.View`
  align-items: center;
`;

const DayViewTitle = styled.Text`
  align-items: center;
  font-size: 25px;
  padding: 0 30px;
`;
