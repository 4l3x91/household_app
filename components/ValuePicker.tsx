import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Badge, Surface, useTheme } from "react-native-paper";
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
  const { colors } = useTheme();

  const values = () => {
    const results: JSX.Element[] = [];
    for (let i = props.min || 0; i <= props.max; i += props.steps || 1) {
      if (props.steps) {
        props.steps != 1 && props.steps == i - 1 ? (i = props.steps) : i;
      }
      results.push(
        <Pressable
          style={{ marginHorizontal: 5 }}
          key={i}
          onPress={() => {
            props.onChange && props.onChange(i);
            setShowModal(false);
          }}
        >
          {props.showBadge ? (
            <Badge style={{ backgroundColor: colors.primary }} size={props.badgeSize || 35}>
              {i}
            </Badge>
          ) : (
            <Text>{i}</Text>
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
              <Label>{props.label}:</Label>
              {props.subLabel && <SubLabel>{props.subLabel}</SubLabel>}
            </View>

            <ValueUnitContainer>
              <Badge style={{ backgroundColor: colors.primary, margin: 5, alignSelf: "center" }} size={25}>
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
  flex-direction: row;
  min-width: 100%;
`;

const ValuePickerContainer = styled(Surface)`
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
  flex: 1;
  flex-direction: row;
`;

const ValueUnitContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const SubLabel = styled.Text`
  font-size: 10px;
`;
