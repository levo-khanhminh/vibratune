import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface TrackMenuProps {
  onAddToQueue?: () => void;
  onRemoveFromQueue?: () => void;
  onToggleFavorite?: () => void;
  isInQueue?: boolean;
  isFavorite?: boolean;
}

export default function TrackMenu({
  onAddToQueue,
  onRemoveFromQueue,
  onToggleFavorite,
  isInQueue,
  isFavorite = false,
}: TrackMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.menuButton}
      >
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color="rgba(255,255,255,0.8)"
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.menuContainer}>
            {isInQueue ? (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onRemoveFromQueue?.();
                  setMenuVisible(false);
                }}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="#ff4444"
                />
                <Text style={[styles.menuText, { color: "#ff4444" }]}>
                  Remove from Queue
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onAddToQueue?.();
                  setMenuVisible(false);
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color="#9FE870" />
                <Text style={styles.menuText}>Add to Queue</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onToggleFavorite?.();
                setMenuVisible(false);
              }}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#ff4444" : "#fff"}
              />
              <Text style={styles.menuText}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onToggleFavorite?.();
                setMenuVisible(false);
              }}
            >
              <Ionicons
                name={"add"}
                size={24}
                color={isFavorite ? "#ff4444" : "#fff"}
              />
              <Text style={styles.menuText}>Save to playlist</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    backgroundColor: "rgba(40,40,40,0.9)",
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
});
