import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView ,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';
type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  website: string;
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
const jobs: Job[] = [
    { id: '1', title: 'Sign Language Interpreter', description: 'SignAble Communications', location: 'Remote/India', website: 'https://signable.live/career-jobs-for-the-deaf' },
    { id: '2', title: 'Deaf Education Teacher', description: 'All India Federation of Deaf', location: 'Delhi, India', website: 'https://www.aifdw.com' },
    { id: '3', title: 'Accessibility Consultant', description: 'Enable India', location: 'Bengaluru, India', website: 'https://www.enableindia.org' }
];

export default function OpportunitiesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.description}</Text>
      <Text style={styles.jobLocation}>{item.location}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
        <Text style={styles.jobWebsite}>{item.website}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
 
      <Header/>
      <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.header}>Job Opportunities</Text>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
      />
    </View>
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
          onPress={() => navigation.navigate('dictionary')}>
          <DictionaryIcon/>
          <Text style={styles.navText}>Dictionary</Text>
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
  jobWebsite: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
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