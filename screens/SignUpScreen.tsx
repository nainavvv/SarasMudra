import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    console.log('Submit:', { email, phoneNumber });
    navigation.navigate('logo');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/hands-logo.png')}
          style={styles.logoImage}
        />

      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/google-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/facebook-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    backgroundColor: '#FCDA79',
    padding: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 270,
    height: 80,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  socialButton: {
    padding: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
  },
});