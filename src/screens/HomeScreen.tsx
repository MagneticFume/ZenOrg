import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Note, loadNotes, deleteNote as deleteNoteFromStorage } from '../storage/storage';
import { NoteCard } from '../components/NoteCard';
import { FAB } from '../components/FAB';
import { colors, spacing, typography, globalStyles } from '../styles/theme';

interface HomeScreenProps {
  onNavigateToEditor: (note?: Note) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToEditor }) => {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }}>
      <Text
        style={{
          fontSize: typography.fontSize.lg,
          color: colors.textSecondary,
          textAlign: 'center',
        }}
      >
        No notes yet
      </Text>
      <Text
        style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
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
      <View
        style={{
          paddingTop: 50,
          paddingBottom: spacing.md,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.text,
            paddingHorizontal: spacing.md,
          }}
        >
          My Notes
        </Text>
      </View>

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
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
        ListEmptyComponent={renderEmptyComponent}
      />

      <FAB onPress={handleCreateNote} />
    </View>
  );
};
