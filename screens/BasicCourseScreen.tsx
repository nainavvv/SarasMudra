import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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

export default function BasicCourseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { courseId, courseTitle } = route.params as { courseId: string; courseTitle: string };

  const lessons = [
    { id: '1', title: 'Alphabets', icon: '🔤', progress: 100, unlocked: true },
    { id: '2', title: 'Numbers', icon: '🔢', progress: 0, unlocked: false },
    { id: '3', title: 'Greetings 1', icon: '👋', progress: 0, unlocked: false },
    { id: '4', title: 'Weather', icon: '☁️', progress: 0, unlocked: false },
    { id: '5', title: 'Calendar', icon: '📅', progress: 0, unlocked: false },
    { id: '6', title: 'Colors', icon: '🎨', progress: 0, unlocked: false },
  ];

  const handleLessonPress = (lesson) => {
    if (lesson.unlocked) {
      if (lesson.title === 'Alphabets') {
        navigation.navigate('alphabet-lesson');
      } else {
        // Navigate to other lesson types when implemented
        console.log(`Navigating to ${lesson.title} lesson`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.levelContainer}>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>{courseTitle}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lessonsContainer}>
        {lessons.map((lesson) => (
          <TouchableOpacity 
            key={lesson.id} 
            style={styles.lessonItem} 
            onPress={() => handleLessonPress(lesson)}
            disabled={!lesson.unlocked}
          >
            <View style={[styles.lessonCircle, lesson.unlocked ? styles.activeLesson : styles.lockedLesson]}>
              <Text style={{fontSize: 24}}>{lesson.icon}</Text>
              {lesson.progress > 0 && (
                <View style={[styles.progressRing, { transform: [{ rotate: `${lesson.progress * 3.6}deg` }] }]} />
              )}
            </View>
            <Text style={[styles.lessonText, !lesson.unlocked && styles.lockedText]}>{lesson.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('home')}>
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <LearnIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('dictionary')}>
          <DictionaryIcon />
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
  levelContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  levelButton: {
    backgroundColor: '#FCDA79',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lessonItem: {
    alignItems: 'center',
    marginBottom: 30,
  },
  lessonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeLesson: {
    backgroundColor: '#E6E6FA',
  },
  lockedLesson: {
    backgroundColor: '#E0E0E0',
  },
  progressRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: '#FCDA79',
    borderTopColor: 'transparent',
    transform: [{ rotate: '0deg' }],
  },
  lessonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  lockedText: {
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
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