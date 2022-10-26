import React from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { avatarData } from "../../store/profile/profileData";
import { Avatar } from "../../store/profile/profileModel";

interface Props {
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
  selectedAvatar: number;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<number>>;
}

const AvatarPicker = ({ setAvatar, selectedAvatar, setSelectedAvatar }: Props) => {
  return (
    <AvatarContainer>
      <AvatarText variant="headlineSmall">Välj din avatar</AvatarText>
      <AvatarContent>
        {avatarData.map((avatar, index) => (
          <AvatarCard
            key={avatar.avatar}
            onPress={() => {
              setAvatar(avatar);
              setSelectedAvatar(index);
            }}
            color={avatar.color}
            selected={index === selectedAvatar}
          >
            <AvatarEmoji>{avatar.avatar}</AvatarEmoji>
          </AvatarCard>
        ))}
      </AvatarContent>
    </AvatarContainer>
  );
};

export default AvatarPicker;

const AvatarCard = styled.Pressable<{ color: string; selected?: boolean }>`
  padding: 5px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  ${({ selected }) => !selected && "opacity: .5"};
  margin: 4px;
`;

const AvatarText = styled(Text)`
  margin: 0 10px;
  align-self: center;
`;

const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const AvatarContent = styled.View`
  margin-bottom: 10px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 10px;
`;

const AvatarEmoji = styled.Text`
  font-size: 40px;
`;
