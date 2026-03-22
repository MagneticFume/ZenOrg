import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { EditorScreen } from './src/screens/EditorScreen';
import { InternshipsScreen } from './src/screens/InternshipsScreen';
import { InternshipEditor } from './src/screens/InternshipEditor';
import { colors, spacing, typography } from './src/styles/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('notes');
  const [selectedNote, setSelectedNote] = useState(undefined);
  const [selectedInternshipId, setSelectedInternshipId] = useState(undefined);

  const navigateToNoteEditor = (note) => {
    setSelectedNote(note);
    setCurrentScreen('note-editor');
  };

  const navigateToInternshipEditor = (id) => {
    setSelectedInternshipId(id);
    setCurrentScreen('internship-editor');
  };

  const navigateBack = () => {
    setSelectedNote(undefined);
    setSelectedInternshipId(undefined);
    setCurrentScreen(currentScreen === 'note-editor' ? 'notes' : 'internships');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'notes':
        return <HomeScreen onNavigateToEditor={navigateToNoteEditor} />;
      case 'note-editor':
        return <EditorScreen note={selectedNote} onBack={navigateBack} />;
      case 'internships':
        return <InternshipsScreen onNavigateToEditor={navigateToInternshipEditor} />;
      case 'internship-editor':
        return <InternshipEditor internshipId={selectedInternshipId} onBack={navigateBack} />;
      default:
        return <HomeScreen onNavigateToEditor={navigateToNoteEditor} />;
    }
  };

  const isEditorScreen = currentScreen === 'note-editor' || currentScreen === 'internship-editor';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      
      {!isEditorScreen && (
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('notes')}
            style={[styles.tab, currentScreen === 'notes' && styles.activeTab]}
          >
            <Text style={[styles.tabText, currentScreen === 'notes' && styles.activeTabText]}>
              Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentScreen('internships')}
            style={[styles.tab, currentScreen === 'internships' && styles.activeTab]}
          >
            <Text style={[styles.tabText, currentScreen === 'internships' && styles.activeTabText]}>
              Internships
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  activeTabText: {
    color: colors.accent,
    fontWeight: typography.fontWeight.semibold,
  },
});
