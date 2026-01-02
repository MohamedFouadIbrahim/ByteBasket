import { Platform } from 'react-native';

const tintColorLight = '#007AFF';
const tintColorDark = '#007AFF';

export const Colors = {
  light: {
    
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    Primary: "#007AFF",
    Secondary: "#5856D6",
    Background: "#F2F2F7",
    Text: "#000000",
    Success: "#34C759",
    Error: "#FF3B30"
  },
  dark: {
  
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    Primary: "#007AFF",
    Secondary: "#5856D6",
    Background: "#000000",
    Text: "#FFFFFF",
    Success: "#34C759",
    Error: "#FF3B30"
  },
  default: {
   tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    Primary: "#007AFF",
    Secondary: "#5856D6",
    Background: "#F2F2F7",
    Text: "#000000",
    Success: "#34C759",
    Error: "#FF3B30",
    Red:"#FF4444" 
  }
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
