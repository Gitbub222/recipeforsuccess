// components/CardComponents.tsx
import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
  title: string;
  imageUrl: string;
}

const SavedCard: FC<CardProps> = ({ title, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 175,
    height: 175,
    backgroundColor: '#f6e8d3',
    overflow: 'hidden',
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 1,
    position: 'absolute',
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    bottom: -2,
    backgroundColor: '#f6af4c',
    padding: 2,
    zIndex: 2,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SavedCard;
