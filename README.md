# 2048 Game - Mobile App

A fully functional 2048 game built with React Native and Expo, optimized for mobile devices with smooth animations and intuitive swipe controls.

## Features

- 🎮 **Full 2048 Gameplay**: Complete implementation of the classic 2048 game mechanics
- 📱 **Mobile Optimized**: Designed specifically for mobile devices with touch controls
- ✨ **Smooth Animations**: Fluid tile movements and transitions using React Native Reanimated
- 🎯 **Swipe Controls**: Intuitive gesture-based controls for moving tiles
- 🏆 **Score Tracking**: Real-time score updates and game state management
- 🔄 **Game Reset**: Easy game restart functionality

## How to Play

1. **Swipe** in any direction (up, down, left, right) to move all tiles
2. **Combine** tiles with the same number to create larger numbers
3. **Reach 2048** to win the game
4. **Game ends** when no more moves are possible

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on your device**:
   - Download the Expo Go app from App Store or Google Play
   - Scan the QR code shown in the terminal
   - The app will load automatically on your device

### Alternative: Run on Simulator

```bash
# For iOS
npm run ios

# For Android  
npm run android

# For Web
npm run web
```

## Technical Details

### Dependencies
- **Expo**: Platform for building universal native apps
- **React Native Reanimated**: Smooth animations and gestures
- **React Native Gesture Handler**: Advanced touch and gesture handling
- **TypeScript**: Type-safe development

### Game Architecture
- **4x4 Grid Board**: Classic 2048 game board layout
- **Tile System**: Dynamic tile rendering with color-coded values
- **Game Logic**: Complete implementation of tile movement, merging, and scoring
- **Animation System**: Smooth transitions for tile movements and appearances
- **Gesture Recognition**: Swipe detection for mobile controls

### Key Features Implementation

#### Game Logic
- Tile movement in all four directions
- Automatic tile merging for matching values
- Random new tile generation (90% chance of 2, 10% chance of 4)
- Win condition detection (reaching 2048)
- Game over detection (no available moves)

#### Animations
- Smooth tile sliding animations
- Scale effects for tile appearances
- Color transitions based on tile values
- Spring physics for natural movement

#### Mobile Optimization
- Responsive design for different screen sizes
- Touch-friendly interface
- Gesture-based controls
- Performance optimized for mobile devices

## File Structure

```
2048-game/
├── App.tsx              # Main game component
├── App.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── babel.config.js      # Babel configuration
├── assets/              # Static assets
└── README.md           # This file
```

## Game Controls

- **Swipe Up**: Move tiles upward
- **Swipe Down**: Move tiles downward  
- **Swipe Left**: Move tiles leftward
- **Swipe Right**: Move tiles rightward
- **New Game Button**: Reset and start a fresh game

## Scoring System

- Each merge adds the combined value to your score
- Example: Merging two 8's creates a 16 and adds 16 points
- Goal is to achieve the highest score possible

## Troubleshooting

### Common Issues

1. **Dependencies not found**: Run `npm install` to install all required packages
2. **Metro bundler issues**: Clear cache with `npx expo start --clear`
3. **Gesture not working**: Ensure gesture handler is properly linked
4. **Animation lag**: Check device performance and close other apps

### Performance Tips

- Use a physical device for best performance
- Close background apps while playing
- Ensure sufficient device memory is available

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this code for your own projects.
