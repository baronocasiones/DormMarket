import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Header from '../components/ui/Header';
import Avatar from '../components/ui/Avatar';
import BottomTabBar from '../components/ui/BottomTabBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  chatList: {
    flex: 1,
  },

  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
    alignItems: 'center',
  },

  conversationItemActive: {
    backgroundColor: colors.surfaceContainerLow,
  },

  avatarContainer: {
    marginRight: spacing[3],
    position: 'relative',
  },

  unreadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },

  unreadBadgeText: {
    color: colors.white,
    fontSize: typography.sizes.labelSmall,
    fontWeight: '700',
    fontFamily: typography.fonts.body,
  },

  conversationContent: {
    flex: 1,
  },

  conversationName: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.body,
  },

  conversationPreview: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  conversationPreviewUnread: {
    fontWeight: '600',
    color: colors.onSurface,
  },

  conversationTime: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    marginLeft: spacing[2],
    fontFamily: typography.fonts.body,
  },

  chatScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  messagesContainer: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },

  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.large,
    marginVertical: spacing[1],
  },

  messageBubleSent: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },

  messageBubbleReceived: {
    backgroundColor: colors.surfaceContainer,
    alignSelf: 'flex-start',
  },

  messageSentText: {
    color: colors.white,
    fontSize: typography.sizes.bodyMedium,
    fontFamily: typography.fonts.body,
  },

  messageReceivedText: {
    color: colors.onSurface,
    fontSize: typography.sizes.bodyMedium,
    fontFamily: typography.fonts.body,
  },

  messageTime: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
    fontFamily: typography.fonts.body,
  },

  messageGroup: {
    marginVertical: spacing[2],
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    gap: spacing[2],
  },

  inputField: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurface,
    fontFamily: typography.fonts.body,
    maxHeight: 100,
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendIcon: {
    fontSize: 18,
    color: colors.white,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing[3],
  },

  emptyText: {
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    textAlign: 'center',
    fontFamily: typography.fonts.body,
  },

  emptySubtext: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    textAlign: 'center',
    fontFamily: typography.fonts.body,
  },
});

const CONVERSATIONS = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'JS',
    lastMessage: 'Is this still available?',
    timestamp: '2m',
    unread: 2,
    isActive: true,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'SC',
    lastMessage: 'Great, I\'ll be there at 3pm',
    timestamp: '1h',
    unread: 0,
    isActive: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: 'MJ',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '3h',
    unread: 0,
    isActive: false,
  },
];

const SAMPLE_MESSAGES = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi! Is the calculus textbook still available?',
    timestamp: '2:15 PM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Yes, it\'s in great condition!',
    timestamp: '2:16 PM',
  },
  {
    id: 3,
    sender: 'other',
    text: 'What\'s the lowest price you\'d accept?',
    timestamp: '2:18 PM',
  },
  {
    id: 4,
    sender: 'me',
    text: 'I\'m asking $40, but I\'m open to negotiating.',
    timestamp: '2:19 PM',
  },
];

export const InAppMessagingScreen = ({
  view = 'list',
  onConversationPress,
  onBack,
  onTabPress,
  activeTab = 'messages',
}) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: messageText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setMessageText('');
    }
  };

  // Conversation List View
  if (view === 'list') {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Messages"
          subtitle="Your conversations"
          showBackButton={false}
          rightActions={[{ id: 'new', icon: '✎' }]}
          onRightActionPress={(id) => {
            if (id === 'new') {
              // Handle new message
            }
          }}
        />

        <FlatList
          data={CONVERSATIONS}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.conversationItem,
                item.isActive && styles.conversationItemActive,
              ]}
              onPress={() => onConversationPress?.(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Avatar name={item.avatar} size="medium" />
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>
                      {item.unread > 9 ? '9+' : item.unread}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.conversationContent}>
                <Text style={styles.conversationName}>{item.name}</Text>
                <Text
                  style={[
                    styles.conversationPreview,
                    item.unread > 0 && styles.conversationPreviewUnread,
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>
              <Text style={styles.conversationTime}>{item.timestamp}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>
                Start conversations by messaging sellers or buyers
              </Text>
            </View>
          }
          scrollEnabled={true}
        />

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={onTabPress}
          badgeCount={{ messages: 2 }}
        />
      </SafeAreaView>
    );
  }

  // Chat View
  return (
    <SafeAreaView style={[styles.container, styles.chatScreen]}>
      <Header
        title={CONVERSATIONS[0]?.name || 'Chat'}
        subtitle="Available now"
        showBackButton={true}
        onBackPress={onBack}
        rightActions={[{ id: 'info', icon: 'ⓘ' }]}
      />

      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View key={message.id} style={styles.messageGroup}>
            <View
              style={[
                styles.messageBubble,
                message.sender === 'me'
                  ? styles.messageBubleSent
                  : styles.messageBubbleReceived,
              ]}
            >
              <Text
                style={
                  message.sender === 'me'
                    ? styles.messageSentText
                    : styles.messageReceivedText
                }
              >
                {message.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Type a message..."
          placeholderTextColor={colors.onSurfaceLight}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          activeOpacity={0.7}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InAppMessagingScreen;
