
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Search, X } from 'lucide-react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Search size={19} color="#77738C" strokeWidth={2} />

      <TextInput
        style={styles.input}
        placeholder="Search your recordings..."
        placeholderTextColor="#9290A0"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <X
          size={18}
          color="#77738C"
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7E4EC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#302E46',
    paddingVertical: 0,
  },
});

export default SearchBar;
