import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Tooltip from "rn-tooltip";
import styled from "styled-components/native";
import { avatarData } from "../../store/profile/profileData";
import { Avatar, Profile } from "../../store/profile/profileModel";

interface Props {
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
  selectedAvatar: number;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<number>>;
  profilesInHousehold?: Profile[];
}

const AvatarPicker = ({ setAvatar, selectedAvatar, setSelectedAvatar, profilesInHousehold }: Props) => {
  const { colors } = useTheme();
  return (
    <AvatarContainer>
      <AvatarText variant="headlineSmall">Välj din avatar</AvatarText>
      <AvatarContent>
        {avatarData.map((a, index) => (
          <View key={a.avatar}>
            <AvatarCard
              onPress={() => {
                if (profilesInHousehold) {
                  if (!profilesInHousehold.find((profile) => profile.avatar.avatar === a.avatar)) {
                    setAvatar(a);
                    setSelectedAvatar(index);
                  }
                } else {
                  setAvatar(a);
                  setSelectedAvatar(index);
                }
              }}
              color={a.color}
              selected={index === selectedAvatar}
            >
              <AvatarEmoji>{a.avatar}</AvatarEmoji>
            </AvatarCard>
            {profilesInHousehold && profilesInHousehold.find((profile) => profile.avatar.avatar === a.avatar) && (
              <View style={{ position: "absolute" }}>
                <Tooltip
                  backgroundColor={colors.surface}
                  width={200}
                  height={80}
                  popover={
                    <Text>
                      Den här avataren används av
                      {profilesInHousehold.find((profile) => profile.avatar.avatar === a.avatar)?.profileName}
                    </Text>
                  }
                  actionType="press"
                >
                  <MaterialCommunityIcons name="close" size={65} color={colors.onError} />
                </Tooltip>
              </View>
            )}
          </View>
        ))}
      </AvatarContent>
    </AvatarContainer>
  );
};

export default AvatarPicker;

const AvatarCard = styled.Pressable<{ color: string; selected?: boolean }>`
  padding: 7px;
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
  margin-top: 20px;
`;

const AvatarContent = styled.View`
  margin-bottom: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const AvatarEmoji = styled.Text`
  font-size: 40px;
`;
