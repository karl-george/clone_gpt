import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type MessageInputProps = {
  onShouldSend: (message: string) => void;
};

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MessageInput = ({ onShouldSend }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const expandItems = () => {};

  const collapseItems = () => {};

  const onSend = () => {
    onShouldSend(message);
    setMessage('');
  };

  return (
    <BlurView
      intensity={90}
      tint='extraLight'
      style={{ paddingBottom: bottom + 6, paddingTop: 10 }}
    >
      <View style={styles.row}>
        <ATouchableOpacity onPress={expandItems} style={[styles.roundBtn]}>
          <Ionicons name='add' size={24} color={Colors.grey} />
        </ATouchableOpacity>
        <TextInput
          autoFocus
          placeholder='Message'
          style={styles.messageInput}
          multiline
          value={message}
          onChangeText={setMessage}
          onFocus={collapseItems}
        />
        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons
              name='arrow-up-circle-outline'
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name='headphones' size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
  },
  messageInput: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
});

export default MessageInput;
