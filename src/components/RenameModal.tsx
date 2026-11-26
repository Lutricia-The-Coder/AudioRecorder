
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
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
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.background}>
        <View style={styles.card}>

          <View style={styles.titleContainer}>
            <Pencil size={22} color="#7664D8" />

            <Text style={styles.title}>
              Rename Voice Note
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter new name"
            value={name}
            onChangeText={onChangeName}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <X size={18} color="#777777" />
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSave}
            >
              <Save size={18} color="#FFFFFF" />
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#242044',
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 12,
    borderRadius: 8,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },

  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  cancel: {
    color: '#777777',
  },

  saveButton: {
    backgroundColor: '#7664D8',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RenameModal;
