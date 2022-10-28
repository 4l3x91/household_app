import { MaterialCommunityIcons } from "@expo/vector-icons";
import { uuidv4 } from "@firebase/util";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { Chore } from "../../store/chore/choreModel";
import { postChore } from "../../store/chore/choreThunks";
import { selectHousehold } from "../../store/household/householdSelector";
import { selectCurrentProfile } from "../../store/profile/profileSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { newChoreValidation } from "../../utils/yupSchemas";
import AppModal from "../common/AppModal";
import Input from "../common/Input";
import ValuePicker from "./ValuePicker";

interface Props {
  closeModal: () => void;
}

const CreateChore = ({ closeModal }: Props) => {
  const [interval, setInterval] = useState(1);
  const [energy, setEnergy] = useState(2);
  const [overlay, setOverlay] = useState(false);
  const [soundModalOpen, setSoundModalOpen] = useState(false);
  const { household } = useAppSelector(selectHousehold);
  const dispatch = useAppDispatch();
  const choreState = useAppSelector((state) => state.chores);
  const storage = getStorage();
  const currentProfile = useAppSelector(selectCurrentProfile);
  const [localImage, setLocalImage] = useState<any>("");
  const choreId = uuidv4();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setLocalImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (currentProfile) {
      const imageRef = ref(storage, `${household.id}/${choreId}/image.jpg`);
      const img = await fetch(localImage);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);

      return await getDownloadURL(imageRef);
    }
  };

  const handleSubmit = async (values: { name: string; description: string }) => {
    let imageUrl: string | undefined = "";

    if (localImage !== "") {
      imageUrl = await uploadImage();
    }

    if (imageUrl) {
      const newChore: Chore = {
        id: choreId,
        name: values.name,
        description: values.description,
        householdId: household.id,
        interval: interval,
        energy: energy,
        archived: false,
        imgUrl: imageUrl,
      };
      dispatch(postChore(newChore));
      closeModal();
    }
  };

  return (
    <View>
      <Formik initialValues={{ name: "", description: "" }} validationSchema={newChoreValidation} onSubmit={(values) => handleSubmit(values)}>
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View>
              <Text style={{ padding: 20 }} variant="headlineMedium">
                Skapa en ny syssla
              </Text>
              <Divider style={{ height: 1, width: "100%" }} />
              <ContentContainer elevation={0}>
                <Container>
                  <Input label="Titel" value={values.name} handleChange={handleChange("name")} />
                  {errors.name && <Text>{errors.name}</Text>}
                </Container>

                <Container>
                  <Input label="Beskrivning" multiline value={values.description} numberOfLines={4} handleChange={handleChange("description")} />
                  {errors.description && <Text>{errors.description}</Text>}
                </Container>

                <Container>
                  <ValuePicker label="Återkommer" min={1} max={31} onChange={setInterval} value={interval} prefix="var" unit="dag" />
                </Container>
                <Container>
                  <ValuePicker
                    subLabel="Hur energikrävande är sysslan?"
                    showBadge={true}
                    label="Värde"
                    min={1}
                    max={10}
                    steps={1}
                    onChange={setEnergy}
                    value={energy}
                  />
                </Container>
                <AttatchmentContainer>
                  <Button onPress={pickImage} icon={localImage === "" ? "image" : "check-bold"}>
                    Lägg till bild
                  </Button>
                  <Button onPress={() => setSoundModalOpen(true)} icon="volume-high">
                    Lägg till ljud
                  </Button>
                </AttatchmentContainer>
              </ContentContainer>
              <Divider style={{ height: 1, width: "100%" }} />
              <ButtonContainer>
                <ButtonWrapper>
                  <Button style={{ padding: 15 }} mode={"text"} onPress={handleSubmit} loading={choreState.pending} icon="plus-circle-outline">
                    Spara
                  </Button>
                </ButtonWrapper>
                <Divider style={{ width: 1, height: "100%" }} />
                <ButtonWrapper>
                  <Button style={{ padding: 15 }} mode={"text"} onPress={closeModal} icon="close-circle-outline">
                    Stäng
                  </Button>
                </ButtonWrapper>
              </ButtonContainer>
            </View>
          );
        }}
      </Formik>
      <Modal animationType="slide" transparent={true} visible={soundModalOpen} statusBarTranslucent>
        <AppModal title="Lägg till ljud" closeModal={() => setSoundModalOpen(false)} toggleOverlay={() => setOverlay((prev) => !prev)}>
          <Text>Spela in ett ljudklipp till din syssla.</Text>
          <MaterialCommunityIcons name="record-circle-outline" size={40} color="red" />
        </AppModal>
      </Modal>
    </View>
  );
};

export default CreateChore;

const AttatchmentContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonWrapper = styled.View`
  flex: 1;
`;

const ButtonContainer = styled(ButtonWrapper)`
  flex-direction: row;
`;

const ContentContainer = styled(Surface)`
  padding: 10px 20px;
  background-color: transparent;
  margin-bottom: 40px;
`;

const Container = styled.View`
  margin: 8px 0;
`;
