import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../styles/theme';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius.xlarge,
    borderTopRightRadius: borderRadius.xlarge,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    paddingTop: spacing[3],
    maxHeight: '80%',
    ...shadows.elevated,
  },

  dragHandle: {
    height: 4,
    width: 40,
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing[3],
  },

  title: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.headline,
  },

  description: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    marginBottom: spacing[4],
    lineHeight: 22,
    fontFamily: typography.fonts.body,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: spacing[2],
    marginTop: spacing[3],
  },

  button: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: borderRadius.xlarge,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButton: {
    backgroundColor: colors.primary,
  },

  secondaryButton: {
    backgroundColor: colors.secondaryContainer,
  },

  buttonText: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  primaryButtonText: {
    color: colors.white,
  },

  secondaryButtonText: {
    color: colors.secondary,
  },
});

export const BottomSheet = ({
  visible,
  title,
  description,
  children,
  actions = [],
  onClose,
  onAction,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <View style={styles.dragHandle} />
          
          {title && <Text style={styles.title}>{title}</Text>}
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          {children}

          {actions.length > 0 && (
            <View style={styles.buttonContainer}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    action.variant === 'primary'
                      ? styles.primaryButton
                      : styles.secondaryButton,
                  ]}
                  onPress={() => onAction?.(action.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      action.variant === 'primary'
                        ? styles.primaryButtonText
                        : styles.secondaryButtonText,
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
