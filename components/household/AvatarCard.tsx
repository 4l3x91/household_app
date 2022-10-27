import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { Profile } from "../../store/profile/profileModel";

interface Props {
  profile: Profile;
  size?: number;
}

const AvatarCard = ({ profile, size }: Props) => {
  const { colors } = useTheme();
  return (
    <Container color={profile.avatar.color} size={size}>
      <Avatar size={size}>{profile.avatar.avatar}</Avatar>

      {profile.role === "owner" && (
        <Owner background={profile.avatar.color} borderColor={colors.primaryContainer}>
          <Tooltip
            backgroundColor={colors.surfaceVariant}
            width={200}
            height={60}
            popover={<Text>Du är ägare i det här hushållet</Text>}
            actionType="press"
          >
            <FontAwesome5 name="crown" size={8} color="yellow" />
          </Tooltip>
        </Owner>
      )}
      {profile.isPaused && (
        <Paused background={profile.avatar.color} borderColor={colors.primaryContainer}>
          <Tooltip
            backgroundColor={colors.surfaceVariant}
            width={200}
            height={60}
            popover={<Text>Du är ägare i det här hushållet</Text>}
            actionType="press"
          >
            <FontAwesome5 name="pause" size={8} color="white" />
          </Tooltip>
        </Paused>
      )}
    </Container>
  );
};

export default AvatarCard;

const Owner = styled.View<{ background: string; borderColor: string }>`
  background-color: ${(props) => props.background};
  width: 17px;
  height: 17px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: absolute;
  right: -8px;
  top: -8px;
  border: 1px solid ${(props) => props.borderColor};
`;

const Paused = styled.View<{ background: string; borderColor: string }>`
  background-color: ${(props) => props.background};
  width: 17px;
  height: 17px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: absolute;
  left: -8px;
  top: -8px;
  border: 1px solid ${(props) => props.borderColor};
`;

const Container = styled.View<{ color: string; size?: number }>`
  margin-left: 5px;
  background-color: ${(props) => props.color};
  border-radius: ${({ size }) => (size ? size / 3 : 5)}px;
  padding: 3px;
`;

const Avatar = styled.Text<{ size?: number }>`
  font-size: ${({ size }) => (size ? size : 15)}px;
`;
