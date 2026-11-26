
import { View, Text, StyleSheet } from 'react-native';
import { AudioLines } from 'lucide-react-native';

const Header = () => {
  return (
    <View style={styles.header}>

      {/* Logo and brand name */}
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <AudioLines size={22} color="#56517D" />
        </View>

        <Text style={styles.eyebrow}>
          MY VOICE JOURNAL
        </Text>
      </View>

      {/* Main heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>
          Good day,
        </Text>

        <Text style={styles.titleItalic}>
          take a moment.
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 30,
  },

  logoContainer: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#E7E4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headingContainer: {
    paddingHorizontal: 5,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#7770A0',
  },

  title: {
    fontSize: 39,
    fontWeight: '600',
    color: '#302E46',
    lineHeight: 46,
  },

  titleItalic: {
    fontSize: 42,
    fontStyle: 'italic',
    color: '#7770A0',
    lineHeight: 49,
  },
});

export default Header;
