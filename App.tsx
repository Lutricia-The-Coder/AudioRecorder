
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Header from './src/components/Header';
import RecordButton from './src/components/RecordButton';
import SearchBar from './src/components/SearchBar';
import VoiceNoteList from './src/components/VoiceNoteList';
import RenameModal from './src/components/RenameModal';

import { useVoiceNotes } from './src/hooks/useVoiceNotes';
import { formatTime } from './src/utils/formatTime';
import { VoiceNote } from './src/types/VoiceNote';

function VoiceJournal() {
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState<VoiceNote | null>(null);
  const [newName, setNewName] = useState('');

  const {
    notes,
    recorderState,
    playingId,
    isPlaying,
    currentTime,
    totalDuration,
    startRecording,
    stopRecording,
    playNote,
    renameNote,
    deleteNote,
    searchNotes,
  } = useVoiceNotes();

  const openRename = (note: VoiceNote) => {
    setSelectedNote(note);
    setNewName(note.name);
  };

  const saveRename = () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Please enter a name.');
      return;
    }

    if (selectedNote) {
      renameNote(selectedNote.id, newName.trim());
      setSelectedNote(null);
      setNewName('');
    }
  };

  const filteredNotes = searchNotes(search);

  const handleRecording = () => {
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Header />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        <View style={styles.listContainer}>
          <VoiceNoteList
            notes={filteredNotes}
            searchQuery={search}
            playingId={playingId}
            isPlaying={isPlaying}
            currentTime={currentTime}
            totalDuration={totalDuration}
            onPlay={playNote}
            onRename={openRename}
            onDelete={deleteNote}
          />
        </View>

        <View
          style={[
            styles.recordButtonContainer,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <RecordButton
            isRecording={recorderState.isRecording}
            duration={formatTime(recorderState.durationMillis / 1000)}
            onPress={handleRecording}
          />
        </View>
      </View>

      <RenameModal
        visible={selectedNote !== null}
        name={newName}
        onChangeName={setNewName}
        onSave={saveRename}
        onCancel={() => setSelectedNote(null)}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <VoiceJournal />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headerContainer: {
    marginBottom: 12,
  },

  searchContainer: {
    marginBottom: 20,
  },

  listContainer: {
    flex: 1,
    minHeight: 0,
  },

  recordButtonContainer: {
    paddingTop: 12,
  },
});
