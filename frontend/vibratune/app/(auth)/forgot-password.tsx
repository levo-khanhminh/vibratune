import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthenContext";
import { useNotification } from "../../src/context/NotificationContext";
import axios from "axios";

type FormData = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });
  const { resetPassword } = useAuth();
  const { notify } = useNotification();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await resetPassword(data.email);
      notify("Successfully sent code to reset", "success");
      router.push(`/(auth)/verify?type=forgot-password&email=` + data.email);
    } catch (error: any) {
      notify("Error : " + error.message, "error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.title}>Forgot password ?</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Enter your email</Text>
              <Text style={[styles.subtitle, { fontSize: 12 }]}>
                We will send the 6 digit verification code
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputWrapper}>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.email && styles.inputError,
                      ]}
                    >
                      <View style={styles.inputIcon}>
                        <Ionicons name="mail-outline" size={20} color="#666" />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Email....."
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.email && (
                      <Text style={styles.errorText}>
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.generateButtonText}>Generate OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    height: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputIcon: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: "#ff6b6b",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 20,
    fontWeight: "500",
  },
  generateButton: {
    backgroundColor: "#1B4372",
    borderRadius: 16,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  generateButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
