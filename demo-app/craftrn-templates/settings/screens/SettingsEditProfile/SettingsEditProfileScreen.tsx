import { Button } from '@/craftrn-ui/components/Button';
import { InputText } from '@/craftrn-ui/components/InputText';
import { Text } from '@/craftrn-ui/components/Text';
import { useNavigation } from 'expo-router';
import React, { ComponentType, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

export const SettingsEditProfileScreen: ComponentType = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!hasError) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <InputText
              label="Full name"
              value={name}
              onChangeText={setName}
              error={nameError}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputText
              label="Email address"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSave} variant="primary">
          Save
        </Button>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    marginTop: theme.spacing.medium,
    marginBottom: UnistylesRuntime.insets.bottom,
  },
  scrollContent: {
    gap: theme.spacing.small,
    paddingBottom: theme.spacing.xxlarge,
  },
  sectionHeader: {
    ...theme.textVariants.body3,
    fontWeight: 'bold',
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.large,
  },
  formContainer: {
    paddingHorizontal: theme.spacing.large,
  },
  inputContainer: {
    marginBottom: theme.spacing.large,
  },
  buttonContainer: {
    marginHorizontal: theme.spacing.large,
    marginTop: theme.spacing.large,
  },
}));
