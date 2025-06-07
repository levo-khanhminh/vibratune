import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  SafeAreaView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useNotification } from '../../src/context/NotificationContext';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { notify } = useNotification();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would normally make an API call to reset the password
      notify('Password reset successful!', 'success');
      router.replace('/(auth)/login');
    } catch (error) {
      notify('Password reset failed. Please try again.', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
           

            <View style={styles.header}>
              <Text style={styles.title}>Reset password</Text>
            </View>

            <View style={styles.formContainer}>
              <Controller
                control={control}
                rules={{
                  required: 'New password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                }}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputWrapper}>
                    <View style={[styles.inputContainer, errors.newPassword && styles.inputError]}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="New password...."
                        placeholderTextColor="#666"
                        secureTextEntry={!showNewPassword}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                      >
                        <Ionicons 
                          name={showNewPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#666" 
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: 'Please confirm your password',
                  validate: value => value === newPassword || 'Passwords do not match'
                }}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputWrapper}>
                    <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm password...."
                        placeholderTextColor="#666"
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Ionicons 
                          name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#666" 
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                  </View>
                )}
              />

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
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
    paddingTop: 150,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 8,
    opacity: 0.7,
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 20,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#1B4372',
    borderRadius: 16,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 