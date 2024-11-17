import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

const BellIcon = () => (
  <Text style={styles.bellIcon}>🔔</Text>
);

export default function Header() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Image
          source={require('../assets/hands-logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationButton}>
        <BellIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FCDA79',
  },
  logo: {
    width: 270,
    height: 80,
  },
  notificationButton: {
    padding: 8,
  },
  bellIcon: {
    fontSize: 24,
  },
});