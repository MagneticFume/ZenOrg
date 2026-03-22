import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Animated } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { EditorScreen } from './src/screens/EditorScreen';
import { InternshipsScreen } from './src/screens/InternshipsScreen';
import { InternshipEditor } from './src/screens/InternshipEditor';
import { CapsuleToggle } from './src/components/CapsuleToggle';
import { colors, spacing } from './src/styles/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('notes');
  const [selectedNote, setSelectedNote] = useState(undefined);
  const [selectedInternshipId, setSelectedInternshipId] = useState(undefined);
  const fadeAnim = useState(new Animated.Value(1))[0];

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

  const handleTabChange = (value) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setCurrentScreen(value);
    });
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {!isEditorScreen && (
        <CapsuleToggle
          options={[
            { label: 'Notes', value: 'notes' },
            { label: 'Internships', value: 'internships' },
          ]}
          activeValue={currentScreen}
          onChange={handleTabChange}
        />
      )}
      
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {renderScreen()}
      </Animated.View>
      
      <StatusBar style="auto" />
    </View>
  );
}
