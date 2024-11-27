import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
const numbers = '0123456789'.split('');

const numberImages: { [key: string]: ImageSourcePropType } = {
  '0': require('../assets/images/0.png'),
  '1': require('../assets/images/1.png'),
  '2': require('../assets/images/2.png'),
  '3': require('../assets/images/3.png'),
  '4': require('../assets/images/4.png'),
  '5': require('../assets/images/5.png'),
  '6': require('../assets/images/6.png'),
  '7': require('../assets/images/7.png'),
  '8': require('../assets/images/8.png'),
  '9': require('../assets/images/9.png'),
};

export default function NumberLessonScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed the number lesson!');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.lessonContainer}>
        <Image
          source={numberImages[numbers[currentIndex]]}
          style={styles.numberImage}
        />
        <Text style={styles.numberText}>{numbers[currentIndex]}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  lessonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  numberText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#FCDA79',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

