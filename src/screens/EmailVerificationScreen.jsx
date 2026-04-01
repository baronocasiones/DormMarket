import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import Header from '../components/Header';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollContent: {
    flexGrow: 1,
    padding: spacing[4],
  },
  
  section: {
    marginBottom: spacing[6],
  },
  
  description: {
    fontSize: 14,
    color: colors.onSurfaceLight,
    lineHeight: 22,
    marginBottom: spacing[4],
  },
  
  inputContainer: {
    marginBottom: spacing[4],
  },
  
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
  },
  
  input: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    fontSize: 16,
    color: colors.onSurface,
  },
  
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  
  codeInput: {
    width: '18%',
    height: 50,
    borderRadius: borderRadius.medium,
    borderWidth: 2,
    borderColor: colors.surfaceContainer,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.surfaceContainerLowest,
  },
  
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing[4],
    padding: spacing[3],
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.medium,
  },
  
  timerText: {
    fontSize: 13,
    color: colors.onSurfaceLight,
  },
  
  timerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing[3],
  },
  
  resendText: {
    fontSize: 13,
    color: colors.onSurfaceLight,
  },
  
  resendButton: {
    marginLeft: spacing[2],
  },
  
  resendButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  
  stepIndicator: {
    flexDirection: 'row',
    marginBottom: spacing[6],
  },
  
  step: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 2,
    marginRight: spacing[2],
  },
  
  stepActive: {
    backgroundColor: colors.primary,
  },
});

export const EmailVerificationScreen = ({ navigation }) => {
  const [step, setStep] = useState('email'); // email, otp, verification
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  
  React.useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);
  
  const handleEmailSubmit = () => {
    if (email.includes('@')) {
      setStep('otp');
      setTimer(60);
    }
  };
  
  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        // In a real implementation, would focus next TextInput
      }
    }
  };
  
  const handleVerify = () => {
    setStep('verification');
    setTimeout(() => {
      navigation.navigate('SelectCampus');
    }, 1500);
  };
  
  const handleResend = () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Verify Your Email"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={[styles.step, step === 'email' && styles.stepActive]} />
          <View style={[styles.step, (step === 'otp' || step === 'verification') && styles.stepActive]} />
          <View style={[styles.step, step === 'verification' && styles.stepActive]} />
        </View>
        
        {/* Email Step */}
        {step === 'email' && (
          <View style={styles.section}>
            <Text style={styles.description}>
              Enter your university email address to get started.
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="student@university.edu"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <Button
              title="Send Verification Code"
              onPress={handleEmailSubmit}
              disabled={!email}
            />
          </View>
        )}
        
        {/* OTP Step */}
        {(step === 'otp' || step === 'verification') && (
          <View style={styles.section}>
            <Text style={styles.description}>
              Enter the 6-digit code sent to {email}
            </Text>
            
            <View style={styles.codeContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={(val) => handleOtpChange(index, val)}
                  editable={step === 'otp'}
                />
              ))}
            </View>
            
            {step === 'otp' && (
              <>
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>Resend code in:</Text>
                  <Text style={styles.timerValue}>
                    {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </Text>
                </View>
                
                <Button
                  title="Verify Code"
                  onPress={handleVerify}
                  disabled={otp.some((val) => !val)}
                />
                
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive code?</Text>
                  <TouchableOpacity
                    style={styles.resendButton}
                    onPress={handleResend}
                    disabled={timer > 0}
                  >
                    <Text style={[styles.resendButtonText, timer > 0 && { opacity: 0.5 }]}>
                      Resend
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
            {step === 'verification' && (
              <View style={{ alignItems: 'center', paddingVertical: spacing[4] }}>
                <Text style={{ fontSize: 32, marginBottom: spacing[2] }}>✓</Text>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.primary }}>
                  Email Verified!
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
