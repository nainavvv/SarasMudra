import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

type Video = {
  id: string;
  title: string;
  thumbnail: any; // Using 'any' for simplicity, but ideally you'd use a more specific type
};

const videos: Video[] = [
//   { id: '1', title: 'Introduction to Speech Therapy', thumbnail: require('../assets/video-thumbnail-1.png') },
//   { id: '2', title: 'Articulation Exercises', thumbnail: require('../assets/video-thumbnail-2.png') },
//   { id: '3', title: 'Vocal Warm-ups', thumbnail: require('../assets/video-thumbnail-3.png') },
];

export default function SpeechTherapyScreen() {
  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Speech Therapy Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
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
});