import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { InternshipCard } from '../components/InternshipCard';
import { FAB } from '../components/FAB';
import { colors, spacing, typography, globalStyles } from '../styles/theme';
import { loadInternships, deleteInternship as deleteInternshipFromStorage } from '../storage/storage';

interface InternshipsScreenProps {
  onNavigateToEditor: (internshipId?: string) => void;
}

export const InternshipsScreen = ({ onNavigateToEditor }: InternshipsScreenProps) => {
  const [internships, setInternships] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInternshipsData();
  }, []);

  const loadInternshipsData = async () => {
    const loadedInternships = await loadInternships();
    setInternships(loadedInternships);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInternshipsData();
    setRefreshing(false);
  };

  const handleDeleteInternship = async (id: string) => {
    await deleteInternshipFromStorage(id);
    await loadInternshipsData();
  };

  const handleCreateInternship = () => {
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
        No internship applications yet
      </Text>
      <Text
        style={{
          fontSize: typography.fontSize.sm,
          color: colors.textMuted,
          textAlign: 'center',
          marginTop: spacing.sm,
        }}
      >
        Tap the + button to add your first application
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={internships}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InternshipCard
            internship={item}
            onPress={(id) => onNavigateToEditor(id)}
            onDelete={handleDeleteInternship}
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

      <FAB onPress={handleCreateInternship} />
    </View>
  );
};
