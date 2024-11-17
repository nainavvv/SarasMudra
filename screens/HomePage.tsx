import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

const SearchIcon = () => (
  <Text style={{fontSize: 20}}>🔍</Text>
);

const HomeIcon = () => (
  <Text style={{fontSize: 24}}>🏠</Text>
);

const GraduationCapIcon = () => (
  <Text style={{fontSize: 24}}>🎓</Text>
);

const UserIcon = () => (
  <Text style={{fontSize: 24}}>👤</Text>
);

export default function HomePage() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Signs"
          placeholderTextColor="#666"
        />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('indian-sign-language')}>
            <View style={styles.categoryIcon}>
              <Image
                source={require('../assets/sign-language-icon.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>Indian Sign{'\n'}Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('speech-therapy')}>
            <View style={styles.categoryIcon}>
              <Image
                source={require('../assets/speech-therapy-icon.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>Speech{'\n'}Therapy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('comm-screen')}>
            <View style={styles.categoryIcon}>
              <Image
                source={require('../assets/community-icon.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('opportunities')}>
            <View style={styles.categoryIcon}>
              <Image
                source={require('../assets/opportunities-icon.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>Opportunities</Text>
          </TouchableOpacity>
        </View>

        {/* Dictionary Card */}
        <View style={styles.dictionaryCard}>
          <View style={styles.dictionaryIconContainer}>
            <Image
              source={require('../assets/dictionary-icon.png')}
              style={styles.dictionaryIcon}
            />
          </View>
          <Text style={styles.dictionaryTitle}>SarasDictionary</Text>
          <TouchableOpacity style={styles.enterButton} onPress={() => navigation.navigate('dictionary')}>
            <Text style={styles.enterButtonText}>Enter</Text>
          </TouchableOpacity>
        </View>

        {/* Story of the Month */}
        <View style={styles.storySection}>
          <Text style={styles.storyTitle}>Story of the Month</Text>
          <Image
            source={require('../assets/story-image.png')}
            style={styles.storyImage}
          />
          <TouchableOpacity style={styles.readButton} onPress={() => navigation.navigate('story-of-the-month')}>
            <Text style={styles.readButtonText}>Read</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <HomeIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('indian-sign-language')}>
          <GraduationCapIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <UserIcon />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    width: '25%',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  dictionaryCard: {
    backgroundColor: '#f0f0f0',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  dictionaryIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCDA79',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dictionaryIcon: {
    width: 40,
    height: 40,
  },
  dictionaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  enterButton: {
    backgroundColor: '#FCDA79',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  enterButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  storySection: {
    margin: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  readButton: {
    backgroundColor: '#FCDA79',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  readButtonText: {
    fontSize: 16,
    fontWeight: '500',
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
    padding: 8,
  },
});