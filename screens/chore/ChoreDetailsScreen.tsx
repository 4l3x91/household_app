import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React from "react";
import { Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

import ChoreDetails from "../../components/chore/ChoreDetails";
import { ChoreStackParams } from "../../navigation/ChoreStackNavigator";
import { selectChore } from "../../store/chore/choreSelectors";
import { useAppSelector } from "../../store/store";

type ChoreDetailsScreenRouteProp = RouteProp<ChoreStackParams, "ChoreDetailsScreen">;

type ChoreDetailsScreenNavProp = NativeStackNavigationProp<ChoreStackParams, "ChoresScreen">;

const ChoreDetailsScreen = () => {
  const route = useRoute<ChoreDetailsScreenRouteProp>();
  const navigation = useNavigation<ChoreDetailsScreenNavProp>();
  const { id } = route.params;
  const chore = useAppSelector((state) => selectChore(state, id));
  const { colors } = useTheme();

  if (chore) {
    return (
      <>
        <HeaderContainer>
          <Pressable onPress={() => navigation.goBack()} style={{ marginTop: Constants.statusBarHeight, padding: 10, marginHorizontal: 10 }}>
            <Ionicons name="arrow-back-circle-outline" size={50} color={colors.primary} />
          </Pressable>
          <Text
            style={{
              flex: 1,
              alignSelf: "center",
              marginTop: Constants.statusBarHeight,
            }}
            variant="headlineMedium"
          >
            Detaljer
          </Text>
        </HeaderContainer>
        <ChoreDetails chore={chore} />
      </>
    );
  } else {
    return null;
  }
};

export default ChoreDetailsScreen;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
