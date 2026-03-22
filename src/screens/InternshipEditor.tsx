import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { createInternship, updateInternship, loadInternshipById } from '../storage/storage';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

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
  const [status, setStatus] = useState<'Applied' | 'Interview' | 'Rejected' | 'Offer'>('Applied');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load internship data when editing
  useEffect(() => {
    if (internshipId) {
      loadInternshipData();
    }
  }, [internshipId]);

  const loadInternshipData = async () => {
    setIsLoading(true);
    try {
      const internship = await loadInternshipById(internshipId!);
      if (internship) {
        setCompany(internship.company || '');
        setRole(internship.role || '');
        setPortal(internship.portal || '');
        setDateApplied(internship.dateApplied || new Date().toISOString().split('T')[0]);
        setStatus(internship.status || 'Applied');
        setNotes(internship.notes || '');
      }
    } catch (error) {
      console.error('Error loading internship:', error);
      Alert.alert('Error', 'Failed to load internship data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!company.trim() && !role.trim()) {
        Alert.alert('Validation', 'Please enter at least company name or role');
        return;
      }

      if (internshipId) {
        await updateInternship(internshipId, {
          company: company.trim(),
          role: role.trim(),
          portal: portal.trim(),
          dateApplied,
          status,
          notes: notes.trim(),
        });
      } else {
        await createInternship({
          company: company.trim(),
          role: role.trim(),
          portal: portal.trim(),
          dateApplied,
          status,
          notes: notes.trim(),
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
          <Text style={{ fontSize: typography.fontSize.lg, color: colors.textSecondary, fontWeight: '500' }}>Cancel</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: typography.fontSize.lg,
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          {internshipId ? 'Edit Application' : 'New Application'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={{ padding: spacing.xs }}>
          <Text 
            style={{ 
              fontSize: typography.fontSize.lg, 
              color: colors.primary,
              fontWeight: '600',
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
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Company Name *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., Google, Microsoft"
            placeholderTextColor={colors.textMuted}
            value={company}
            onChangeText={(text) => setCompany(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Role/Position *
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., Software Engineering Intern"
            placeholderTextColor={colors.textMuted}
            value={role}
            onChangeText={(text) => setRole(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Where Applied (Portal/Website)
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="e.g., LinkedIn, Company Website"
            placeholderTextColor={colors.textMuted}
            value={portal}
            onChangeText={(text) => setPortal(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Date Applied
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
            }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textMuted}
            value={dateApplied}
            onChangeText={(text) => setDateApplied(text)}
          />

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Status
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md }}>
            {STATUSES.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s as 'Applied' | 'Interview' | 'Rejected' | 'Offer')}
                style={[
                  {
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    borderRadius: borderRadius.pill,
                    marginRight: spacing.sm,
                    marginBottom: spacing.sm,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: status === s ? getStatusColor(s) : colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: typography.fontSize.sm,
                    fontWeight: '500',
                    color: status === s ? colors.white : colors.textSecondary,
                  }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
            color: colors.textSecondary,
            marginBottom: spacing.xs,
          }}>
            Notes/Remarks
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surfaceSecondary,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              fontSize: typography.fontSize.md,
              color: colors.textPrimary,
              borderWidth: 1,
              borderColor: colors.border,
              minHeight: 100,
              textAlignVertical: 'top',
              marginBottom: spacing.lg,
            }}
            placeholder="Add any notes about this application..."
            placeholderTextColor={colors.textMuted}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
