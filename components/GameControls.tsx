import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface GameControlsProps {
  onReset: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onReset }) => {
  return (
    <>
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>New Game</Text>
      </TouchableOpacity>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>Swipe to move tiles</Text>
        <Text style={styles.instructionText}>Combine tiles to reach 2048!</Text>
      </View>
    </>
  );
};
