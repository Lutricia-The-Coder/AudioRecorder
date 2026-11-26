
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🎙 My Voice Notes</Text>
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
