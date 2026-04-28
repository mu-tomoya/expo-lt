import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

const COLORS = [
  { hex: '#FF6B6B', name: 'Red' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#FFD93D', name: 'Yellow' },
  { hex: '#6BCB77', name: 'Green' },
  { hex: '#4D96FF', name: 'Blue' },
  { hex: '#9D84B7', name: 'Purple' },
  { hex: '#FF69B4', name: 'Pink' },
  { hex: '#8B7355', name: 'Brown' },
  { hex: '#00CED1', name: 'Turquoise' },
  { hex: '#FF8C42', name: 'Coral' },
  { hex: '#87CEEB', name: 'Sky Blue' },
  { hex: '#DDA0DD', name: 'Plum' },
];

export default function HomeScreen() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
      rotation.stopAnimation();
    };
  }, [rotation]);

  const animatedRotationStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {COLORS.map((color, index) => (
            <View key={index} style={styles.tileContainer}>
              <Animated.View
                style={[
                  styles.tile,
                  animatedRotationStyle,
                  { backgroundColor: color.hex },
                ]}
              />
              <Text style={styles.colorName}>{color.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    padding: Spacing.three,
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-around',
  },
  tileContainer: {
    alignItems: 'center',
    marginBottom: Spacing.two,
    padding: Spacing.one,
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: Spacing.one,
  },
  colorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
