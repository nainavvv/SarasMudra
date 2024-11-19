import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image , SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

type Video = {
  id: string;
  title: string;
  thumbnail: any; // Using 'any' for simplicity, but ideally you'd use a more specific type
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
const videos: Video[] = [
  { id: '1', title: 'Introduction to Speech Therapy', thumbnail: require('../assets/video1.mp4') },
  { id: '2', title: 'Articulation Exercises', thumbnail: require('../assets/video2.mp4') },
  { id: '3', title: 'Vocal Warm-ups', thumbnail: require('../assets/video3.mp4') },
];

export default function SpeechTherapyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    
      <Header/>
      <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.header}>Speech Therapy Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
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
  content:{
    flex:1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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