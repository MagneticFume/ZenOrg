import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Note } from '../types';
import { NoteCard } from '../components/NoteCard';
import { FAB } from '../components/FAB';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import { loadNotes, deleteNote as deleteNoteFromStorage } from '../storage/storage';

interface HomeScreenProps {
  onNavigateToEditor: (note?: Note) => void;
}

export const HomeScreen = ({ onNavigateToEditor }: HomeScreenProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotesData();
  }, []);

  const loadNotesData = async () => {
    const loadedNotes = await loadNotes();
    setNotes(loadedNotes);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotesData();
    setRefreshing(false);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNoteFromStorage(id);
    await loadNotesData();
  };

  const handleCreateNote = () => {
    onNavigateToEditor();
  };

  const renderEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxl }}>
      <Text
        style={{
          fontSize: typography.fontSize.lg,
          fontWeight: '500',
          color: colors.textSecondary,
          textAlign: 'center',
        }}
      >
        No notes yet
      </Text>
      <Text
        style={{
          fontSize: typography.fontSize.sm,
          color: colors.textMuted,
          textAlign: 'center',
          marginTop: spacing.sm,
        }}
      >
        Tap the + button to create your first note
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={(note) => onNavigateToEditor(note)}
            onDelete={handleDeleteNote}
          />
        )}
        contentContainerStyle={{
          paddingTop: spacing.md,
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyComponent}
      />

      <FAB onPress={handleCreateNote} />
    </View>
  );
};
