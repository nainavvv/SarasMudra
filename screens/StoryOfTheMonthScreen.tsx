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
 <Text style={styles.title}>Kishore Saini: A Deaf Entrepreneur Changing Lives</Text>
<Text style={styles.content}>
  Kishore Saini, a resident of New Delhi, was born deaf. Despite facing immense challenges in accessing quality education and job opportunities, he refused to let his disability define his potential. After completing his education at a special school, he decided to empower others like him.

  In 2015, Kishore started his own small business in the tailoring industry. His workshop employs only individuals with hearing impairments, giving them a platform to earn a livelihood and prove their capabilities. He provides on-the-job training in tailoring, pattern design, and customer service, ensuring his employees gain valuable skills.

  Under Kishore’s leadership, the business grew steadily, and his team’s work gained recognition for its quality and professionalism. Today, his workshop is not just a workplace but a community of individuals who share, support, and inspire one another. Kishore also collaborates with NGOs to spread awareness and advocate for more inclusive policies in the labor market.

  This story reflects the resilience and creativity of the deaf and mute community in India, as well as the potential for inclusive employment to change lives. It’s a reminder that with determination and the right support, barriers can be overcome, and great achievements can be realized.

  Kishore’s success has inspired other deaf entrepreneurs and promoted a shift in how society views the abilities of individuals with disabilities. His story highlights the importance of inclusion and empowerment, showing how one person’s efforts can transform the lives of many.
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