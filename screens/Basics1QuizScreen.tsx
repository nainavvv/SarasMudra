import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

const basics1Images = {
  '0': { image: require('../assets/images/namaste.png'), text: 'Namaste' },
  '1': { image: require('../assets/images/hello.png'), text: 'Hello' },
  '2': { image: require('../assets/images/name-what.png'), text: 'What is your name?' },
  '3': { image: require('../assets/images/name.png'), text: 'My name is...' },
  '4': { image: require('../assets/images/you-okay.png'), text: 'Are you okay?' },
  '5': { image: require('../assets/images/fine.png'), text: 'I am fine' },
  '6': { image: require('../assets/images/thanks.png'), text: 'Thank you' },
  '7': { image: require('../assets/images/please.png'), text: 'Please' },
  '8': { image: require('../assets/images/sorry.png'), text: 'Sorry' },
  '9': { image: require('../assets/images/excuse-me.png'), text: 'Excuse me' },
  '!': { image: require('../assets/images/man.png'), text: 'Man' },
  '@': { image: require('../assets/images/woman.png'), text: 'Woman' },
};

const generateQuestions = () => {
  return Object.entries(basics1Images).map(([key, value]) => ({
    id: key,
    image: value.image,
    question: 'What does this image represent?',
    options: shuffle([
      value.text,
      ...Object.values(basics1Images)
        .filter(item => item.text !== value.text)
        .map(item => item.text)
        .slice(0, 3)
    ]),
    correctAnswer: value.text,
  }));
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Basics1QuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { lessonIndex } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(shuffle(generateQuestions()));
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = async () => {
    const finalScore = Math.round((score / questions.length) * 100);
    try {
      const savedProgress = await AsyncStorage.getItem('lessonProgress');
      if (savedProgress !== null) {
        const lessons = JSON.parse(savedProgress);
        lessons[lessonIndex].progress = finalScore;
        
        if (lessonIndex + 1 < lessons.length) {
          lessons[lessonIndex + 1].unlocked = true;
          lessons[lessonIndex + 1].progress = 0;
        }
        
        await AsyncStorage.setItem('lessonProgress', JSON.stringify(lessons));
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
    navigation.goBack();
  };

  const handleRetry = () => {
    setQuestions(shuffle(generateQuestions()));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            Score: {score}/{questions.length}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handleFinish}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}/{questions.length}
        </Text>
        <Image 
          source={questions[currentQuestion].image} 
          style={styles.questionImage}
        />
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  questionContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionNumber: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FCDA79',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E6E6FA',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

