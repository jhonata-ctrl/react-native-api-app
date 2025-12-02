import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserById } from '../services/api';

export default function UserScreen({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Icon name="person" size={60} color="#FFF" />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Icon name="email" size={24} color="#007AFF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Icon name="phone" size={24} color="#007AFF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Icon name="language" size={24} color="#007AFF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Website</Text>
            <Text style={[styles.infoValue, styles.link]}>
              {user.website}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>{user.address.street}</Text>
            <Text style={styles.addressText}>{user.address.suite}</Text>
            <Text style={styles.addressText}>
              {user.address.city} - {user.address.zipcode}
            </Text>
            <View style={styles.coordinates}>
              <Text style={styles.coordinateText}>
                Lat: {user.address.geo.lat}
              </Text>
              <Text style={styles.coordinateText}>
                Lng: {user.address.geo.lng}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Empresa</Text>
          <View style={styles.companyCard}>
            <Text style={styles.companyName}>{user.company.name}</Text>
            <Text style={styles.companyCatchPhrase}>
              {user.company.catchPhrase}
            </Text>
            <Text style={styles.companyBs}>{user.company.bs}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#007AFF',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  coordinates: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  coordinateText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  companyCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  companyCatchPhrase: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  companyBs: {
    fontSize: 14,
    color: '#888',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});