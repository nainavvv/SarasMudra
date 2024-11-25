import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

type DictionaryItem = {
  id: string;
  word: string;
  definition: string;
  image: any; // Using 'any' for simplicity, but ideally use a more specific type
};

const HomeIcon = () => (
  <Text style={{fontSize: 24}}>🏠</Text>
);

const LearnIcon = () => (
  <Text style={{fontSize: 24}}>📚</Text>
);

const DictionaryIcon = () => (
  <Text style={{fontSize: 24}}>📖</Text>
);

const dictionaryData: DictionaryItem[] = [
  { 
    id: '1', 
    word: 'Help', 
    definition: 'Providing assistance or support to someone in need',
    image: require('../assets/images/help.png') // Make sure this image exists in your project
  },
  { 
    id: '2', 
    word: 'Thank you', 
    definition: 'An expression of gratitude',
    image: require('../assets/images/thank-you.png') // Make sure this image exists in your project
  },
  { 
    id: '3', 
    word: 'Are you okay?', 
    definition: 'A question to check if someone is feeling well ',
    image: require('../assets/images/are-you-okay.png') // Make sure this image exists in your project
  },
  { 
    id: '4', 
    word: 'Emotions', 
    definition: 'Feelings experienced by humans, such as happiness, sadness, or anger',
    image: require('../assets/images/emotions.png') // Make sure this image exists in your project
  },
  { 
    id: '5', 
    word: 'Happy', 
    definition: 'A feeling of joy, pleasure, or contentment',
    image: require('../assets/images/happy.png') // Make sure this image exists in your project
  },
  { 
    id: '6', 
    word: 'Sad', 
    definition: 'A feeling of sorrow or unhappiness',
    image: require('../assets/images/sad.png') // Make sure this image exists in your project
  },
  { 
    id: '7', 
    word: 'Anger', 
    definition: 'A strong feeling of displeasure or frustration',
    image: require('../assets/images/anger.png') // Make sure this image exists in your project
  },
  { 
    id: '8', 
    word: 'Disgust', 
    definition: 'A feeling of strong dislike or revulsion',
    image: require('../assets/images/disgust.png') // Make sure this image exists in your project
  },
  { 
    id: '9', 
    word: 'Good', 
    definition: 'Something positive',
    image: require('../assets/images/good.png') // Make sure this image exists in your project
  },
  { 
    id: '10', 
    word: 'Bad', 
    definition: 'Something negative',
    image: require('../assets/images/bad.png') // Make sure this image exists in your project
  },
  { 
    id: '11', 
    word: 'Fear', 
    definition: ' A feeling of being scared',
    image: require('../assets/images/fear.png') // Make sure this image exists in your project
  },
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
      <Image source={item.image} style={styles.itemImage} />
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
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('home')}
        >
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('indian-sign-language')}
        >
          <LearnIcon />
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <DictionaryIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Dictionary</Text>
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
    alignItems: 'center',
  },
  itemImage: {
    width: 220,
    height: 180,
    marginVertical: 12,
    borderRadius: 8,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  definition: {
    fontSize: 16,
    textAlign: 'center',
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

