import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SarasMudra</Text>
      <Text style={styles.subtitle}>Your journey begins here!</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});