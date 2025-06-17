// screens/SettingsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../../src/context/AuthenContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { useNotification } from "../../../../src/context/NotificationContext";

const SettingsScreen = () => {
  const { user, logout, isLoading } = useAuth();
  const { notify } = useNotification();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#132840", "#000000", "#000000"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 150,
            }}
          >
            Profile & Setting
          </Text>
        </View>
      </LinearGradient>
      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await logout();
            notify("Successfully logout", "success");
            console.log("Ok 1");
            router.replace("/(auth)/login");
            console.log("Ok 2");
          } catch (error: any) {
            notify("Error with logout : " + error.message, "error");
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="log-out" size={24} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerGradient: {
    paddingTop: 44,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  settingsOptions: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9FE870",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
