import { Stack, useRouter } from 'expo-router';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenBackground } from '../../src/components/common/ScreenBackground';

export default function AuthLayout() {
    const router = useRouter();

    const handleBack = () => {
        console.log('handleBack');
        router.replace('/');  // Navigate to root
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenBackground>
                <Stack
                    screenOptions={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTintColor: "white",
                        headerTitle: "",
                        animation: 'slide_from_right',
                        contentStyle: {
                            backgroundColor: 'transparent',
                        }
                    }}
                >
                    <Stack.Screen name="login" options={{headerShown: true}} />
                    <Stack.Screen name="signup" />
                    <Stack.Screen 
                        name="forgot-password" 
                        options={{
                            presentation: 'modal',
                        
                        }}
                    />
                     <Stack.Screen 
                        name="reset-password" 
                        options={{
                            presentation: 'modal',
                            headerShown: true,
                        }}
                    />
                </Stack>
            </ScreenBackground>
        </View>
    );
} 