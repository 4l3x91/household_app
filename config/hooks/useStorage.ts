import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Chore } from "../../store/chore/choreModel";

export function useStorage() {
  const storage = getStorage();

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

  const uploadSound = async (choreId: string, deviceRecordingUri: string) => {
    const soundRef = ref(storage, `${choreId}/sound.m4a`);
    const recording = await fetch(deviceRecordingUri);
    const bytes = await recording.blob();
    await uploadBytes(soundRef, bytes);

    const downloadUrl = await getDownloadURL(soundRef);

    return downloadUrl;
  };

  const uploadImage = async (choreId: string, deviceImageUri: string) => {
    const imageRef = ref(storage, `${choreId}/image.jpg`);
    const img = await fetch(deviceImageUri);
    const bytes = await img.blob();
    await uploadBytes(imageRef, bytes);

    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
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

  const checkAttachments = async (chore: Chore, editImage: string, deviceImageUri: string, editSound: string, deviceRecordingUri: string) => {
    const attachments: { firebaseImgUrl: string; firebaseSoundUrl: string } = { firebaseImgUrl: chore.imgUrl, firebaseSoundUrl: chore.soundUrl };

    if (editImage === "delete") {
      deleteImageAttachment(chore);
      attachments.firebaseImgUrl = "";
    }
    if (editImage === "add" || editImage === "update") {
      if (deviceImageUri) {
        const url = await uploadImage(chore.id, deviceImageUri);
        attachments.firebaseImgUrl = url;
      }
    }
    if (editSound === "delete") {
      deleteSoundAttachment(chore);
      attachments.firebaseSoundUrl = "";
    }
    if (editSound === "add" || editSound === "update") {
      if (deviceRecordingUri) {
        const url = await uploadSound(chore.id, deviceRecordingUri);
        attachments.firebaseSoundUrl = url;
      }
    }
    return attachments;
  };

  return { uploadAttatchments, uploadImage, uploadSound, deleteAttachments, deleteImageAttachment, deleteSoundAttachment, checkAttachments };
}
