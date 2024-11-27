import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all images statically
const numberImages = {
  0: require('../assets/images/0.png'),
  1: require('../assets/images/1.png'),
  2: require('../assets/images/2.png'),
  3: require('../assets/images/3.png'),
  4: require('../assets/images/4.png'),
  5: require('../assets/images/5.png'),
  6: require('../assets/images/6.png'),
  7: require('../assets/images/7.png'),
  8: require('../assets/images/8.png'),
  9: require('../assets/images/9.png'),
};

const getRandomNumber = (exclude: number) => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 10);
  } while (randomNumber === exclude);
  return randomNumber;
};

const generateQuestions = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i,
    question: `What is the sign for number ${i}?`,
    options: [
      { id: 'a', image: numberImages[i], number: i },
      { id: 'b', image: numberImages[getRandomNumber(i)], number: getRandomNumber(i) },
      { id: 'c', image: numberImages[getRandomNumber(i)], number: getRandomNumber(i) },
      { id: 'd', image: numberImages[getRandomNumber(i)], number: getRandomNumber(i) },
    ],
    correctAnswer: 'a',
  }));
};

const allQuestions = generateQuestions();

export default function NumberQuizScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonIndex } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string) => {
    const currentQuestionData = questions[currentQuestion];
    const selectedNumber = currentQuestionData.options.find(opt => opt.id === selectedOption)?.number;
    
    if (selectedNumber === currentQuestionData.id) {
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
        
        // Unlock the next lesson if it exists
        if (lessonIndex + 1 < lessons.length) {
          lessons[lessonIndex + 1].unlocked = true;
          lessons[lessonIndex + 1].progress = 0;
        }
        
        await AsyncStorage.setItem('lessonProgress', JSON.stringify(lessons));
        
        Alert.alert(
          "Quiz Completed",
          `Your score: ${finalScore}%`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert("Error", "Failed to save progress. Please try again.");
    }
  };

  const handleRetry = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
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

