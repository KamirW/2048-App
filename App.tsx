import React, { useState, useEffect } from 'react';
import { View, Alert, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Header,
  GameBoard,
  GameControls,
  GameLogic,
  Storage,
  SplashScreen,
  Board,
  TilePosition,
  styles,
} from './components';

const Game2048: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [board, setBoard] = useState<Board>(() => GameLogic.initializeBoard());
  const [tiles, setTiles] = useState<TilePosition[]>([]);
  const [newTileId, setNewTileId] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Load high score on mount
  useEffect(() => {
    const loadHighScore = async () => {
      const savedHighScore = await Storage.getHighScore();
      setHighScore(savedHighScore);
    };
    loadHighScore();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const move = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver || won || animating) return;
    
    // const oldBoard = [...board.map(row => [...row])];
    let newBoard = [...board.map(row => [...row])];
    let newScore = 0;
    
    switch (direction) {
      case 'left':
        [newBoard, newScore] = GameLogic.moveLeft(newBoard);
        break;
      case 'right':
        newBoard = GameLogic.rotateBoard(GameLogic.rotateBoard(newBoard));
        [newBoard, newScore] = GameLogic.moveLeft(newBoard);
        newBoard = GameLogic.rotateBoard(GameLogic.rotateBoard(newBoard));
        break;
      case 'up':
        newBoard = GameLogic.rotateBoard(GameLogic.rotateBoard(GameLogic.rotateBoard(newBoard)));
        [newBoard, newScore] = GameLogic.moveLeft(newBoard);
        newBoard = GameLogic.rotateBoard(newBoard);
        break;
      case 'down':
        newBoard = GameLogic.rotateBoard(newBoard);
        [newBoard, newScore] = GameLogic.moveLeft(newBoard);
        newBoard = GameLogic.rotateBoard(GameLogic.rotateBoard(GameLogic.rotateBoard(newBoard)));
        break;
    }
    
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
      const [added, newTileId] = GameLogic.addNewTile(newBoard);
      if (added) {
        const finalScore = score + newScore;
        setAnimating(true);
        
        // Update board and tiles with animation
        setBoard(newBoard);
        setTiles(GameLogic.boardToTiles(newBoard));
        setNewTileId(newTileId || '');
        setScore(finalScore);
        
        // Save high score if needed
        const updateHighScore = async () => {
          const currentHighScore = await Storage.getHighScore();
          if (finalScore > currentHighScore) {
            await Storage.saveHighScore(finalScore);
            setHighScore(finalScore);
          }
        };
        updateHighScore();
        
        // Reset animation flag after animation completes
        setTimeout(() => {
          setAnimating(false);
        }, 400);
        
        // Check for win
        if (!won && newBoard.some(row => row.some(cell => cell === 2048))) {
          setWon(true);
          Alert.alert('Congratulations!', 'You reached 2048!');
        }
        
        // Check for game over
        if (!GameLogic.canMove(newBoard)) {
          setGameOver(true);
          Alert.alert('Game Over', `Final score: ${finalScore}`);
        }
      }
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 50) {
          move('right');
        } else if (dx < -50) {
          move('left');
        }
      } else {
        // Vertical swipe
        if (dy > 50) {
          move('down');
        } else if (dy < -50) {
          move('up');
        }
      }
    },
  });

  const resetGame = () => {
    const newBoard = GameLogic.initializeBoard();
    setBoard(newBoard);
    setTiles(GameLogic.boardToTiles(newBoard));
    setNewTileId('');
    setScore(0);
    setGameOver(false);
    setWon(false);
    setAnimating(false);
  };

  // Initialize tiles on mount
  useEffect(() => {
    setTiles(GameLogic.boardToTiles(board));
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Header score={score} highScore={highScore} />
      
      <GameBoard
        tiles={tiles}
        newTileId={newTileId}
        animating={animating}
        panHandlers={panResponder.panHandlers}
      />

      <GameControls onReset={resetGame} />
    </View>
  );
};

export default Game2048;
