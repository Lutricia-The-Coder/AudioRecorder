
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Search } from 'lucide-react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Search size={20} color="#7664D8" />

      <TextInput
        style={styles.input}
        placeholder="Search voice notes..."
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 15,
    color: '#242044',
  },
});

export default SearchBar;
