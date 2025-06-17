import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { ScreenBackground } from "../src/components/common/ScreenBackground";
import { COLORS } from "../src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../src/context/AuthenContext";

export default function IntroScreen() {
  // Create refs for animations to persist between renders
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    // Reset slideAnim to starting position when component mounts
    slideAnim.setValue(200);

    // Floating animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation for the musical note
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Cleanup function to reset animations when component unmounts
    return () => {
      floatAnim.setValue(0);
      pulseAnim.setValue(1);
      slideAnim.setValue(200);
    };
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  const { isAuthenticated } = useAuth();
  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/(app)/(tabs)/home");
    } else {
      router.push("/(auth)/login");
    }
  };
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
              <Image
                source={require("../assets/images/logo.png")}
                tintColor={"#75AAE9"}
                style={styles.logo}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.soundWave,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <Ionicons name="musical-notes" size={40} color={COLORS.white} />
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.bottomCard,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>LISTEN TO THE BEST</Text>
              <Text style={styles.title}>MUSIC EVERYDAY WITH</Text>
              <Text>
                <Text style={styles.brandText}>VIBRATUNE </Text>
                <Text style={styles.title}>NOW !</Text>
              </Text>
            </View>
            <Pressable style={styles.button} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "relative",
    marginBottom: "auto",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 230,
    height: 220,
    backgroundColor: "transparent",
    padding: 15,
  },
  soundWave: {
    position: "absolute",
    right: -10,
    top: "50%",
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    padding: 8,
  },
  bottomCard: {
    backgroundColor: "#C5D3E8D9",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    padding: 32,
    width: "120%",
    alignItems: "center",
    paddingBottom: 50,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 32,
  },
  brandText: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1B4372",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
