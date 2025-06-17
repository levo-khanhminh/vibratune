import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export default function Header({
  username,
  avatarUrl = "https://placekitten.com/100/100",
  onNotificationPress,
  onAvatarPress,
}: HeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => router.push("/(app)/(tabs)/home/setting")}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/positive-person-listening-music-wireless-headphones-enjoying-audio-sound-mp3-song-headset-confident-guy-using-earphones-enjoy-stereo-record-radio-rhythm-studio_482257-40413.jpg",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#9B9B9B",
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
