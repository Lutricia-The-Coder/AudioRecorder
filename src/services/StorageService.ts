
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VoiceNote } from '../types/VoiceNote';

const STORAGE_KEY = 'voiceNotes';

// Get all saved voice notes
export const getVoiceNotes = async (): Promise<VoiceNote[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

// Save voice notes
export const saveVoiceNotes = async (
  notes: VoiceNote[]
): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
