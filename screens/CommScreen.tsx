import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Header from '../components/Header';

type NGO = {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
};
const HomeIcon = () => (
  <Text style={{fontSize: 24}}>🏠</Text>
);

const LearnIcon = () => (
  <Text style={{fontSize: 24}}>📚</Text>
);

const DictionaryIcon = () => (
  <Text style={{fontSize: 24}}>📖</Text>
);
const ngos: NGO[] = [
    { id: '1', name: 'All India Deaf and Dumb Society', address: 'Plot No. 4 & 7, Industrial Area, Kadkadi Mode, Delhi-110092', phone: '_', website: 'https://www.deafanddumbsociety.org' },
    { id: '2', name: 'Sanket Foundation', address: 'R-641, Second Floor, New Rajinder Nagar, New Delhi-60', phone: '+91-8800649977', website: 'https://sanketfoundation.org' },
    { id: '3', name: 'Suniye', address: 'New Delhi (exact address not listed online)', phone: '_', website: 'https://suniye.in' }
  ];
export default function CommScreen() {
  const navigation = useNavigation<NavigationProp>();
  const renderNgoItem = ({ item }: { item: NGO }) => (
    <View style={styles.ngoItem}>
      <Text style={styles.ngoName}>{item.name}</Text>
      <Text style={styles.ngoAddress}>{item.address}</Text>
      <Text style={styles.ngoPhone}>{item.phone}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
        <Text style={styles.ngoWebsite}>{item.website}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.content}>
      <Text style={styles.title}>Nearby NGO's</Text>
        <FlatList
          data={ngos}
          renderItem={renderNgoItem}
          keyExtractor={item => item.id}
        />
      </View>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}
          onPress={() => navigation.navigate('home')}
          >
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => navigation.navigate('indian-sign-language')}>
          <LearnIcon />
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={()=> navigation.navigate('dictionary')}
        >
          <DictionaryIcon/>
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

  ngoItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ngoAddress: {
    fontSize: 14,
    marginBottom: 4,
  },
  ngoPhone: {
    fontSize: 14,
    marginBottom: 4,
  },
  ngoWebsite: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
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