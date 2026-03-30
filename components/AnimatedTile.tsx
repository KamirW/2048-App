import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { TILE_COLORS, TILE_SIZE_VALUE } from './styles';

export type Board = (number | null)[][];
export type TilePosition = { row: number; col: number; value: number | null; id: string };

interface AnimatedTileProps {
  tile: TilePosition;
  isNew?: boolean;
  shouldAnimate?: boolean;
}

export const AnimatedTile: React.FC<AnimatedTileProps> = ({ 
  tile, 
  isNew = false, 
  shouldAnimate = false 
}) => {
  const scaleAnim = useRef(new Animated.Value(isNew ? 0.5 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;

  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isNew, scaleAnim, opacityAnim]);

  if (!tile.value) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: tile.col * (TILE_SIZE_VALUE + 3) + 3,
          top: tile.row * (TILE_SIZE_VALUE + 3) + 3,
          width: TILE_SIZE_VALUE,
          height: TILE_SIZE_VALUE,
          backgroundColor: TILE_COLORS[tile.value as keyof typeof TILE_COLORS] || TILE_COLORS[0],
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            { scale: scaleAnim },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <Animated.Text
        style={[
          {
            color: '#776e65',
            fontWeight: 'bold',
            fontSize: tile.value < 100 ? 32 : tile.value < 1000 ? 28 : 24,
          },
        ]}
      >
        {tile.value}
      </Animated.Text>
    </Animated.View>
  );
};
