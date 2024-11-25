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
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const alphabetImages: { [key: string]: ImageSourcePropType } = {
  A: require('../assets/images/a.png'),
  B: require('../assets/images/b.png'),
  C: require('../assets/images/c.png'),
  D: require('../assets/images/d.png'),
  E: require('../assets/images/e.png'),
  F: require('../assets/images/f.png'),
  G: require('../assets/images/g.png'),
  H: require('../assets/images/h.png'),
  I: require('../assets/images/i.png'),
  J: require('../assets/images/j.png'),
  K: require('../assets/images/k.png'),
  L: require('../assets/images/l.png'),
  M: require('../assets/images/m.png'),
  N: require('../assets/images/n.png'),
  O: require('../assets/images/o.png'),
  P: require('../assets/images/p.png'),
  Q: require('../assets/images/q.png'),
  R: require('../assets/images/r.png'),
  S: require('../assets/images/s.png'),
  T: require('../assets/images/t.png'),
  U: require('../assets/images/u.png'),
  V: require('../assets/images/v.png'),
  W: require('../assets/images/w.png'),
  X: require('../assets/images/x.png'),
  Y: require('../assets/images/y.png'),
  Z: require('../assets/images/z.png'),
};

export default function AlphabetLessonScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < alphabets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed the alphabet lesson!');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.lessonContainer}>
        <Image
          source={alphabetImages[alphabets[currentIndex]]}
          style={styles.alphabetImage}
        />
        <Text style={styles.alphabetText}>{alphabets[currentIndex]}</Text>
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
  alphabetImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  alphabetText: {
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