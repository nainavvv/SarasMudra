import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  index: undefined;
  logo: undefined;
  language: undefined;
  community: undefined;
  'deaf-mute-questions': undefined;
  'non-deaf-mute-questions': undefined;
  home: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;