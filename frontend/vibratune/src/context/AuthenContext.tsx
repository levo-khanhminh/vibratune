import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useNotification } from "./NotificationContext";

// --- Types ---
interface AuthTokens {
  access_token: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  verifyEmail: (otp: string, email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyResetPassword: (
    otp: string,
    newPassword: string,
    email: string
  ) => Promise<void>;
}

// --- Constants ---
export const BASE_URL = "https://94d8-27-2-118-138.ngrok-free.app";
const TOKEN_KEY = "access_token";

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
};

const storeAccessToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (err) {
    console.error("Failed to store token", err);
  }
};
const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error("Failed to clear token", err);
  }
};
type CustomAxiosConfig = AxiosRequestConfig & { url: string }; // force url to exist

export const apiCall = async <T = any,>(
  config: CustomAxiosConfig
): Promise<T> => {
  const token = await getToken();

  if (!token) {
    throw new Error("401 - Unauthenticated");
  }
  try {
    const res = await axios({
      ...config,
      baseURL: BASE_URL,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("401 - Unauthenticated");
    }

    throw error;
  }
};
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { notify } = useNotification();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // no loading on mount anymore

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { access_token } = await axios
        .post(`${BASE_URL}/auth/login`, { email, password })
        .then((res) => res.data);
      await storeAccessToken(access_token);
      const userData = await apiCall<any>({ method: "get", url: "/users/me" });
      const { id, fullName } = userData;
      const authenticatedUser = {
        id: id,
        email: email,
        name: fullName,
      };
      setUser(authenticatedUser);
      setIsAuthenticated(true);
    } catch (err: any) {
      if (err.response && err.respons.data) {
        throw new Error(err.response.data.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      console.log(email, password, username);
      console.log("Sign Up hit");
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        username,
        password,
      });
    } catch (error: any) {
      console.error("Sign up failed:");
      if (error.response) {
        console.log(error.response.data);
        throw new Error(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (otp: string, email: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/auth/verify`, {
        email: email,
        verificationCode: otp,
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        throw new Error(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      console.log(email);
      const res = await axios.post(
        `${BASE_URL}/auth/reset-password?email=${email}`
      );
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        throw new Error(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const verifyResetPassword = async (
    otp: string,
    newPassword: string,
    email: string
  ) => {
    setIsLoading(true);
    console.log(otp, newPassword, email);
    try {
      await axios.post(`${BASE_URL}/auth/verifyResetPassword`, {
        email: email,
        newPassword: newPassword,
        resetPasswordVerificationCode: otp,
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        throw new Error(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      signUp,
      verifyEmail,
      resetPassword,
      verifyResetPassword,
    }),
    [user, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
