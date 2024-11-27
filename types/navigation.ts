import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  index: undefined;
  logo: undefined;
  signup: undefined;
  login: undefined;
  language: undefined;
  community: undefined;
  'deaf-mute-questions': undefined;
  'non-deaf-mute-questions': undefined;
  home: undefined;
  'indian-sign-language': undefined;
  'speech-therapy': undefined;
  'comm-screen': undefined;
  opportunities: undefined;
  dictionary: undefined;
  'story-of-the-month': undefined;
  'basic-course': { courseId: string; courseTitle: string };
  'alphabet-lesson': undefined;
  'alphabet-quiz': undefined;
  'number-lesson': undefined;
  'number-quiz': undefined;
  'basics1-lesson': undefined;
  'basics1-quiz': undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;