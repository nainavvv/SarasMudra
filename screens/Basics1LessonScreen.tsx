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

const basics1Images: { [key: string]: { image: ImageSourcePropType; text: string } } = {
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

const basics1Keys = Object.keys(basics1Images);

export default function Basics1Screen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < basics1Keys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed the Basics 1 lesson!');
      navigation.goBack();
    }
  };

  const currentKey = basics1Keys[currentIndex];
  const currentItem = basics1Images[currentKey];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.lessonContainer}>
        <Image
          source={currentItem.image}
          style={styles.image}
        />
        <Text style={styles.text}>{currentItem.text}</Text>
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
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
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
