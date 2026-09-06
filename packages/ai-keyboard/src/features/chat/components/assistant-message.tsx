import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { Spacing, FontSize } from "@/constants/theme";
import { LoadingGrid } from "@/features/chat/components/loading-grid";
import type { ChatSource } from "@/features/chat/model/types";

function useElapsedSeconds() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 100);
    return () => clearInterval(interval);
  }, []);
  return seconds;
}

function LoadingIntro({ mutedColor }: { mutedColor: string }) {
  const deciseconds = useElapsedSeconds();
  const total = deciseconds / 10;
  const elapsed =
    total < 60
      ? `${total.toFixed(1)}s`
      : `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;

  return (
    <View style={styles.loadingIntroRow}>
      <LoadingGrid />
      <Text style={[styles.loadingIntroLabel, { color: mutedColor }]}>
        Leptos thinking
      </Text>
      <Text style={[styles.loadingIntroTimer, { color: mutedColor }]}>
        {elapsed}
      </Text>
    </View>
  );
}

function useBlink(active: boolean) {
  const opacity = useMemo(() => new Animated.Value(0), []);
  useEffect(() => {
    if (!active) {
      opacity.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.15,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, opacity]);
  return opacity;
}

function SourceAvatar({
  source,
  size,
  ringColor,
}: {
  source: ChatSource;
  size: number;
  ringColor: string;
}) {
  return (
    <View
      style={[
        styles.avatarRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: ringColor,
        },
      ]}
    >
      <Image
        source={{ uri: source.imageUri }}
        style={{
          width: size - 3,
          height: size - 3,
          borderRadius: (size - 3) / 2,
        }}
      />
    </View>
  );
}

function AssistantMessage({
  text,
  streaming = false,
  showLoadingIntro = false,
  sources = [],
  followUps = [],
  onFollowUp,
  onRetry,
}: {
  text: string;
  streaming?: boolean;
  showLoadingIntro?: boolean;
  sources?: ChatSource[];
  followUps?: string[];
  onFollowUp?: (text: string, index: number) => void;
  onRetry?: () => void;
}) {
  const theme = useTheme();
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const caretOpacity = useBlink(streaming);
  const inkColor = theme.colors.onBackground;
  const mutedColor = theme.colors.onSurfaceVariant;
  const actionsVisible = !streaming;

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      {showLoadingIntro && <LoadingIntro mutedColor={mutedColor} />}
      <Text style={[styles.messageText, { color: inkColor }]}>
        {text}
        {streaming && text.length > 0 && (
          <Animated.View
            style={[
              styles.caret,
              { backgroundColor: inkColor, opacity: caretOpacity },
            ]}
          />
        )}
      </Text>

      <View
        style={[styles.actionsRow, { opacity: actionsVisible ? 1 : 0 }]}
        pointerEvents={actionsVisible ? "auto" : "none"}
      >
        {[
          { icon: "content-copy", label: "Copy", onPress: undefined },
          { icon: "refresh", label: "Retry", onPress: onRetry },
          {
            icon: "thumb-up-outline",
            label: "Good response",
            onPress: undefined,
          },
          {
            icon: "thumb-down-outline",
            label: "Bad response",
            onPress: undefined,
          },
        ].map((action) => (
          <Pressable
            key={action.icon}
            accessibilityLabel={action.label}
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionPressed,
            ]}
          >
            <Icon source={action.icon} size={20} color={mutedColor} />
          </Pressable>
        ))}

        {sources.length > 0 && (
          <Pressable
            accessibilityLabel="Toggle sources"
            accessibilityState={{ expanded: sourcesOpen }}
            onPress={() => setSourcesOpen((open) => !open)}
            style={({ pressed }) => [
              styles.sourcesToggle,
              pressed && styles.actionPressed,
            ]}
          >
            <View style={styles.avatarStack}>
              {sources.slice(0, 3).map((source, index) => (
                <View
                  key={source.domain}
                  style={{ marginLeft: index === 0 ? 0 : -6 }}
                >
                  <SourceAvatar
                    source={source}
                    size={16}
                    ringColor={theme.colors.background}
                  />
                </View>
              ))}
            </View>
            <Text style={[styles.sourcesLabel, { color: mutedColor }]}>
              {sources.length} sources
            </Text>
            <Icon
              source={sourcesOpen ? "chevron-up" : "chevron-down"}
              size={14}
              color={mutedColor}
            />
          </Pressable>
        )}
      </View>

      {sources.length > 0 && sourcesOpen && (
        <View
          style={[
            styles.sourcesList,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          {sources.map((source) => (
            <Pressable
              key={source.domain}
              accessibilityRole="link"
              onPress={() => void Linking.openURL(source.href).catch(() => {})}
              style={({ pressed }) => [
                styles.sourceRow,
                pressed && styles.actionPressed,
              ]}
            >
              <SourceAvatar
                source={source}
                size={20}
                ringColor={theme.colors.surfaceVariant}
              />
              <Text
                style={[styles.sourceName, { color: inkColor }]}
                numberOfLines={1}
              >
                {source.name}
              </Text>
              <Text
                style={[styles.sourceDomain, { color: mutedColor }]}
                numberOfLines={1}
              >
                {source.domain}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {followUps.length > 0 && !streaming && (
        <View style={styles.followUpsWrap}>
          <Text style={[styles.followUpsLabel, { color: mutedColor }]}>
            Follow-ups
          </Text>
          <View style={styles.followUpsList}>
            {followUps.map((prompt, index) => (
              <Pressable
                key={prompt}
                accessibilityRole="button"
                onPress={() => onFollowUp?.(prompt, index)}
                style={({ pressed }) => [
                  styles.followUpRow,
                  { borderColor: theme.colors.outlineVariant },
                  pressed && styles.actionPressed,
                ]}
              >
                <Icon source="arrow-bottom-left" size={12} color={mutedColor} />
                <Text style={[styles.followUpText, { color: inkColor }]}>
                  {prompt}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: FontSize.assistantMessage,
    lineHeight: FontSize.assistantMessage * 1.55,
    fontFamily: "EBGaramond_400Regular",
  },
  loadingIntroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  loadingIntroLabel: {
    fontSize: FontSize.label,
    fontFamily: "Geist_500Medium",
  },
  loadingIntroTimer: {
    fontVariant: ["tabular-nums"],
    fontSize: FontSize.timer,
    fontFamily: "Geist_400Regular",
  },
  caret: {
    width: 2.5,
    height: 13,
    borderRadius: 2,
    alignSelf: "center",
    marginLeft: 3,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: Spacing.two,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionPressed: { opacity: 0.7 },
  sourcesToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 6,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  avatarStack: { flexDirection: "row" },
  avatarRing: { borderWidth: 1.5, overflow: "hidden" },
  sourcesLabel: { fontSize: FontSize.label, fontFamily: "Geist_400Regular" },
  sourcesList: {
    marginTop: Spacing.one,
    borderRadius: 10,
    padding: 4,
    gap: 2,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  sourceName: {
    fontSize: FontSize.label,
    fontFamily: "Geist_500Medium",
    flexShrink: 1,
  },
  sourceDomain: {
    fontSize: FontSize.domain,
    fontFamily: "Geist_400Regular",
    marginLeft: "auto",
  },
  followUpsWrap: { marginTop: Spacing.two },
  followUpsLabel: {
    fontSize: FontSize.label,
    fontFamily: "Geist_500Medium",
    marginBottom: 2,
  },
  followUpsList: { gap: 0 },
  followUpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  followUpText: {
    fontSize: FontSize.followUp,
    fontFamily: "Geist_400Regular",
    flexShrink: 1,
  },
});

export { AssistantMessage };
