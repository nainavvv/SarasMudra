import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

const jobs: Job[] = [
  { id: '1', title: 'Sign Language Interpreter', company: 'ABC Corp', location: 'New York, NY' },
  { id: '2', title: 'Deaf Education Teacher', company: 'XYZ School', location: 'Los Angeles, CA' },
  { id: '3', title: 'Accessibility Consultant', company: 'Tech Solutions', location: 'San Francisco, CA' },
];

export default function OpportunitiesScreen() {
  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.company}</Text>
      <Text style={styles.jobLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Opportunities</Text>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobCompany: {
    fontSize: 16,
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
  },
});