import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

export default function NonDeafMuteQuestionsScreen() {
  const [reason, setReason] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Why are you here?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, reason === 'Family/Friend' && styles.selectedButton]}
          onPress={() => setReason('Family/Friend')}
        >
          <Text style={styles.buttonText}>I have a family member / friend of the community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, reason === 'Curious Learner' && styles.selectedButton]}
          onPress={() => setReason('Curious Learner')}
        >
          <Text style={styles.buttonText}>Curious learner</Text>
        </TouchableOpacity>
      </View>
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
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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