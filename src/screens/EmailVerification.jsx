import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Header from './ui/Header';
import TextInputField from './ui/TextInputField';
import Button from './ui/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
  },

  contentSection: {
    marginBottom: spacing[6],
  },

  illustrationContainer: {
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.large,
    padding: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
    minHeight: 200,
    ...shadows.subtle,
  },

  illustrationEmoji: {
    fontSize: 96,
    marginBottom: spacing[3],
  },

  headline: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.headline,
  },

  subtitle: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    lineHeight: 22,
    fontFamily: typography.fonts.body,
  },

  verificationMethod: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[3],
    marginBottom: spacing[3],
    borderWidth: 1.5,
    borderColor: colors.surfaceContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },

  verificationMethodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },

  methodIcon: {
    fontSize: 24,
    marginRight: spacing[3],
  },

  methodContent: {
    flex: 1,
  },

  methodTitle: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.body,
  },

  methodSubtitle: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
  },

  codeInputContainer: {
    marginVertical: spacing[4],
  },

  codeLabel: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  codeInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[2],
  },

  codeInput: {
    flex: 1,
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.primary,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    borderWidth: 1.5,
    borderColor: colors.surfaceContainer,
    paddingVertical: spacing[3],
    fontFamily: typography.fonts.headline,
  },

  codeInputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },

  resendContainer: {
    alignItems: 'center',
    marginVertical: spacing[4],
  },

  resendText: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  resendLink: {
    color: colors.primary,
    fontWeight: '600',
  },

  timer: {
    fontSize: typography.sizes.bodySmall,
    color: colors.error,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  termsText: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    lineHeight: 20,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.body,
  },

  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },

  buttonContainer: {
    gap: spacing[2],
  },
});

export const EmailVerificationScreen = ({
  email = 'student@university.edu',
  onVerify,
  onBack,
  mode = 'email', // 'email' | 'phone' | 'code'
}) => {
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [codeInputs, setCodeInputs] = useState(['', '', '', '', '', '']);
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(120);

  const handleCodeInput = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newInputs = [...codeInputs];
      newInputs[index] = value;
      setCodeInputs(newInputs);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput?.focus?.();
      }
    }
  };

  const verificationCode = codeInputs.join('');
  const isCodeValid = verificationCode.length === 6;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Verify Email"
        subtitle="Complete registration"
        showBackButton={true}
        onBackPress={onBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View style={styles.contentSection}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustrationEmoji}>✉️</Text>
          </View>

          <Text style={styles.headline}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to {email}. Enter the code below to
            complete your registration.
          </Text>
        </View>

        {/* Verification Methods */}
        <View style={styles.contentSection}>
          <TouchableOpacity
            style={[
              styles.verificationMethod,
              verificationMethod === 'email' && styles.verificationMethodActive,
            ]}
            onPress={() => setVerificationMethod('email')}
            activeOpacity={0.7}
          >
            <Text style={styles.methodIcon}>📧</Text>
            <View style={styles.methodContent}>
              <Text style={styles.methodTitle}>Email</Text>
              <Text style={styles.methodSubtitle}>
                Code sent to {email}
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                verificationMethod === 'email' && styles.radioActive,
              ]}
            >
              {verificationMethod === 'email' && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.verificationMethod,
              verificationMethod === 'phone' && styles.verificationMethodActive,
            ]}
            onPress={() => setVerificationMethod('phone')}
            activeOpacity={0.7}
          >
            <Text style={styles.methodIcon}>📱</Text>
            <View style={styles.methodContent}>
              <Text style={styles.methodTitle}>Phone (Optional)</Text>
              <Text style={styles.methodSubtitle}>
                Use SMS verification instead
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                verificationMethod === 'phone' && styles.radioActive,
              ]}
            >
              {verificationMethod === 'phone' && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Code Input */}
        <View style={styles.codeInputContainer}>
          <Text style={styles.codeLabel}>
            Enter 6-Digit Code
          </Text>
          <View style={styles.codeInputRow}>
            {codeInputs.map((digit, index) => (
              <TextInput
                key={index}
                id={`code-input-${index}`}
                style={[
                  styles.codeInput,
                  isFocused && styles.codeInputFocused,
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleCodeInput(index, value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="•"
                placeholderTextColor={colors.surfaceContainer}
              />
            ))}
          </View>
        </View>

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
            {timer > 0 && (
              <Text style={styles.timer}> ({timer}s)</Text>
            )}
          </Text>
        </View>

        {/* Terms */}
        <View style={styles.contentSection}>
          <Text style={styles.termsText}>
            By verifying this email, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Verify & Continue"
            onPress={() => onVerify?.({ code: verificationCode, method: verificationMethod })}
            variant="primary"
            fullWidth
            disabled={!isCodeValid}
          />
          <Button
            title="Cancel"
            onPress={onBack}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
