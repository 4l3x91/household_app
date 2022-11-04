import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ChoreList from "../../components/chore/ChoreList";
import CreateChore from "../../components/chore/CreateChore";
import BottomButtons from "../../components/common/BottomButtons";
import HouseholdName from "../../components/household/HouseholdName";
import { getChores } from "../../store/chore/choreThunks";
import { getCompletedChoresPerHousehold } from "../../store/completedChore/completedChoreThunks";
import { selectAllHouseholdMembers, selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

const ChoresScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const household = useAppSelector((state) => state.household.household);
  const profile = useAppSelector(selectCurrentProfile);
  const allMembers = useAppSelector(selectAllHouseholdMembers);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if (household) {
      if (household.id) {
        dispatch(getChores(household.id));
        dispatch(getCompletedChoresPerHousehold(allMembers));
      }
    }
  }, [household]);

  return (
    <ChoreScreenContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              if (household) {
                dispatch(getChores(household.id));
                dispatch(getCompletedChoresPerHousehold(allMembers));
              }
              setRefresh(false);
            }}
          />
        }
      >
        <HouseholdName householdName={household.name} role={profile?.role} />
        <ChoreList editMode={editMode} />

        {profile && profile?.role === "owner" && (
          <>
            <ChoreList editMode={editMode} archived />
            <ChoreList editMode={editMode} asignedChores />
          </>
        )}

        <Portal>
          <Modalize ref={modalizeRef} modalStyle={{ backgroundColor: theme.colors.surface }} adjustToContentHeight={true}>
            <CreateChore closeModal={() => modalizeRef.current?.close()} />
          </Modalize>
        </Portal>
      </ScrollView>
      {profile && profile?.role === "owner" && (
        <BottomButtons
          leftIcon="plus-circle-outline"
          leftTitle="Lägg till"
          leftOnPress={openModalize}
          rightIcon="plus-circle-outline"
          rightTitle="Ändra"
          rightOnPress={() => setEditMode((prev) => !prev)}
          topDivider
        />
      )}
    </ChoreScreenContainer>
  );
};

export default ChoresScreen;

const ChoreScreenContainer = styled.View`
  flex: 1;
`;
