import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import { Note, loadNotes, deleteNote as deleteNoteFromStorage } from '../storage/storage';
import { colors, spacing, typography } from '../styles/theme';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onDelete }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 50;
      },
      onPanResponderTerminatedRequest: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dx > 100) {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleLongPress = () => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${note.title}"?`,
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

  const preview = note.content.substring(0, 80) + (note.content.length > 80 ? '...' : '');

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: slideAnim }],
          flex: 1,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        onPress={() => onPress(note)}
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={{
          backgroundColor: colors.surface,
          marginHorizontal: spacing.md,
          marginVertical: spacing.sm,
          borderRadius: 12,
          padding: spacing.md,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Text
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text,
                marginBottom: spacing.xs,
              }}
              numberOfLines={1}
            >
              {note.title || 'Untitled'}
            </Text>
            <Text
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.textSecondary,
              }}
              numberOfLines={2}
            >
              {preview || 'No content'}
            </Text>
          </View>
          <View
            style={{
              width: 60,
              height: '100%',
              backgroundColor: colors.error,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: colors.surface, fontSize: 14 }}>Delete</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
