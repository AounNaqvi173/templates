import { Button } from '@/craftrn-ui/components/Button';
import { Card } from '@/craftrn-ui/components/Card';
import { InputText } from '@/craftrn-ui/components/InputText';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import React, { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import AccordionItem from './AccordionItem';
import { Divider } from './Divider';
import { SectionHeader } from './SectionHeader';
import { profileData } from './data/profileData';

export const PersonalInformation: React.FC = () => {
  const { styles } = useStyles(stylesheet);

  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isNameExpanded, setIsNameExpanded] = useState(false);
  const [isEmailExpanded, setIsEmailExpanded] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleNameEdit = () => {
    if (!isNameExpanded) {
      setNameError('');
    } else if (isNameExpanded) {
      setName(profileData.name);
    }
    setIsNameExpanded(!isNameExpanded);
  };

  const toggleEmailEdit = () => {
    if (!isEmailExpanded) {
      setEmailError('');
    } else if (isEmailExpanded) {
      setEmail(profileData.email);
    }
    setIsEmailExpanded(!isEmailExpanded);
  };

  const handleSaveName = () => {
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    setNameError('');
    setIsNameExpanded(false);
  };

  const handleSaveEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setIsEmailExpanded(false);
  };

  return (
    <>
      <SectionHeader>Personal Information</SectionHeader>
      <Card>
        <ListItem
          style={styles.settingsItem}
          text="Member Since"
          textBelow={profileData.memberSince}
        />
        <Divider />
        <ListItem
          style={styles.settingsItem}
          text="Full Name"
          textBelow={
            isNameExpanded ? 'This must be your full legal name' : name
          }
          onPress={toggleNameEdit}
          itemRight={
            <Text style={styles.editText}>
              {isNameExpanded ? 'Cancel' : 'Edit'}
            </Text>
          }
        />
        <AccordionItem
          isExpanded={isNameExpanded}
          viewKey="name"
          style={styles.accordionContainer}
          duration={300}
        >
          <View style={styles.accordionContent}>
            <InputText
              value={name}
              onChangeText={setName}
              error={nameError}
              autoCapitalize="words"
              autoCorrect={false}
            />
            <View style={styles.accordionButton}>
              <Button onPress={handleSaveName}>
                Save
              </Button>
            </View>
          </View>
        </AccordionItem>
        <Divider />
        <ListItem
          style={styles.settingsItem}
          text="Email Address"
          textBelow={
            isEmailExpanded
              ? 'This email will be used for account notifications'
              : email
          }
          onPress={toggleEmailEdit}
          itemRight={
            <Text style={styles.editText}>
              {isEmailExpanded ? 'Cancel' : 'Edit'}
            </Text>
          }
        />
        <AccordionItem
          isExpanded={isEmailExpanded}
          viewKey="email"
          style={styles.accordionContainer}
          duration={300}
        >
          <View style={styles.accordionContent}>
            <InputText
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.accordionButton}>
              <Button onPress={handleSaveEmail}>
                Save
              </Button>
            </View>
          </View>
        </AccordionItem>
        <Divider />
      </Card>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  accordionContainer: {
    overflow: 'hidden',
  },
  accordionContent: {
    padding: theme.spacing.large,
    paddingTop: theme.spacing.small,
    backgroundColor: theme.colors.surfacePrimary,
    gap: theme.spacing.medium,
  },
  accordionButton: {
    width: '50%',
  },
  settingsItem: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    minHeight: 56,
  },
  editText: {
    ...theme.textVariants.body2,
    color: theme.colors.contentAccent,
    fontWeight: 'bold',
  },
}));
