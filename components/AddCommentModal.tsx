import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import CustomButton from "./CustomButton";
import colours from "../colours";
import useAuth from "../contexts/AuthContext";
import useCreateComment from "../tanstack/mutations/useCreateComment";
import { useState } from "react";

type ModalProps = {
  post_id: string;
  closeModal: () => void;
  isOpen: boolean;
};

const AddCommentModal = ({ isOpen, closeModal, post_id }: ModalProps) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const onSuccessCallback = () => {
    closeModal();
    setComment("");
  };

  const { isPending, mutate } = useCreateComment(onSuccessCallback, post_id);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <Pressable style={styles.backdrop} onPress={closeModal} />

      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add a comment</Text>
        <TextInput
          style={styles.textarea}
          multiline={true}
          placeholder="Enter your comment here..."
          textAlignVertical="top"
          placeholderTextColor={colours.placeholderText}
          value={comment}
          onChangeText={setComment}
        />
        <CustomButton
          title="Add comment"
          onClick={() => mutate({ comment, post_id, user_id: user?.id! })}
          disabled={!comment}
          pending={isPending}
          pendingMessage="Adding comment..."
        />
      </View>
    </Modal>
  );
};

export default AddCommentModal;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colours.dark,
    minHeight: 200,
    margin: 20,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    backgroundColor: colours.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: "geist",
    fontSize: 18,
    fontWeight: "600",
    color: colours.light,
    marginBottom: 10,
  },
  textarea: {
    minHeight: 100,
    flex: 1,
    borderColor: colours.darker,
    borderWidth: 1,
    padding: 10,
    color: colours.lighter,
    borderRadius: 8,
    marginVertical: 20,
  },
});
