import React from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { Internship } from '../types';
import { colors, spacing, typography } from '../styles/theme';

interface InternshipCardProps {
  internship: Internship;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: Internship['status']): string => {
  switch (status) {
    case 'Applied':
      return '#5C6BC0';
    case 'Interview':
      return '#FFA726';
    case 'Rejected':
      return '#EF5350';
    case 'Offer':
      return '#66BB6A';
    default:
      return '#757575';
  }
};

export const InternshipCard = ({ internship, onPress, onDelete }: InternshipCardProps) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const handleLongPress = () => {
    Alert.alert(
      'Delete Application',
      `Are you sure you want to delete your application to ${internship.company}?`,
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
            }).start(() => onDelete(internship.id));
          },
        },
      ]
    );
  };

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
        onPress={() => onPress(internship.id)}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text,
                marginBottom: spacing.xs,
              }}
            >
              {internship.company}
            </Text>
            <Text
              style={{
                fontSize: typography.fontSize.md,
                color: colors.accent,
                marginBottom: spacing.xs,
              }}
            >
              {internship.role}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View
                style={{
                  backgroundColor: getStatusColor(internship.status),
                  paddingHorizontal: spacing.sm,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginRight: spacing.sm,
                }}
              >
                <Text style={{ color: colors.surface, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium }}>
                  {internship.status}
                </Text>
              </View>
              <Text style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>
                Applied: {new Date(internship.dateApplied).toLocaleDateString()}
              </Text>
            </View>
            {internship.notes ? (
              <Text
                style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.textSecondary,
                  fontStyle: 'italic',
                }}
                numberOfLines={2}
              >
                {internship.notes}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
