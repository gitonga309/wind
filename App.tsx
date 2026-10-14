import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { chats, type Message } from './src/data/mockData';

const emojiOptions = ['😊', '🎉', '💌', '❤️', '✨', '🌙'];

export default function App() {
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [messageMap, setMessageMap] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(chats.map((chat) => [chat.id, chat.messages]))
  );
  const [draft, setDraft] = useState('');

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? chats[0],
    [selectedChatId]
  );

  const currentMessages = messageMap[selectedChat.id] ?? [];

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextMessage: Message = {
      id: `${Date.now()}`,
      sender: 'me',
      text: trimmed,
      timestamp: 'now',
    };

    setMessageMap((previous) => ({
      ...previous,
      [selectedChat.id]: [...(previous[selectedChat.id] ?? []), nextMessage],
    }));
    setDraft('');
  };

  return (
    <>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>wind</Text>
            <Text style={styles.subtitle}>letters for the people you love</Text>
          </View>
          <TouchableOpacity style={styles.newButton}>
            <Ionicons name="create-outline" size={18} color="#1c2940" />
            <Text style={styles.newButtonText}>New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.chatListSection}>
            <Text style={styles.sectionTitle}>Conversations</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={chats}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chatList}
              renderItem={({ item }) => {
                const isActive = item.id === selectedChat.id;
                const preview = item.messages[item.messages.length - 1]?.text ?? 'No messages yet';

                return (
                  <TouchableOpacity
                    style={[styles.chatCard, isActive && styles.chatCardActive]}
                    onPress={() => setSelectedChatId(item.id)}
                    activeOpacity={0.9}
                  >
                    <View style={[styles.avatar, { backgroundColor: item.color }]}>
                      <Text style={styles.avatarText}>{item.avatar}</Text>
                    </View>
                    <View style={styles.chatMeta}>
                      <Text style={styles.chatName}>{item.name}</Text>
                      <Text numberOfLines={1} style={styles.chatPreview}>
                        {preview}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={styles.chatWindow}>
            <View style={styles.chatHeader}>
              <View style={[styles.avatarLarge, { backgroundColor: selectedChat.color }]}>
                <Text style={styles.avatarText}>{selectedChat.avatar}</Text>
              </View>
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
                <Text style={styles.chatHeaderStatus}>online now</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call-outline" size={18} color="#2f4668" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.messageList}>
              {currentMessages.map((message) => {
                const isMine = message.sender === 'me';

                return (
                  <View
                    key={message.id}
                    style={[styles.messageRow, isMine && styles.messageRowMine]}
                  >
                    <View
                      style={[
                        styles.messageBubble,
                        isMine ? styles.messageBubbleMine : styles.messageBubbleOther,
                      ]}
                    >
                      <Text style={[styles.messageText, isMine && styles.messageTextMine]}>
                        {message.text}
                      </Text>
                      <Text style={[styles.messageTime, isMine && styles.messageTimeMine]}>
                        {message.timestamp}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.emojiBar}>
              {emojiOptions.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => setDraft((current) => `${current}${emoji}`)}
                  style={styles.emojiButton}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.composer}>
              <TouchableOpacity style={styles.composeButton}>
                <Ionicons name="add-circle-outline" size={24} color="#576981" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={draft}
                onChangeText={setDraft}
                placeholder="Write your letter..."
                placeholderTextColor="#8A96A6"
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eef3ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#eef3ff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1d2a44',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 12,
    color: '#5a6880',
    marginTop: 4,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfeaff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  newButtonText: {
    color: '#1c2940',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#f9fbff',
    overflow: 'hidden',
  },
  chatListSection: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#42506d',
    marginBottom: 10,
  },
  chatList: {
    gap: 12,
    paddingRight: 12,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    padding: 12,
    borderRadius: 22,
    backgroundColor: '#edf2ff',
    borderWidth: 1,
    borderColor: '#e5ebff',
  },
  chatCardActive: {
    backgroundColor: '#dfe9ff',
    borderColor: '#bfd0ff',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarLarge: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
  },
  chatMeta: {
    flex: 1,
  },
  chatName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e2d44',
  },
  chatPreview: {
    fontSize: 12,
    color: '#6a7691',
    marginTop: 2,
  },
  chatWindow: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2fb',
  },
  chatHeaderInfo: {
    marginLeft: 10,
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d2a44',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#5d6d84',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#edf2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    gap: 10,
  },
  messageRow: {
    width: '100%',
    flexDirection: 'row',
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  messageBubbleOther: {
    backgroundColor: '#edf3ff',
  },
  messageBubbleMine: {
    backgroundColor: '#607df4',
  },
  messageText: {
    fontSize: 15,
    color: '#1f2c42',
    lineHeight: 20,
  },
  messageTextMine: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 10,
    color: '#6a7691',
    marginTop: 6,
    textAlign: 'right',
  },
  messageTimeMine: {
    color: '#e8ebff',
  },
  emojiBar: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#edf2fb',
  },
  emojiButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f7ff',
  },
  emojiText: {
    fontSize: 18,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#f7f9ff',
    borderTopWidth: 1,
    borderTopColor: '#edf2fb',
  },
  composeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#edf2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    backgroundColor: '#ffffff',
    borderColor: '#edf2fb',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#1f2c42',
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5b7cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
