import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { default as React, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { avatarData } from "../../store/profile/profileData";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { editProfileThunk } from "../../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Input from "../Input";

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Titel måste vara minst två tecken")
    .max(20, "Titel kan inte vara längre än 20 tecken")
    .required("Titel kan inte vara tom"),
});

interface Props {
  closeModal: () => void;
}

const EditUser = ({ closeModal }: Props) => {
  const { colors } = useTheme();
  const [overlay, setOverlay] = useState(false);
  const profile = useAppSelector(selectCurrentProfile);
  const dispatch = useAppDispatch();
  const handleSubmit = (values: { name: string; avatar: string; avatarColor: string }) => {
    if (profile) dispatch(editProfileThunk({ ...profile, profileName: values.name, avatar: { avatar: values.avatar, color: values.avatarColor } }));
    closeModal();
  };

  return (
    <Container>
      <Content>
        <Text variant="headlineMedium">Redigera profil</Text>
        <Surface elevation={0} style={{ flexDirection: "row", padding: 20, marginTop: 10 }}>
          <Formik
            initialValues={{ name: profile?.profileName }}
            validationSchema={validation}
            onSubmit={(values) => values && handleSubmit({ name: values.name as string, avatar: "🦊", avatarColor: "#cc4e0f" })}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <View style={{ width: "100%" }}>
                  <Input label="Namn" value={values.name as string} handleChange={handleChange("name")} />
                  {errors.name && <Text>{errors.name}</Text>}
                  <Button onPress={handleSubmit}>Asd</Button>
                </View>
              );
            }}
          </Formik>
        </Surface>
        <Text>Välj en ledig avatar:</Text>

        {/* use component tommy made */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 40,
            paddingVertical: 10,
          }}
        >
          {avatarData.map((x) => (
            <Text
              key={x.avatar}
              variant="headlineLarge"
              style={{
                backgroundColor: x.color,
                padding: 10,
                margin: 5,
                borderRadius: 10,
                // overflow: "hidden",
                opacity: x.avatar === profile?.avatar.avatar ? 1 : 0.5,
              }}
            >
              {x.avatar}
            </Text>
          ))}
        </View>
        {/* use component tommy made */}
      </Content>
      <Pressable
        onPress={() => {
          setOverlay(false);
          closeModal();
        }}
      >
        <SimpleLineIcons name="close" size={42} color={colors.primary} />
      </Pressable>
    </Container>
  );
};

export default EditUser;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #00000042;
  /* getprops */
  /* background-color: overlay ? "rgba(0,0,0,0.5)" : undefined; */
  align-items: center;
`;

const Content = styled(Surface)`
  margin: 20px;
  padding: 20px 0;
  border-radius: 20px;
  align-items: center;
`;
