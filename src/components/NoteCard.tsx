import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { Note } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onPress, onDelete }: NoteCardProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleLongPress = () => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${note.title || 'Untitled'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Animated.timing(slideAnim, {
              toValue: 300,
              duration: 300,
              useNativeDriver: true,
            }).start(() => onDelete(note.id));
          },
        },
      ]
    );
  };

  const preview = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: slideAnim }],
          flex: 1,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => onPress(note)}
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={{
          backgroundColor: colors.surface,
          marginHorizontal: spacing.lg,
          marginVertical: spacing.sm,
          borderRadius: borderRadius.lg,
          padding: spacing.lg,
          ...shadows.medium,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: spacing.xs,
            }}
            numberOfLines={1}
          >
            {note.title || 'Untitled'}
          </Text>
          <Text
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: '400',
              color: colors.textSecondary,
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {preview || 'No content'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
