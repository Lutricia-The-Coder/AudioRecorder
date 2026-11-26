
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mic } from 'lucide-react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Mic size={28} color="#FFFFFF" />

        <Text style={styles.title}>
          My Voice Notes
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Your personal voice journal
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#242044',
    padding: 22,
    borderRadius: 15,
    marginBottom: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    color: '#D0CCE8',
    marginTop: 5,
  },
});

export default Header;
