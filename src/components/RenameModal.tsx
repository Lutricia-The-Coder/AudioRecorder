
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  Pencil,
  X,
  Save,
} from 'lucide-react-native';

type Props = {
  visible: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const RenameModal = ({
  visible,
  name,
  onChangeName,
  onSave,
  onCancel,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.background}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCancel}
          >
            <X size={20} color="#77738C" />
          </TouchableOpacity>

          {/* Heading */}
          <View style={styles.iconContainer}>
            <Pencil size={22} color="#56517D" />
          </View>

          <Text style={styles.title}>
            Name this moment
          </Text>

          <Text style={styles.subtitle}>
            Give your voice note a name you'll remember.
          </Text>

          {/* Name input */}
          <TextInput
            style={styles.input}
            placeholder="Enter a name..."
            placeholderTextColor="#9290A0"
            value={name}
            onChangeText={onChangeName}
            autoFocus
            selectTextOnFocus
            returnKeyType="done"
            onSubmitEditing={onSave}
          />

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSave}
              activeOpacity={0.8}
            >
              <Save size={17} color="#FFFFFF" />

              <Text style={styles.saveText}>
                Save note
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(48, 46, 70, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FCFBFD',
    padding: 25,
    borderRadius: 24,
  },

  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#E7E4F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 17,
  },

  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#302E46',
  },

  subtitle: {
    fontSize: 13,
    color: '#9290A0',
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 22,
  },

  input: {
    height: 51,
    backgroundColor: '#F5F4F8',
    borderWidth: 1,
    borderColor: '#E7E4EC',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#302E46',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 23,
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  cancelText: {
    color: '#77738C',
    fontSize: 13,
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: '#56517D',
    paddingVertical: 13,
    paddingHorizontal: 17,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default RenameModal;
