import ChatMessage from '@/components/ChatMessage';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageIdeas from '@/components/MessageIdeas';
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import { addChat, addMessage, getMessages } from '@/utils/Database';
import { Message, Role } from '@/utils/interfaces';
import { Storage } from '@/utils/Storage';
import { FlashList } from '@shopify/flash-list';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import OpenAI from 'react-native-openai';

const DUMMY_MESSAGES: Message[] = [
  {
    role: Role.Bot,
    content: 'Hello, I am CloneGPT. How can I help you today?',
  },
  {
    role: Role.User,
    content:
      'I need help with React Native. I need help with React Native. I need help with React Native. I need help with React Native. I need help with React Native. I need help with React Native. I need help with React Native. I need help with React Native. ',
  },
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage);
  const [org, setOrg] = useMMKVString('org', Storage);
  const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage);

  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  // Make custom setChat to access latest state value
  const [chatId, _setChatId] = useState<string | null>(id!);
  const chatIdRef = useRef(chatId);
  const setChatId = (id: string) => {
    chatIdRef.current = id;
    _setChatId(id);
  };

  if (!key || key === '' || !org || org === '') {
    return <Redirect href={'/(auth)/(modal)/settings'} />;
  }

  // Retrieve users messages
  useEffect(() => {
    if (id) {
      getMessages(db, parseInt(id)).then((messages) => setMessages(messages));
    }
  }, [id]);

  const openAI = useMemo(
    () => new OpenAI({ apiKey: key, organization: org }),
    []
  );

  const getCompletion = async (message: string) => {
    if (messages.length === 0) {
      const result = addChat(db, message);
      const chatID = (await result).lastInsertRowId;
      setChatId(chatID.toString());
      addMessage(db, chatID, { content: message, role: Role.User });
    }

    setMessages([
      ...messages,
      { role: Role.User, content: message },
      { role: Role.Bot, content: '' },
    ]);

    openAI.chat.stream({
      messages: [{ role: 'user', content: message }],
      model: gptVersion === '4' ? 'gpt-4' : 'gpt-3.5-turbo',
    });
  };

  useEffect(() => {
    const handleMessage = (payload: any) => {
      setMessages((messages) => {
        const newMessage = payload.choices[0].delta.content;
        if (newMessage) {
          messages[messages.length - 1].content += newMessage;
          return [...messages];
        }

        if (payload.choices[0]?.finishReason) {
          addMessage(db, parseInt(chatIdRef.current!), {
            role: Role.Bot,
            content: messages[(messages.length = 1)].content,
          });
        }
        return messages;
      });
    };

    openAI.chat.addListener('onChatMessageReceived', handleMessage);

    return () => {
      openAI.chat.removeListener('onChatMessageReceived');
    };
  }, [openAI]);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <HeaderDropDown
              title='CloneGPT'
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'new-releases' },
              ]}
              onSelect={(key) => {
                setGptVersion(key);
              }}
              selected={gptVersion}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require('@/assets/images/logo-white.png')}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 20 }}
          keyboardDismissMode='on-drag'
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSend={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});

export default ChatPage;
