import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

export default function DeafMuteQuestionsScreen() {
  const [ngo, setNgo] = useState('');
  const [age, setAge] = useState('');
  const [hearingLoss, setHearingLoss] = useState('');
  const [purpose, setPurpose] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    navigation.navigate('home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Additional Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Are you connected to any NGOs?"
        value={ngo}
        onChangeText={setNgo}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="What is your level of hearing loss?"
        value={hearingLoss}
        onChangeText={setHearingLoss}
      />
      <Text style={styles.subtitle}>I am here to:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, purpose === 'Learn ISL' && styles.selectedButton]}
          onPress={() => setPurpose('Learn ISL')}
        >
          <Text style={styles.buttonText}>Learn ISL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, purpose === 'Take Speech Therapy' && styles.selectedButton]}
          onPress={() => setPurpose('Take Speech Therapy')}
        >
          <Text style={styles.buttonText}>Take Speech Therapy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
    width: '45%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
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