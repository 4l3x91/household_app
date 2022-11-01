import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { Theme } from "../../theme";

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
  prefix?: string;
};

const ValuePicker = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isDarkTheme: boolean = theme.dark;

  const values = () => {
    const condition = (i: number, max: number) => (!isDarkTheme ? i < max / 2 : i > max / 2);
    const styles = {
      opacity: (i: number) => (isDarkTheme ? i * -(0.7 / props.max) + 0.8 : i * (0.7 / props.max) + 0.3),
      color: (i: number) => (condition(i, props.max) ? theme.colors.primary : theme.colors.background),
    };
    const results: JSX.Element[] = [];
    for (let i = props.min || 0; i <= props.max; i += props.steps || 1) {
      if (props.steps) {
        props.steps != 1 && props.steps == i - 1 ? (i = props.steps) : i;
      }
      results.push(
        <Pressable
          style={{ marginHorizontal: props.showBadge ? 5 : 2, justifyContent: "center" }}
          key={i}
          onPress={() => {
            props.onChange && props.onChange(i);
            setShowModal(false);
          }}
        >
          {props.showBadge ? (
            <View>
              <Badge
                style={{
                  backgroundColor: theme.colors.primary,
                  opacity: styles.opacity(i),
                }}
                size={props.badgeSize || 35}
              ></Badge>

              <BadgeValueContainer>
                <Text variant="headlineSmall" style={{ color: styles.color(i) }}>
                  {i}
                </Text>
              </BadgeValueContainer>
            </View>
          ) : (
            <TextValueContainer>
              <Text variant="headlineSmall">{i}</Text>
            </TextValueContainer>
          )}
        </Pressable>
      );
    }
    return results;
  };

  return (
    <Pressable onPress={() => setShowModal(true)}>
      <ValuePickerContainer badgeSize={props.badgeSize || 35}>
        {!showModal ? (
          <ClosedModalContainer>
            <LabelContainer>
              <Text variant="titleLarge">{props.label}:</Text>
              {props.subLabel && <Text variant="labelSmall">{props.subLabel}</Text>}
            </LabelContainer>

            <ValueUnitContainer>
              {props.prefix && <Text variant="titleLarge"> {props.prefix}</Text>}
              <Badge style={{ backgroundColor: theme.colors.primary, margin: 5, alignSelf: "center" }} size={30}>
                {props.value}
              </Badge>
              {props.unit && <Text variant="titleLarge">{props.unit}</Text>}
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

const ValuePickerContainer = styled(Surface)<{ badgeSize: number }>`
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
  min-height: ${({ badgeSize }) => badgeSize + 30}px;
`;

const ClosedModalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
`;

const LabelContainer = styled.View`
  justify-content: center;
`;

const OpenModalContainer = styled.View`
  padding: 10px 0;
  flex-direction: row;
`;

const BadgeValueContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const TextValueContainer = styled.View`
  align-items: center;
  align-content: center;
  min-width: 55px;
  max-width: 70px;
  padding: 0 10px;
  background-color: #00000032;
  border-radius: 5px;
`;

const ChoiseContainer = styled.ScrollView`
  flex-direction: row;
`;

const ValueUnitContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;
