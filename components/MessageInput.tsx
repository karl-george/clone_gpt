import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export type MessageInputProps = {
  onShouldSend: (message: string) => void;
};

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MessageInput = ({ onShouldSend }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    onShouldSend(message);
    setMessage('');
  };

  const expandedButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );

    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const ButtonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );

    return {
      opacity: expanded.value,
      width: widthInterpolation,
    };
  });

  return (
    <BlurView
      intensity={90}
      tint='extraLight'
      style={{ paddingBottom: bottom + 6, paddingTop: 10 }}
    >
      <View style={styles.row}>
        <ATouchableOpacity
          onPress={expandItems}
          style={[styles.roundBtn, expandedButtonStyle]}
        >
          <Ionicons name='add' size={24} color={Colors.grey} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, ButtonViewStyle]}>
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <Ionicons name='camera-outline' size={24} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name='image-outline' size={24} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name='folder-outline' size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          autoFocus
          placeholder='Message'
          style={styles.messageInput}
          multiline
          value={message}
          onChangeText={onChangeText}
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
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default MessageInput;
