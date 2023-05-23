import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilePageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.position}>Manager</Text>
        <Text style={styles.phone}>0706 456 789</Text>
       
      </View>
      <View style={styles.content}>
        {/* Add your profile content here */}
        <Text style={styles.sectionHeading}>Shop</Text>
        <Text style={styles.about}> Malimali
        </Text>
        <Text style={styles.sectionHeading}>Location</Text>
        <Text style={styles.interests}>
            Rongata 
        </Text>
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  about: {
    marginBottom: 16,
  },
  interests: {
  
  },
});

export default ProfilePageScreen;
