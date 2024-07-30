import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Styles';

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={1}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )}
      <Image
        source={require('../assets/images/logo-dark.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        {type === 'login' ? 'Welcome Back' : 'Create your account'}
      </Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={styles.inputField}
          autoCapitalize='none'
          placeholder='Email'
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={styles.inputField}
          autoCapitalize='none'
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {type === 'login' ? (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Page;
