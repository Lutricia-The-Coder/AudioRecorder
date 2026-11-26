
import { useEffect, useState } from 'react';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';

import { Alert } from 'react-native';
import { VoiceNote } from '../types/VoiceNote';
import { getVoiceNotes, saveVoiceNotes } from '../services/StorageService';
import { deleteAudioFile } from '../services/AudioService';

export const useVoiceNotes = () => {

  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    directory: 'document',
  });

  const recorderState = useAudioRecorderState(recorder);

  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);

  // Load recordings
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await getVoiceNotes();
        setNotes(savedNotes);
      } catch {
        Alert.alert('Error', 'Could not load recordings.');
      } finally {
        setLoaded(true);
      }
    };

    loadNotes();
  }, []);

  // Save recordings
  useEffect(() => {
    if (loaded) {
      saveVoiceNotes(notes).catch(() => {
        Alert.alert('Error', 'Could not save recordings.');
      });
    }
  }, [notes, loaded]);

  // Request microphone permission
  const requestPermission = async () => {
    const result =
      await AudioModule.requestRecordingPermissionsAsync();

    if (!result.granted) {
      Alert.alert('Permission required', 'Please allow microphone access.');
      return false;
    }

    return true;
  };

  // Start recording
  const startRecording = async () => {
    try {
      const granted = await requestPermission();

      if (!granted) return;

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await recorder.prepareToRecordAsync();
      recorder.record();

    } catch {
      Alert.alert('Error', 'Could not start recording.');
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      const duration = Math.round(recorder.currentTime);

      await recorder.stop();

      const uri = recorder.uri;

      if (!uri) {
        Alert.alert('Error', 'Recording could not be saved.');
        return;
      }

      const newNote: VoiceNote = {
        id: Date.now().toString(),
        name: `Voice Note ${notes.length + 1}`,
        uri,
        date: new Date().toLocaleString(),
        duration,
      };

      setNotes(previous => [newNote, ...previous]);

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      Alert.alert('Success', 'Recording saved!');

    } catch {
      Alert.alert('Error', 'Could not save recording.');
    }
  };

  // Play and pause recordings
  const playNote = async (note: VoiceNote) => {
    try {
      if (playingId === note.id && playerStatus.playing) {
        player.pause();
        return;
      }

      if (playingId === note.id) {
        player.play();
        return;
      }

      player.pause();
      player.replace(note.uri);
      setPlayingId(note.id);

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      player.play();

    } catch {
      Alert.alert('Error', 'Could not play recording.');
    }
  };

  // Rename recording
  const renameNote = (id: string, name: string) => {
    setNotes(previous =>
      previous.map(note =>
        note.id === id ? { ...note, name } : note
      )
    );
  };

  // Delete recording
  const deleteNote = (note: VoiceNote) => {
    Alert.alert(
      'Delete recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              if (playingId === note.id) {
                player.pause();
                setPlayingId(null);
              }

              deleteAudioFile(note.uri);

              setNotes(previous =>
                previous.filter(item => item.id !== note.id)
              );
            } catch {
              Alert.alert('Error', 'Could not delete recording.');
            }
          },
        },
      ]
    );
  };

  // Search recordings
  const searchNotes = (search: string) => {
    return notes.filter(note =>
      note.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Playback finished
  useEffect(() => {
    if (playerStatus.didJustFinish) {
      setPlayingId(null);
    }
  }, [playerStatus.didJustFinish]);

  return {
    notes,
    recorderState,
    playerStatus,
    playingId,
    currentTime: playerStatus.currentTime,
    totalDuration: playerStatus.duration,
    isPlaying: playerStatus.playing,
    startRecording,
    stopRecording,
    playNote,
    renameNote,
    deleteNote,
    searchNotes,
  };
};
