import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity , SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';
type DictionaryItem = {
  id: string;
  word: string;
  definition: string;
};
const HomeIcon = () => (
  <Text style={{fontSize: 24}}>🏠</Text>
);

const LearnIcon = () => (
  <Text style={{fontSize: 24}}>📚</Text>
);

const UserIcon = () => (
  <Text style={{fontSize: 24}}>👤</Text>
);
const dictionaryData: DictionaryItem[] = [
  { id: '1', word: 'Hello', definition: 'A greeting or salutation' },
  { id: '2', word: 'Thank you', definition: 'An expression of gratitude' },
  { id: '3', word: 'Please', definition: 'Used as a polite request or statement' },
];

export default function DictionaryScreen() {
  const navigation = useNavigation<NavigationProp>();
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
    <SafeAreaView style={styles.container}>
      <Header/>
    <View style={styles.content}>
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
     {/* Bottom Navigation */}
     <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}
          onPress={() => navigation.navigate('home')}
          >
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => navigation.navigate('indian-sign-language')}>
          <LearnIcon />
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
        >
          <UserIcon/>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
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
    padding: 20,
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
  
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    opacity: 1,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeNavText: {
    color: '#FCDA79',
  },
});