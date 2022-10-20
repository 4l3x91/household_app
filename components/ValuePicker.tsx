import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Badge, Surface, Text, Theme, useTheme } from "react-native-paper";
import styled from "styled-components/native";

type Props = {
  value: number;
  min?: number;
  max: number;
  steps?: number;
  subLabel?: string;
  onChange?: (value: number) => void;
  label: string;
  unit?: string;
  showBadge?: boolean;
  badgeSize?: number;
};

const ValuePicker = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isDarkTheme: boolean = theme.dark;

  const values = () => {
    const condition = (i: number, max: number) => (!isDarkTheme ? i < max / 2 : i > max / 2);
    const styles = {
      opacity: (i: number) => (isDarkTheme ? i * -(0.8 / props.max) + 1 : i * (0.7 / props.max) + 0.3),
      color: (i: number) => (condition(i, props.max) ? theme.colors.primary : theme.colors.background),
    };
    const results: JSX.Element[] = [];
    for (let i = props.min || 0; i <= props.max; i += props.steps || 1) {
      if (props.steps) {
        props.steps != 1 && props.steps == i - 1 ? (i = props.steps) : i;
      }
      results.push(
        <Pressable
          style={{ marginHorizontal: 2 }}
          key={i}
          onPress={() => {
            props.onChange && props.onChange(i);
            setShowModal(false);
          }}
        >
          {props.showBadge ? (
            <>
              <Badge
                style={{
                  backgroundColor: theme.colors.primary,
                  opacity: styles.opacity(i),
                }}
                size={props.badgeSize || 35}
              ></Badge>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: styles.color(i) }}>{i}</Text>
              </View>
            </>
          ) : (
            <View style={{ alignItems: "center", minWidth: 50, maxWidth: 50, paddingHorizontal: 10, backgroundColor: "#00000014", borderRadius: 5 }}>
              <Text variant="headlineMedium">{i}</Text>
            </View>
          )}
        </Pressable>
      );
    }
    return results;
  };

  return (
    <Pressable onPress={() => setShowModal(true)}>
      <ValuePickerContainer>
        {!showModal ? (
          <ClosedModalContainer>
            <View>
              <Text variant="titleMedium">{props.label}:</Text>
              {props.subLabel && <Text variant="labelSmall">{props.subLabel}</Text>}
            </View>

            <ValueUnitContainer>
              <Badge style={{ backgroundColor: theme.colors.primary, margin: 5, alignSelf: "center" }} size={25}>
                {props.value}
              </Badge>

              {props.unit && <Text>{props.unit}</Text>}
            </ValueUnitContainer>
          </ClosedModalContainer>
        ) : (
          <OpenModalContainer>
            <ChoiseContainer horizontal={true} showsHorizontalScrollIndicator={false}>
              {values()}
            </ChoiseContainer>
          </OpenModalContainer>
        )}
      </ValuePickerContainer>
    </Pressable>
  );
};

export default ValuePicker;

const ChoiseContainer = styled.ScrollView`
  /* background-color: aqua; */
  flex-direction: row;
  min-width: 100%;
`;

const ValuePickerContainer = styled(Surface)`
  background-color: red;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
`;

const ClosedModalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const OpenModalContainer = styled.View`
  background-color: green;
  flex: 1;
  flex-direction: row;
`;

const ValueUnitContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

// const Label = styled(Text)`
//   font-size: 18px;
//   font-weight: 600;
// `;

// const SubLabel = styled.(Text)`
//   font-size: 10px;
// `;
