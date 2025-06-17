import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="detail-album"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          headerTitle: "Album Detail",
        }}
      />
      <Stack.Screen
        name="detail-artists"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          headerTitle: "Album Detail",
        }}
      />
      <Stack.Screen
        name="setting"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          headerTitle: "Setting",
        }}
      />
    </Stack>
  );
}
