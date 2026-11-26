
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
    <View style={styles.card}>
      <Text style={styles.heading}>
        {isRecording
          ? 'Recording...'
          : 'Record a new voice note'}
      </Text>

      <Text style={styles.timer}>{duration}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          isRecording && styles.stopButton,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {isRecording ? (
          <Square size={20} color="#FFFFFF" />
        ) : (
          <Mic size={20} color="#FFFFFF" />
        )}

        <Text style={styles.buttonText}>
          {isRecording
            ? 'Stop Recording'
            : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242044',
  },

  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7664D8',
    margin: 15,
  },

  button: {
    backgroundColor: '#7664D8',
    padding: 15,
    borderRadius: 30,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  stopButton: {
    backgroundColor: '#E74C3C',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RecordButton;
