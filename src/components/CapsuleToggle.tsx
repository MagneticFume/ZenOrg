import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

interface CapsuleToggleProps {
  options: { label: string; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
}

export const CapsuleToggle = ({ options, activeValue, onChange }: CapsuleToggleProps) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = option.value === activeValue;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              isActive && styles.activeOption,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                isActive && styles.activeOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.pill,
    padding: 4,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.pill,
  },
  activeOption: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeOptionText: {
    color: colors.white,
    fontWeight: '600',
  },
});
