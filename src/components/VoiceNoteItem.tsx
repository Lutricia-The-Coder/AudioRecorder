
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Play,
  Pause,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react-native';

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
  const [menuVisible, setMenuVisible] = useState(false);

  const progress =
    totalDuration > 0
      ? Math.min((currentTime / totalDuration) * 100, 100)
      : 0;

  const handleRename = () => {
    setMenuVisible(false);
    onRename();
  };

  const handleDelete = () => {
    setMenuVisible(false);
    onDelete();
  };

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlay}
          activeOpacity={0.75}
        >
          {isPlaying ? (
            <Pause size={19} color="#56517D" fill="#56517D" />
          ) : (
            <Play size={19} color="#56517D" fill="#56517D" />
          )}
        </TouchableOpacity>

        <View style={styles.noteInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {note.name}
          </Text>

          <Text style={styles.date} numberOfLines={1}>
            {note.date} · {formatTime(note.duration)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(!menuVisible)}
          activeOpacity={0.7}
        >
          <MoreHorizontal size={22} color="#77738C" />
        </TouchableOpacity>
      </View>

      {/* Playback progress */}
      {isCurrentlyPlaying && (
        <View style={styles.progressArea}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>
              {formatTime(currentTime)}
            </Text>

            <Text style={styles.timeText}>
              {formatTime(totalDuration)}
            </Text>
          </View>
        </View>
      )}

      {/* Action menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleRename}
          >
            <Pencil size={16} color="#7770A0" />
            <Text style={styles.renameText}>Rename</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleDelete}
          >
            <Trash2 size={16} color="#D65B5B" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#E8E8E2',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  playButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#E7E4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noteInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#302E46',
  },

  date: {
    fontSize: 11,
    color: '#9290A0',
    marginTop: 5,
  },

  menuButton: {
    width: 34,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressArea: {
    marginTop: 16,
  },

  progressBackground: {
    height: 4,
    backgroundColor: '#EAE8F0',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: 4,
    backgroundColor: '#7770A0',
    borderRadius: 5,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },

  timeText: {
    fontSize: 10,
    color: '#9290A0',
  },

  menu: {
    alignSelf: 'flex-end',
    width: 145,
    backgroundColor: '#FCFBFD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E6EE',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#EEEAF2',
  },

  renameText: {
    fontSize: 13,
    color: '#56517D',
    fontWeight: '500',
  },

  deleteText: {
    fontSize: 13,
    color: '#D65B5B',
    fontWeight: '500',
  },
});

export default VoiceNoteItem;
