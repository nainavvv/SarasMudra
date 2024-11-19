import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image,SafeAreaView ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

const HomeIcon = () => (
  <Text style={{fontSize: 24}}>🏠</Text>
);

const LearnIcon = () => (
  <Text style={{fontSize: 24}}>📚</Text>
);

const DictionaryIcon = () => (
  <Text style={{fontSize: 24}}>📖</Text>
);

export default function StoryOfTheMonthScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView style={styles.content}>
      <Text style={styles.header}>Story of the Month</Text>
      <Image
        source={require('../assets/story-image.png')}
        style={styles.storyImage}
      />
      <Text style={styles.title}>Overcoming Challenges: A Deaf Athlete's Journey to Olympic Gold</Text>
      <Text style={styles.content}>
        In this inspiring story, we follow the journey of Sarah Thompson, a deaf athlete who defied all odds to win an Olympic gold medal in swimming. Born profoundly deaf, Sarah faced numerous challenges throughout her life, but her determination and passion for swimming never wavered.

        From a young age, Sarah's parents encouraged her to pursue her dreams, enrolling her in swimming lessons and supporting her competitive spirit. As she progressed in her swimming career, Sarah had to overcome communication barriers with coaches and teammates, often relying on visual cues and lip-reading to follow instructions.

        Despite these obstacles, Sarah's talent and hard work caught the attention of national selectors, and she was chosen to represent her country in the Olympics. Through rigorous training and unwavering dedication, Sarah not only qualified for the finals but also set a new world record in the 100-meter freestyle event, clinching the gold medal.

        Sarah's victory serves as an inspiration to the deaf community and beyond, proving that with determination and support, any barrier can be overcome. Her story highlights the importance of inclusivity in sports and the power of perseverance in the face of adversity.

        Today, Sarah continues to advocate for deaf athletes and works to improve accessibility in sports programs worldwide. Her journey from a young deaf girl with a dream to an Olympic champion has touched the hearts of millions and continues to inspire future generations of athletes to pursue their passions, regardless of the challenges they may face.
      </Text>
    </ScrollView>
    
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
    fontSize: 16,
    lineHeight: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
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