import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Note, createNote, updateNote } from '../storage/storage';
import { colors, spacing, typography } from '../styles/theme';

interface EditorScreenProps {
  note?: Note;
  onBack: () => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({ note, onBack }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    try {
      if (note) {
        await updateNote(note.id, title, content);
      } else {
        await createNote(title, content);
      }
      onBack();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    setIsDirty(true);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    setIsDirty(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 50,
          paddingBottom: spacing.md,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingHorizontal: spacing.md,
        }}
      >
        <TouchableOpacity onPress={onBack} style={{ padding: spacing.xs }}>
          <Text style={{ fontSize: typography.fontSize.lg, color: colors.accent }}>Cancel</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text,
          }}
        >
          {note ? 'Edit Note' : 'New Note'}
        </Text>
        <TouchableOpacity 
          onPress={handleSave} 
          style={{ padding: spacing.xs }}
          disabled={!isDirty && title.trim() === '' && content.trim() === ''}
        >
          <Text 
            style={{ 
              fontSize: typography.fontSize.lg, 
              color: isDirty || title.trim() || content.trim() ? colors.accent : colors.textSecondary,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, padding: spacing.md }}>
          <TextInput
            style={{
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.text,
              marginBottom: spacing.md,
              minHeight: 40,
            }}
            placeholder="Title"
            placeholderTextColor={colors.textSecondary}
            value={title}
            onChangeText={handleTitleChange}
            multiline={false}
            returnKeyType="next"
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: typography.fontSize.md,
              color: colors.text,
              lineHeight: 24,
              minHeight: 300,
            }}
            placeholder="Start writing..."
            placeholderTextColor={colors.textSecondary}
            value={content}
            onChangeText={handleContentChange}
            multiline
            textAlignVertical="top"
            autoFocus={!note}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
