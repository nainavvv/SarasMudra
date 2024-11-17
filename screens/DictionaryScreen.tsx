import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
type DictionaryItem = {
  id: string;
  word: string;
  definition: string;
};

const dictionaryData: DictionaryItem[] = [
  { id: '1', word: 'Hello', definition: 'A greeting or salutation' },
  { id: '2', word: 'Thank you', definition: 'An expression of gratitude' },
  { id: '3', word: 'Please', definition: 'Used as a polite request or statement' },
];

export default function DictionaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = dictionaryData.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDictionaryItem = ({ item }: { item: DictionaryItem }) => (
    <View style={styles.dictionaryItem}>
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.definition}>{item.definition}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SarasDictionary</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search words"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={renderDictionaryItem}
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
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dictionaryItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  definition: {
    fontSize: 14,
  },
});