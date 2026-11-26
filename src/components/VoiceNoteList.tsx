
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { VoiceNote } from '../types/VoiceNote';
import VoiceNoteItem from './VoiceNoteItem';

type Props = {
  notes: VoiceNote[];
  playingId: string | null;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  onPlay: (note: VoiceNote) => void;
  onRename: (note: VoiceNote) => void;
  onDelete: (note: VoiceNote) => void;
};

const VoiceNoteList = ({
  notes,
  playingId,
  isPlaying,
  currentTime,
  totalDuration,
  onPlay,
  onRename,
  onDelete,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>My Recordings</Text>
        <Text style={styles.count}>{notes.length} notes</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No voice notes found. Start recording!
          </Text>
        }
        renderItem={({ item }) => (
          <VoiceNoteItem
            note={item}
            isPlaying={playingId === item.id && isPlaying}
            isCurrentlyPlaying={playingId === item.id}
            currentTime={currentTime}
            totalDuration={totalDuration || item.duration}
            onPlay={() => onPlay(item)}
            onRename={() => onRename(item)}
            onDelete={() => onDelete(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#242044',
  },
  count: {
    color: '#7664D8',
  },
  empty: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 30,
  },
});

export default VoiceNoteList;
