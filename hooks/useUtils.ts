import * as ImagePicker from "expo-image-picker";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Chore } from "../store/chore/choreModel";

export function useUtils() {
  const storage = getStorage();

  const generateHouseholdCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  function convertToRGB(hex: string, alpha: number): string {
    const newHex = hex.substring(1);

    if (newHex.length != 6) {
      throw "Only six-digit hex colors are allowed.";
    }

    const aRgbHex = newHex.match(/.{1,2}/g);
    if (aRgbHex) {
      const aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];

      const aRgbString = `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, ${alpha})`;

      return aRgbString;
    }
    return "rgba(0,0,0,0)";
  }

  const addDays = function (date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return result.uri;
    }
  };

  const uploadAttatchments = async (choreId: string, deviceImageUri: string, deviceRecordingUri: string) => {
    const attatchments = { firebaseImgUrl: "", firebaseSoundUrl: "" };

    if (deviceImageUri) {
      const imageRef = ref(storage, `${choreId}/image.jpg`);
      const img = await fetch(deviceImageUri);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);

      attatchments.firebaseImgUrl = await getDownloadURL(imageRef);
    }
    if (deviceRecordingUri) {
      const soundRef = ref(storage, `${choreId}/sound.m4a`);
      const recording = await fetch(deviceRecordingUri);
      const bytes = await recording.blob();
      await uploadBytes(soundRef, bytes);

      attatchments.firebaseSoundUrl = await getDownloadURL(soundRef);
    }
    return attatchments;
  };

  const deleteAttachments = (chore: Chore) => {
    deleteImageAttachment(chore);
    deleteSoundAttachment(chore);
  };

  const deleteImageAttachment = (chore: Chore) => {
    if (chore.imgUrl) {
      const imageRef = ref(storage, `${chore.id}/image.jpg`);

      deleteObject(imageRef)
        .then(() => {
          console.log("Attachments deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteSoundAttachment = (chore: Chore) => {
    if (chore.soundUrl) {
      const imageRef = ref(storage, `${chore.id}/sound.m4a`);

      deleteObject(imageRef)
        .then(() => {
          console.log("Attachments deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    generateHouseholdCode,
    convertToRGB,
    addDays,
    pickImage,
    uploadAttatchments,
    deleteAttachments,
    deleteImageAttachment,
    deleteSoundAttachment,
  };
}
