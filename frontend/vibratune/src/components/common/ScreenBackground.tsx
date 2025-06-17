import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";

type Props = {
  children?: React.ReactNode;
};

export function ScreenBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary, COLORS.secondary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.7, 1]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
  },
});
