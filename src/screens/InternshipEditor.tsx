import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { createInternship, updateInternship } from '../storage/storage';
import { colors, spacing, typography } from '../styles/theme';

interface InternshipEditorProps {
  internshipId?: string;
  onBack: () => void;
}

const STATUSES = ['Applied', 'Interview', 'Rejected', 'Offer'];

export const InternshipEditor = ({ internshipId, onBack }: InternshipEditorProps) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [portal, setPortal] = useState('');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    try {
      if (!company.trim() && !role.trim()) {
        Alert.alert('Validation', 'Please enter at least company name or role');
        return;
      }

      if (internshipId) {
        await updateInternship(internshipId, {
          company,
          role,
          portal,
          dateApplied,
          status,
          notes,
        });
      } else {
        await createInternship({
          company,
          role,
          portal,
          dateApplied,
          status,
          notes,
        });
      }
      onBack();
    } catch (error) {
      console.error('Error saving internship:', error);
      Alert.alert('Error', 'Failed to save internship application');
    }
  };

  const getStatusColor = (s: string): string => {
    switch (s) {
      case 'Applied':
        return '#5C6BC0';
      case 'Interview':
        return '#FFA726';
      case 'Rejected':
        return '#EF5350';
      case 'Offer':
        return '#66BB6A';
      default:
        return colors.border;
    }
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
          {internshipId ? 'Edit Application' : 'New Application'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={{ padding: spacing.xs }}>
          <Text 
            style={{ 
              fontSize: typography.fontSize.lg, 
              color: colors.accent,
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
          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Company Name *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., Google, Microsoft"
            placeholderTextColor={colors.textSecondary}
            value={company}
            onChangeText={(text) => setCompany(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Role/Position *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., Software Engineering Intern"
            placeholderTextColor={colors.textSecondary}
            value={role}
            onChangeText={(text) => setRole(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Where Applied (Portal/Website)
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., LinkedIn, Company Website"
            placeholderTextColor={colors.textSecondary}
            value={portal}
            onChangeText={(text) => setPortal(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Date Applied
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSecondary}
            value={dateApplied}
            onChangeText={(text) => setDateApplied(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Status
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md }}>
            {STATUSES.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s)}
                style={[
                  {
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    borderRadius: 6,
                    marginRight: spacing.sm,
                    marginBottom: spacing.sm,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: status === s ? getStatusColor(s) : colors.surface,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    color: status === s ? colors.surface : colors.textSecondary,
                  }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Notes/Remarks
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              minHeight: 100,
              textAlignVertical: 'top',
              marginBottom: spacing.lg,
            }}
            placeholder="Add any notes about this application..."
            placeholderTextColor={colors.textSecondary}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
