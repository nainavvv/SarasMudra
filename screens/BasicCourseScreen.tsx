import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const BrainIcon = () => (
  <Text style={{fontSize: 24}}>🧠</Text>
);
const initialLessons = [
  { id: '1', title: 'Alphabets', icon: '🔤', progress: 0, unlocked: true, arrows: 'right' },
  { id: '2', title: 'Numbers', icon: '🔢', progress: 0, unlocked: false, arrows: 'left' },
  { id: '3', title: 'Greetings 1', icon: '👋', progress: 0, unlocked: false, arrows: 'right' },
  { id: '4', title: 'Weather', icon: '☁️', progress: 0, unlocked: false, arrows: 'left' },
  { id: '5', title: 'Calendar', icon: '📅', progress: 0, unlocked: false, arrows: 'right' },
  { id: '6', title: 'Colors', icon: '🎨', progress: 0, unlocked: false, arrows: 'left' },
];
export default function BasicCourseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { courseId, courseTitle } = route.params as { courseId: string; courseTitle: string };
  const [lessons, setLessons] = useState(initialLessons);
  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [])
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProgress();
    });
    return unsubscribe;
  }, [navigation]);
  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('lessonProgress');
      if (savedProgress !== null) {
        setLessons(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };
  const saveProgress = async (updatedLessons) => {
    try {
      await AsyncStorage.setItem('lessonProgress', JSON.stringify(updatedLessons));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };
  const handleLessonPress = (lesson) => {
    if (lesson.unlocked) {
      if (lesson.title === 'Alphabets') {
        navigation.navigate('alphabet-lesson');
      } else {
        // Navigate to other lesson types when implemented
        console.log(`Navigating to ${lesson.title} lesson`);
      }
    } else {
      Alert.alert('Lesson Locked', 'Complete the previous lesson to unlock this one.');
    }
  };
  const handleQuizPress = (lessonTitle: string) => {
    const lessonIndex = lessons.findIndex(lesson => lesson.title === lessonTitle);
    if (lessonIndex !== -1 && lessons[lessonIndex].unlocked) {
      if (lessonTitle === 'Alphabets') {
        navigation.navigate('alphabet-quiz', { lessonIndex });
      } else {
        console.log(`Opening quiz for ${lessonTitle}`);
      }
    } else {
      Alert.alert('Quiz Locked', 'Complete the lesson to access the quiz.');
    }
  };
  const handleQuizComplete = (lessonIndex: number, score: number) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].progress = score;
    if (lessonIndex + 1 < updatedLessons.length) {
      updatedLessons[lessonIndex + 1].unlocked = true;
    }
    setLessons(updatedLessons);
    saveProgress(updatedLessons);
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
          <View key={lesson.id} style={styles.lessonRow}>
            {lesson.arrows === 'left' && (
              <>
                <TouchableOpacity 
                  style={styles.brainButton} 
                  onPress={() => handleQuizPress(lesson.title)}
                >
                  <BrainIcon />
                </TouchableOpacity>
                <Text style={styles.arrows}>{'<<<'}</Text>
              </>
            )}
            <View style={styles.lessonItemWrapper}>
              <TouchableOpacity 
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
              <TouchableOpacity 
                style={styles.quizButton}
                onPress={() => handleQuizPress(lesson.title)}
              >
                <Text style={styles.quizButtonText}>Q</Text>
              </TouchableOpacity>
            </View>
            {lesson.arrows === 'right' && (
              <>
                <Text style={styles.arrows}>{'>>>'}</Text>
                <TouchableOpacity 
                  style={styles.brainButton} 
                  onPress={() => handleQuizPress(lesson.title)}
                >
                  <BrainIcon />
                </TouchableOpacity>
              </>
            )}
          </View>
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
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  lessonItemWrapper: {
    alignItems: 'center',
  },
  lessonItem: {
    alignItems: 'center',
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
  brainButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  arrows: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  quizButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FCDA79',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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