import { Link, router, useRouter } from "expo-router";
import React, { useState } from "react";
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
import { useNotification } from "../../src/context/NotificationContext";
import { useAuth } from "../../src/context/AuthenContext";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function SignupScreen() {
  const { notify } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { signUp } = useAuth();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      // const res = await signUp(data.email, data.password, data.username);
      // router.push(`/verify?type=email-verification?email=${data.email}`);
      // notify("Signup successful", "success");
      router.push(`/(auth)/verify?type=email-verification&email=` + data.email);
    } catch (error: any) {
      notify(error.message, "error");
      router.replace("/(auth)/signup");
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
            <Text style={styles.title}>Create your Account</Text>

            <View style={styles.formContainer}>
              <Controller
                control={control}
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputWrapper}>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.username && styles.inputError,
                      ]}
                    >
                      <View style={styles.inputIcon}>
                        <Ionicons
                          name="person-outline"
                          size={20}
                          color="#666"
                        />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="User name....."
                        placeholderTextColor="#666"
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.username && (
                      <Text style={styles.errorText}>
                        {errors.username.message}
                      </Text>
                    )}
                  </View>
                )}
              />

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

              <Controller
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputWrapper}>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.password && styles.inputError,
                      ]}
                    >
                      <View style={styles.inputIcon}>
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color="#666"
                        />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Password....."
                        placeholderTextColor="#666"
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-outline" : "eye-off-outline"
                          }
                          size={20}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.signUpButtonText}>Sign up</Text>
              </TouchableOpacity>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
              </View>
              <TouchableOpacity style={styles.googleButton}>
                <Ionicons
                  name="logo-google"
                  size={20}
                  color="white"
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Login</Text>
                  </TouchableOpacity>
                </Link>
              </View>
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
  eyeIcon: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(0, 0, 0, 0.1)",
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
  signUpButton: {
    backgroundColor: "#1B4372",
    borderRadius: 16,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  googleButton: {
    backgroundColor: "rgba(27, 67, 114, 0.7)",
    borderRadius: 16,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  loginText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginRight: 8,
  },
  loginLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  dividerText: {
    color: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
});
