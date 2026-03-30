import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Hold splash screen for 2 seconds, then fade out
    const timer = setTimeout(() => {
      Animated.parallel([
        // Fade out over the course of 300ms
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        // Scale up slightly (by 1.2x) while fading out
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={splashStyles.container}>
      <Animated.View
        style={[
          splashStyles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={splashStyles.logo}>2048</Text>
        <Text style={splashStyles.tagline}>Join the tiles, get to 2048!</Text>
      </Animated.View>
    </View>
  );
};

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#776e65',
    marginBottom: 20,
    textShadowColor: 'rgba(119, 110, 101, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#776e65',
    opacity: 0.8,
    textAlign: 'center',
  },
});
