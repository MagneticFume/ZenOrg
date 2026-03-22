import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#2C2C2C',
  textSecondary: '#757575',
  border: '#E0E0E0',
  accent: '#5C6BC0',
  error: '#EF5350',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
