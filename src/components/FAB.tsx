import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface FABProps {
  onPress: () => void;
}

export const FAB: React.FC<FABProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.fab}
      activeOpacity={0.8}
    >
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: colors.surface,
    fontWeight: typography.fontWeight.regular,
    marginTop: -2,
  },
});
