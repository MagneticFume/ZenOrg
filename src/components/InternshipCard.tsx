import React from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { Internship } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

interface InternshipCardProps {
  internship: Internship;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: Internship['status']): string => {
  switch (status) {
    case 'Applied':
      return colors.statusApplied;
    case 'Interview':
      return colors.statusInterview;
    case 'Rejected':
      return colors.statusRejected;
    case 'Offer':
      return colors.statusOffer;
    default:
      return colors.textMuted;
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
          marginHorizontal: spacing.lg,
          marginVertical: spacing.sm,
          borderRadius: borderRadius.lg,
          padding: spacing.lg,
          ...shadows.medium,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: spacing.xs,
              }}
            >
              {internship.company}
            </Text>
            <Text
              style={{
                fontSize: typography.fontSize.md,
                fontWeight: '500',
                color: colors.primary,
                marginBottom: spacing.sm,
              }}
            >
              {internship.role}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View
                style={{
                  backgroundColor: getStatusColor(internship.status),
                  paddingHorizontal: spacing.sm,
                  paddingVertical: 4,
                  borderRadius: borderRadius.pill,
                  marginRight: spacing.sm,
                }}
              >
                <Text style={{ color: colors.white, fontSize: typography.fontSize.xs, fontWeight: '600' }}>
                  {internship.status}
                </Text>
              </View>
              <Text style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary, fontWeight: '400' }}>
                {new Date(internship.dateApplied).toLocaleDateString()}
              </Text>
            </View>
            {internship.notes ? (
              <Text
                style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.textSecondary,
                  fontStyle: 'italic',
                  marginTop: spacing.xs,
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
