import type { ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: {},
  className?: string
};
