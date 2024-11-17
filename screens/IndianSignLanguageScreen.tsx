import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../components/Header';

type Course = {
  id: string;
  title: string;
  description: string;
};

const courses: Course[] = [
  { id: '1', title: 'Beginner', description: 'Learn basic signs and fingerspelling' },
  { id: '2', title: 'Intermediate', description: 'Expand your vocabulary and sentence structure' },
  { id: '3', title: 'Advanced', description: 'Master complex conversations and expressions' },
];

export default function IndianSignLanguageScreen() {
  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.header}>Indian Sign Language Courses</Text>
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
});