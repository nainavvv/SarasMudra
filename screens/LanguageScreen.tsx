import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

export default function LanguageScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    navigation.navigate('community');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferred Language</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, language === 'Hindi' && styles.selectedButton]}
          onPress={() => setLanguage('Hindi')}
        >
          <Text style={styles.buttonText}>Hindi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === 'English' && styles.selectedButton]}
          onPress={() => setLanguage('English')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});