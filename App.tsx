
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import Header from './src/components/Header';
import RecordButton from './src/components/RecordButton';
import SearchBar from './src/components/SearchBar';
import VoiceNoteList from './src/components/VoiceNoteList';
import RenameModal from './src/components/RenameModal';

import { useVoiceNotes } from './src/hooks/useVoiceNotes';
import { formatTime } from './src/utils/formatTime';
import { VoiceNote } from './src/types/VoiceNote';

export default function App() {
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

  // Open rename modal
  const openRename = (note: VoiceNote) => {
    setSelectedNote(note);
    setNewName(note.name);
  };

  // Save renamed recording
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

  // Filter recordings
  const filteredNotes = searchNotes(search);

  // Start or stop recording
  const handleRecording = () => {
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.listContainer}>
        <VoiceNoteList
          notes={filteredNotes}
          playingId={playingId}
          isPlaying={isPlaying}
          currentTime={currentTime}
          totalDuration={totalDuration}
          onPlay={playNote}
          onRename={openRename}
          onDelete={deleteNote}
        />
      </View>

      <View style={styles.recordButtonContainer}>
        <RecordButton
          isRecording={recorderState.isRecording}
          duration={formatTime(recorderState.durationMillis / 1000)}
          onPress={handleRecording}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  headerContainer: {
    marginBottom: 22,
  },

  searchContainer: {
    marginBottom: 24,
  },

  listContainer: {
    flex: 1,
  },

  recordButtonContainer: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
