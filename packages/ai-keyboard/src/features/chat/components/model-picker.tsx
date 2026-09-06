import { useEffect, useMemo, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Icon, Menu, Text, useTheme } from "react-native-paper";
import { Colors, FontSize, Spacing } from "@/constants/theme";
import { models, type ModelId } from "@/features/chat/model/types";

const ROW_HEIGHT = 40;

/**
 * Model selector styled after the web prompt bar: a text trigger with a
 * chevron, opening an upward menu of rows (name · tag · check) with a
 * single highlight that glides to the hovered or selected row. Uses
 * Paper's `Menu` for outside-tap dismissal and anchor positioning.
 */
export function ModelPicker({
  selectedId,
  onSelect,
}: {
  selectedId: ModelId;
  onSelect: (modelId: ModelId) => void;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const selectedIndex = Math.max(
    0,
    models.findIndex((model) => model.id === selectedId),
  );
  const highlightY = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const target = (hovered ?? selectedIndex) * ROW_HEIGHT;
    Animated.spring(highlightY, {
      toValue: target,
      speed: 28,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  }, [hovered, selectedIndex, highlightY]);

  const mutedColor = theme.colors.onSurfaceVariant;

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchorPosition="top"
      contentStyle={{
        borderRadius: 10,
        padding: 4,
        width: 210,
        overflow: "hidden",
        backgroundColor: theme.colors.surfaceVariant,
        minHeight: 0,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }}
      anchor={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Choose model"
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen(true)}
          style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}
        >
          <Text style={[styles.triggerText, { color: theme.colors.onSurface }]}>
            {models[selectedIndex].label}
          </Text>
          <Icon
            source={open ? "chevron-up" : "chevron-down"}
            size={14}
            color={mutedColor}
          />
        </Pressable>
      }
    >
      <View style={{ height: models.length * ROW_HEIGHT }}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.highlight,
            { transform: [{ translateY: highlightY }] },
          ]}
        />
        {models.map((model, index) => {
          const selected = model.id === selectedId;
          return (
            <Pressable
              key={model.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => {
                onSelect(model.id);
                setOpen(false);
              }}
              onHoverIn={() => setHovered(index)}
              onHoverOut={() => setHovered(null)}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <Text
                style={[styles.rowName, { color: theme.colors.onSurface }]}
                numberOfLines={1}
              >
                {model.label}
              </Text>
              <Text style={[styles.rowTag, { color: mutedColor }]}>
                {model.tag}
              </Text>
              <View style={selected ? styles.checkShown : styles.checkHidden}>
                <Icon source="check" size={14} color={theme.colors.onSurface} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: 36,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
    backgroundColor: Colors.backgroundSelected,
  },
  pressed: { opacity: 0.7 },
  triggerText: { fontSize: FontSize.chatInput, fontFamily: "Geist_500Medium" },
  highlight: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: ROW_HEIGHT,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  row: {
    height: ROW_HEIGHT,
    borderRadius: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowName: {
    fontSize: FontSize.pickerName,
    fontFamily: "Geist_500Medium",
    flexShrink: 1,
  },
  rowTag: {
    fontSize: FontSize.pickerTag,
    fontFamily: "Geist_400Regular",
    marginLeft: "auto",
  },
  checkShown: {},
  checkHidden: { opacity: 0 },
});
