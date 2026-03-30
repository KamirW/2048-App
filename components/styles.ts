import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BOARD_SIZE = Math.min(width, height) * 0.8;
const TILE_SIZE = (BOARD_SIZE - 5 * 3) / 4;

export const TILE_COLORS = {
  0: '#cdc1b4',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
};

export const BOARD_SIZE_VALUE = BOARD_SIZE;
export const TILE_SIZE_VALUE = TILE_SIZE;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#776e65',
  },
  scoreContainer: {
    backgroundColor: '#bbada0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#eee4da',
    fontSize: 12,
    fontWeight: 'bold',
  },
  score: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boardContainer: {
    position: 'relative',
    backgroundColor: '#bbada0',
    borderRadius: 12,
    padding: 3,
  },
  board: {
    position: 'relative',
    backgroundColor: '#cdc1b4',
    borderRadius: 8,
  },
  tile: {
    position: 'absolute',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    color: '#776e65',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#8f7a66',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: '#776e65',
    fontSize: 14,
    marginBottom: 5,
  },
});
