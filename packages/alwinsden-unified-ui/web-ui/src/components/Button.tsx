import { type ButtonProps } from '@alwinsden-unified-ui/core';

export function WebButton({ children, onPress, disabled = false, accessibilityLabel, style, className }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      aria-label={accessibilityLabel}
      className={className || ""}
      style={{
        ...style
      }}
    >
      {children}
    </button>
  );
}
