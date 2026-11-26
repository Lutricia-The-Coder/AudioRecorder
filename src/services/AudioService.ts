
import { File } from 'expo-file-system';

// Delete an audio file
export const deleteAudioFile = (uri: string): void => {
  const audioFile = new File(uri);

  if (audioFile.exists) {
    audioFile.delete();
  }
};
