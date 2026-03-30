import React from 'react';
import { View } from 'react-native';
import { AnimatedTile, TilePosition } from './AnimatedTile';
import { styles, BOARD_SIZE_VALUE } from './styles';

interface GameBoardProps {
  tiles: TilePosition[];
  newTileId: string;
  animating: boolean;
  panHandlers: any;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  tiles, 
  newTileId, 
  animating, 
  panHandlers 
}) => {
  return (
    <View style={styles.boardContainer} {...panHandlers}>
      <View style={[styles.board, { width: BOARD_SIZE_VALUE, height: BOARD_SIZE_VALUE }]}>
        {tiles.map((tile) => (
          <AnimatedTile
            key={tile.id}
            tile={tile}
            isNew={tile.id === newTileId}
            shouldAnimate={animating} // Pass the animation state
          />
        ))}
      </View>
    </View>
  );
};
