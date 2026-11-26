
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { VoiceNote } from '../types/VoiceNote';
import { formatTime } from '../utils/formatTime';

type Props = {
  note: VoiceNote;
  isPlaying: boolean;
  isCurrentlyPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  onPlay: () => void;
  onRename: () => void;
  onDelete: () => void;
};

const VoiceNoteItem = ({
  note,
  isPlaying,
  isCurrentlyPlaying,
  currentTime,
  totalDuration,
  onPlay,
  onRename,
  onDelete,
}: Props) => {
  const progress = totalDuration > 0
    ? Math.min((currentTime / totalDuration) * 100, 100)
    : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{note.name}</Text>
      <Text style={styles.date}>{note.date}</Text>

      <Text style={styles.duration}>
        Duration: {formatTime(note.duration)}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.playButton} onPress={onPlay}>
          <Text style={styles.buttonText}>
            {isPlaying ? 'Ⅱ Pause' : '▶ Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRename}>
          <Text style={styles.rename}>✏ Rename</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>🗑 Delete</Text>
        </TouchableOpacity>
      </View>

      {isCurrentlyPlaying && (
        <View style={styles.progressArea}>
          <Text style={styles.duration}>
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </Text>

          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242044',
  },
  date: {
    color: '#888888',
    marginTop: 5,
  },
  duration: {
    color: '#7664D8',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  playButton: {
    backgroundColor: '#7664D8',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rename: {
    color: '#7664D8',
    fontWeight: 'bold',
  },
  delete: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  progressArea: {
    marginTop: 12,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#E0DDEE',
    borderRadius: 5,
    marginTop: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#7664D8',
    borderRadius: 5,
  },
});

export default VoiceNoteItem;
