import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { height } = Dimensions.get('window');

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  visible: boolean;
  type?: NotificationType;
  message: string;
  onHide: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  visible,
  type = 'success',
  message,
  onHide,
}) => {
  const slideAnim = new Animated.Value(200);

  useEffect(() => {
    if (visible) {
      // Show notification
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 100,
      }).start();

      // Auto hide after 2 seconds
      const timer = setTimeout(() => {
        hide();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hide = () => {
    Animated.spring(slideAnim, {
      toValue: 200,
      useNativeDriver: true,
      damping: 15,
      stiffness: 100,
    }).start(() => {
      onHide();
    });
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={40} color="green" />;
      case 'error':
        return <Ionicons name="alert-circle" size={40} color="red" />;
      case 'info':
        return <Ionicons name="information-circle" size={40} color="blue" />;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 300,
    bottom: -100,
    left: 0,
    right: 0,
    backgroundColor: "#183353D9",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    padding: 12,
  },
  message: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 