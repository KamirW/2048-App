import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface HeaderProps {
  score: number;
  highScore: number;
}

export const Header: React.FC<HeaderProps> = ({ score, highScore }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>2048</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Best</Text>
        <Text style={styles.score}>{highScore}</Text>
      </View>
    </View>
  );
};
