import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Chore } from "../../store/chore/choreModel";
import ArchiveChore from "./ArchiveChore";
import AssignChore from "./AssignChore";
import DeleteChore from "./DeleteChore";
import EditChore from "./EditChore";

interface Props {
  chore: Chore;
  editModalVisible: boolean;
  deleteModalVisible: boolean;
  archiveModalVisible: boolean;
  assignModalVisible: boolean;
  closeModal: () => void;
}

const EditModals = ({ chore, editModalVisible, deleteModalVisible, archiveModalVisible, assignModalVisible, closeModal }: Props) => {
  return (
    <>
      <Modal onSwipeComplete={closeModal} swipeDirection={"down"} isVisible={editModalVisible} statusBarTranslucent>
        <EditChore chore={chore} closeModal={closeModal} />
      </Modal>

      <Modal onSwipeComplete={closeModal} swipeDirection={"down"} isVisible={deleteModalVisible} statusBarTranslucent>
        <DeleteChore chore={chore} closeModal={closeModal} />
      </Modal>

      <Modal onSwipeComplete={closeModal} swipeDirection={"down"} isVisible={archiveModalVisible} statusBarTranslucent>
        <ArchiveChore chore={chore} closeModal={closeModal} />
      </Modal>

      <Modal onSwipeComplete={closeModal} swipeDirection={"down"} isVisible={assignModalVisible} statusBarTranslucent>
        <AssignChore chore={chore} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default EditModals;

const styles = StyleSheet.create({});
