
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Mic, Square } from 'lucide-react-native';

type Props = {
  isRecording: boolean;
  duration: string;
  onPress: () => void;
};

const RecordButton = ({
  isRecording,
  duration,
  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      {isRecording && (
        <View style={styles.recordingInfo}>
          <View style={styles.recordingDot} />

          <Text style={styles.recordingText}>
            Recording in progress
          </Text>

          <Text style={styles.timer}>
            {duration}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          isRecording && styles.stopButton,
        ]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <View style={styles.iconContainer}>
          {isRecording ? (
            <Square
              size={17}
              color="#FFFFFF"
              fill="#FFFFFF"
            />
          ) : (
            <Mic
              size={20}
              color="#FFFFFF"
            />
          )}
        </View>

        <Text style={styles.buttonText}>
          {isRecording ? 'Stop recording' : 'New recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 10,
    alignItems: 'center',
  },

  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },

  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D65B5B',
  },

  recordingText: {
    fontSize: 12,
    color: '#77738C',
    fontWeight: '500',
  },

  timer: {
    fontSize: 13,
    color: '#302E46',
    fontWeight: '600',
    marginLeft: 5,
  },

  button: {
    width: '100%',
    minHeight: 58,
    backgroundColor: '#56517D',
    borderRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,

    shadowColor: '#56517D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  stopButton: {
    backgroundColor: '#D65B5B',
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RecordButton;
