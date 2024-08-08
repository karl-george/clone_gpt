import { defaultStyles } from '@/constants/Styles';
import ChatMessage from '@/components/ChatMessage';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageIdeas from '@/components/MessageIdeas';
import MessageInput from '@/components/MessageInput';
import { Message, Role } from '@/utils/interfaces';
import { Storage } from '@/utils/Storage';
import { FlashList } from '@shopify/flash-list';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import OpenAI from 'react-native-openai';
import Colors from '@/constants/Colors';

const DUMMY_MESSAGES = [
  {
    role: Role.Bot,
    content: '',
    imageUrl: 'https://galaxies.dev/img/meerkat_2.jpg',
    prompt:
      'A meerkat astronaut in a space suit, standing upright. The background shows a distant star',
  },
  {
    role: Role.Bot,
    loading: true,
  },
];

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage);
  const [org, setOrg] = useMMKVString('org', Storage);
  const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage);

  const [working, setWorking] = useState(false);

  if (!key || key === '' || !org || org === '') {
    return <Redirect href={'/(auth)/(modal)/settings'} />;
  }

  const openAI = useMemo(
    () => new OpenAI({ apiKey: key, organization: org }),
    []
  );

  const getCompletion = async (message: string) => {
    setWorking(true);

    setMessages([...messages, { role: Role.User, content: message }]);

    const result = await openAI.image.create({
      prompt: message,
    });
    console.log(result);
    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      setMessages((prev) => [
        ...prev,
        {
          role: Role.Bot,
          content: '',
          imageUrl,
          prompt: message,
        },
      ]);
    }
    setWorking(false);
  };

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
              title='DallE'
              items={[
                { key: 'share', title: 'Share GPT', icon: 'bolt' },
                { key: 'details', title: 'See Details', icon: 'new-releases' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
              onSelect={() => {}}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View
            style={{
              marginTop: height / 2 - 100,
              alignItems: 'center',
              gap: 16,
            }}
          >
            <View style={[styles.logoContainer]}>
              <Image
                source={require('@/assets/images/dalle.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.label}>
              Let me turn your imagination into imagery
            </Text>
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 20 }}
          keyboardDismissMode='on-drag'
          ListFooterComponent={
            <>
              {working && (
                <ChatMessage
                  {...{ role: Role.Bot, content: '', loading: true }}
                />
              )}
            </>
          }
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
      >
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
    width: 80,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: Colors.greyLight,
    borderWidth: 1,
  },
  image: {
    resizeMode: 'cover',
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
});

export default Page;
