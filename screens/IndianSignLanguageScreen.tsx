import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
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

export default function IndianSignLanguageScreen() {
  const navigation = useNavigation<NavigationProp>();

  const courses = [
    { id: '1', title: 'Basic Course', icon: '🔤', progress: 25, unlocked: true },
    { id: '2', title: 'Intermediate', icon: '🗣️', progress: 0, unlocked: false },
    { id: '3', title: 'Advanced', icon: '🎓', progress: 0, unlocked: false },
  ];

  const handleCoursePress = (course) => {
    if (course.unlocked) {
      navigation.navigate('basic-course', { courseId: course.id, courseTitle: course.title });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Indian Sign Language Courses</Text>

        {courses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseItem}
            onPress={() => handleCoursePress(course)}
            disabled={!course.unlocked}
          >
            <View style={[styles.courseCircle, course.unlocked ? styles.unlockedCourse : styles.lockedCourse]}>
              <Text style={{fontSize: 32}}>{course.icon}</Text>
              {course.progress > 0 && (
                <View style={[styles.progressRing, { transform: [{ rotate: `${course.progress * 3.6}deg` }] }]} />
              )}
            </View>
            <View style={styles.courseInfo}>
              <Text style={[styles.courseTitle, !course.unlocked && styles.lockedText]}>{course.title}</Text>
              {course.unlocked ? (
                <Text style={styles.progressText}>{course.progress}% Complete</Text>
              ) : (
                <Text style={styles.lockedText}>Locked</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('home')}
        >
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <LearnIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('dictionary')}
        >
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
  rewardsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  courseCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  unlockedCourse: {
    backgroundColor: '#E6E6FA',
  },
  lockedCourse: {
    backgroundColor: '#E0E0E0',
  },
  progressRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#FCDA79',
    borderTopColor: 'transparent',
    transform: [{ rotate: '0deg' }],
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
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