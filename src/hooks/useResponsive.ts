import { Platform, useWindowDimensions } from 'react-native';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveValues<T> {
  mobile: T;
  tablet?: T;
  desktop?: T;
}

export interface ResponsiveHook {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  isNative: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  breakpoint: Breakpoint;
  select: <T>(values: ResponsiveValues<T>) => T;
}

export function useResponsive(): ResponsiveHook {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;
  const isPortrait = height > width;
  const isLandscape = width > height;

  const breakpoint: Breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  
  const select = <T,>(values: ResponsiveValues<T>): T => {
    if (isDesktop) {
      return values.desktop ?? values.tablet ?? values.mobile;
    }
    if (isTablet) {
      return values.tablet ?? values.mobile;
    }
    return values.mobile;
  };

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isWeb,
    isNative,
    isPortrait,
    isLandscape,
    breakpoint,
    select,
  };
}
