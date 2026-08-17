import { Button as PaperButton } from 'react-native-paper';

import { unifiedColors, type ButtonProps } from '@alwinsden-unified-ui/core';

export function RnButton({ children, onPress, disabled = false, accessibilityLabel }: ButtonProps) {
  return (
    <PaperButton
      mode="contained"
      buttonColor={unifiedColors.buttonPrimary}
      textColor={unifiedColors.buttonText}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}>
      {children}
    </PaperButton>
  );
}
