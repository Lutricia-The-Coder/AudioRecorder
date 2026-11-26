
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import { ChevronDown } from 'lucide-react-native';

import { VoiceNote } from '../types/VoiceNote';
import VoiceNoteItem from './VoiceNoteItem';

type Props = {
  notes: VoiceNote[];
  searchQuery: string;
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
  searchQuery,
  playingId,
  isPlaying,
  currentTime,
  totalDuration,
  onPlay,
  onRename,
  onDelete,
}: Props) => {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* Recordings heading */}
      <View style={styles.heading}>
        <View>
          <Text style={styles.title}>Your recordings</Text>

          <Text style={styles.count}>
            {notes.length} {notes.length === 1 ? 'moment' : 'moments'}
          </Text>
        </View>
      </View>

      {/* Recordings list */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          notes.length === 0 ? styles.emptyList : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {isSearching ? (
              <>
                <Text style={styles.emptyTitle}>
                  No recordings found
                </Text>

                <Text style={styles.empty}>
                  We couldn't find any recordings matching "{searchQuery.trim()}".
                  Try searching with a different name.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>
                  No recordings yet
                </Text>

                <Text style={styles.empty}>
                  Your voice notes will appear here.
                  Start recording to capture a moment.
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const isCurrentNote = playingId === item.id;

          return (
            <VoiceNoteItem
              note={item}
              isPlaying={isCurrentNote && isPlaying}
              isCurrentlyPlaying={isCurrentNote}
              currentTime={isCurrentNote ? currentTime : 0}
              totalDuration={
                isCurrentNote
                  ? totalDuration || item.duration
                  : item.duration
              }
              onPlay={() => onPlay(item)}
              onRename={() => onRename(item)}
              onDelete={() => onDelete(item)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#302E46',
  },

  count: {
    fontSize: 12,
    color: '#9290A0',
    marginTop: 4,
  },

  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 11,
    backgroundColor: '#F1F0F6',
    borderRadius: 10,
  },

  sortText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#77738C',
  },

  listContent: {
    paddingBottom: 15,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 55,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#302E46',
    marginBottom: 8,
  },

  empty: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    color: '#9290A0',
  },
});

export default VoiceNoteList;
