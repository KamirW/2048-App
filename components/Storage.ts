const STORAGE_KEYS = {
  HIGH_SCORE: '2048_high_score',
};

export const Storage = {
  async saveHighScore(score: number): Promise<void> {
    try {
      const currentHighScore = await this.getHighScore();
      if (score > currentHighScore) {
        if (typeof localStorage !== 'undefined') {
          // Web environment
          localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
        } else {
          // React Native environment - use simple object storage
          // In a real app, you'd use AsyncStorage or SecureStore
          console.log('High score to save:', score);
        }
      }
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  },

  async getHighScore(): Promise<number> {
    try {
      if (typeof localStorage !== 'undefined') {
        // Web environment
        const highScore = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
        return highScore ? parseInt(highScore, 10) : 0;
      } else {
        // React Native environment
        return 0; // In a real app, you'd retrieve from AsyncStorage
      }
    } catch (error) {
      console.error('Error getting high score:', error);
      return 0;
    }
  },

  async clearHighScore(): Promise<void> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.HIGH_SCORE);
      }
    } catch (error) {
      console.error('Error clearing high score:', error);
    }
  },
};
