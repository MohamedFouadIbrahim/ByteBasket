import { useThemeColor } from '@/hooks';
import React from 'react';
import { StyleSheet, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_WIDTHS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%' as const,
};

export type ContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
};

export function Container({
  style,
  lightColor,
  darkColor,
  maxWidth = 'full',
  edges = ['right', 'left', 'top'],
  ...otherProps
}: ContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'Background');
  return (
    <SafeAreaView
      edges={edges}
      style={[
        { backgroundColor },
        styles.container,
        {
          maxWidth: MAX_WIDTHS[maxWidth],
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // alignSelf: 'center',
  },
});
