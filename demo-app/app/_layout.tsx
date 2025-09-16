import { FloatingBackButton } from '@/components/FloatingBackButton';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UnistylesRuntime } from 'react-native-unistyles';

// Disable yellow box warnings in development
if (__DEV__) {
  LogBox.ignoreAllLogs(true);
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const shouldShowFloatingButton = pathname !== '/';

  useEffect(() => {
    UnistylesRuntime.setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }

    onFetchUpdateAsync();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      <SafeAreaProvider style={{ flex: 1 }}>
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          {shouldShowFloatingButton && <FloatingBackButton />}
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
