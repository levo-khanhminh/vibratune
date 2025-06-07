import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/colors';
import { useNotification } from '../../src/context/NotificationContext';

export default function VerifyScreen() {
  const router = useRouter();
  const {type} =  useLocalSearchParams();
  const { notify } = useNotification();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    // Mock verification - replace with actual verification logic
    if (otpValue === '123456') {
      notify('Verification successful', 'success');
      console.log(type);
      if(type){
        switch(type){
            case 'email-verification':
                router.push('/(auth)/login');
                break;
            case 'forgot-password':
                router.push('/(auth)/reset-password');
                break;
            default:
                router.push('/(auth)/login');
                break;
        }
      }
    //   router.push('/(auth)/reset-password');
    } else {
      notify('Invalid OTP. Please try again.', 'error');
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    notify('New OTP sent to your email', 'info');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to your email</Text>

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              style={[
                styles.otpInput, 
                otp[index] ? styles.otpInputFilled : null,
                error ? styles.otpInputError : null
              ]}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(value) => handleOtpChange(value, index)}
              value={otp[index]}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={[
            styles.verifyButton,
            otp.every(digit => digit !== '') ? styles.verifyButtonActive : {}
          ]}
          onPress={handleVerify}
          disabled={!otp.every(digit => digit !== '')}
        >
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.resendButton} 
          onPress={handleResendOtp}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 150,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '600',
  },
  otpInputFilled: {
    backgroundColor: 'white',
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  otpInputError: {
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: 'rgba(27, 67, 114, 0.7)',
    width: '100%',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: '#1B4372',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  resendButton: {
    marginTop: 20,
    padding: 10,
  },
  resendText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
}); 