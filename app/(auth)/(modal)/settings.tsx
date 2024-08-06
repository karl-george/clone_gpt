import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { useMMKVString } from 'react-native-mmkv';
import { Storage } from '@/utils/Storage';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [organisation, setOrganisation] = useState('');

  const [key, setKey] = useMMKVString('apiKey', Storage);
  const [org, setOrg] = useMMKVString('org', Storage);

  const { signOut } = useAuth();

  const router = useRouter();

  const saveApiKey = () => {
    setKey(apiKey);
    setOrg(organisation);
    router.navigate('/(auth)/(drawer)/(chat)/new');
  };

  const removeApiKey = () => {
    setKey('');
    setOrg('');
  };

  return (
    <View style={styles.container}>
      {key && key !== '' && (
        <>
          <Text style={styles.label}>You are all set</Text>
          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={removeApiKey}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}
      {(!key || key === '') && (
        <>
          <Text style={styles.label}>API Key and Organisation:</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder='Enter your OpenAI API key'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            value={organisation}
            onChangeText={setOrganisation}
            placeholder='Enter your organisation'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </>
      )}
      <View style={{ marginTop: 20 }}>
        <Button title='Sign Out' onPress={() => signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Settings;
