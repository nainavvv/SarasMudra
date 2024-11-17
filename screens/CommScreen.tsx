import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking ,SafeAreaView } from 'react-native';
import Header from '../components/Header';

type NGO = {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
};

const ngos: NGO[] = [
  { id: '1', name: 'Deaf Aid Society', address: '123 Main St, City', phone: '+1234567890', website: 'https://deafaidsociety.org' },
  { id: '2', name: 'Sign Language Association', address: '456 Elm St, Town', phone: '+9876543210', website: 'https://signlanguageassociation.org' },
  { id: '3', name: 'Hearing Impaired Support', address: '789 Oak St, Village', phone: '+1122334455', website: 'https://hearingimpairedsupport.org' },
];

export default function CommScreen() {
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
        <Text style={styles.header}>Community</Text>
        <FlatList
          data={ngos}
          renderItem={renderNgoItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});