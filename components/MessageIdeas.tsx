import Colors from '@/constants/Colors';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PredefinedMessages = [
  { title: 'Explain React Native', text: "Like I'm five years old" },
  { title: 'Suggest fun activities', text: 'for family holidays' },
  { title: 'Recommend a dish', text: 'to impress a date' },
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
      >
        {PredefinedMessages.map((message, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onSelectCard(`${message.title} ${message.text}`)}
            style={styles.card}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              {message.title}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
});
export default MessageIdeas;
