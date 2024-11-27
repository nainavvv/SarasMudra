import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import all images statically
const alphabetImages = {
  a: require('../assets/images/a1.png'),
  b: require('../assets/images/b1.png'),
  c: require('../assets/images/c1.png'),
  d: require('../assets/images/d1.png'),
  e: require('../assets/images/e1.png'),
  f: require('../assets/images/f1.png'),
  g: require('../assets/images/g1.png'),
  h: require('../assets/images/h1.png'),
  i: require('../assets/images/i1.png'),
  j: require('../assets/images/j1.png'),
  k: require('../assets/images/k1.png'),
  l: require('../assets/images/l1.png'),
  m: require('../assets/images/m1.png'),
  n: require('../assets/images/n1.png'),
  o: require('../assets/images/o1.png'),
  p: require('../assets/images/p1.png'),
  q: require('../assets/images/q1.png'),
  r: require('../assets/images/r1.png'),
  s: require('../assets/images/s1.png'),
  t: require('../assets/images/t1.png'),
  u: require('../assets/images/u1.png'),
  v: require('../assets/images/v1.png'),
  w: require('../assets/images/w1.png'),
  x: require('../assets/images/x1.png'),
  y: require('../assets/images/y1.png'),
  z: require('../assets/images/z1.png'),
};

const getRandomLetter = (exclude: string) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomLetter;
  do {
    randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  } while (randomLetter === exclude);
  return randomLetter;
};

const generateQuestions = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.split('').map((letter) => ({
    id: letter,
    question: `What is the sign for letter ${letter}?`,
    options: [
      { id: 'a', image: alphabetImages[letter.toLowerCase()], letter: letter },
      { id: 'b', image: alphabetImages[getRandomLetter(letter).toLowerCase()], letter: getRandomLetter(letter) },
      { id: 'c', image: alphabetImages[getRandomLetter(letter).toLowerCase()], letter: getRandomLetter(letter) },
      { id: 'd', image: alphabetImages[getRandomLetter(letter).toLowerCase()], letter: getRandomLetter(letter) },
    ],
    correctAnswer: 'a',
  }));
};

const allQuestions = generateQuestions();

export default function AlphabetQuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { lessonIndex } = route.params as { lessonIndex: number };
  const [questions, setQuestions] = useState<typeof allQuestions>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Shuffle and select 20 questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

  const handleAnswer = (selectedOption: string) => {
    const currentQuestionData = questions[currentQuestion];
    const selectedLetter = currentQuestionData.options.find(opt => opt.id === selectedOption)?.letter;
    
    if (selectedLetter === currentQuestionData.id) {
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
        
        // Unlock the next lesson
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
    // Reshuffle questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
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
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleAnswer(option.id)}
            >
              <Image source={option.image} style={styles.optionImage} />
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
    backgroundColor: '#fff',
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
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  optionButton: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  optionImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
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

